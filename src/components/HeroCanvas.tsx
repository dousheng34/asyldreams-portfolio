import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Texture } from "ogl";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { works } from "@/data/portfolio";

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

// Кроссфейд двух текстур через шумовую маску + искажение от курсора,
// затухающее по скорости. Плёночное зерно и лёгкая виньетка добавлены прямо в шейдере.
const fragment = /* glsl */ `
precision highp float;
uniform sampler2D tA;
uniform sampler2D tB;
uniform vec2 uResA;
uniform vec2 uResB;
uniform vec2 uRes;
uniform float uProgress;
uniform float uTime;
uniform vec2 uMouse;
uniform float uVelocity;
uniform float uReveal;
varying vec2 vUv;

vec2 cover(vec2 uv, vec2 res, vec2 img) {
  float ra = res.x / res.y;
  float ia = img.x / img.y;
  vec2 s = ra > ia ? vec2(1.0, ia / ra) : vec2(ra / ia, 1.0);
  return (uv - 0.5) * s + 0.5;
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}

void main() {
  vec2 uv = vUv;
  // мягкое искажение вокруг курсора
  vec2 m = uMouse;
  float d = distance(uv * vec2(uRes.x / uRes.y, 1.0), m * vec2(uRes.x / uRes.y, 1.0));
  float ripple = smoothstep(0.45, 0.0, d) * uVelocity;
  uv += (uv - m) * ripple * 0.35;
  uv += vec2(sin(uv.y * 14.0 + uTime * 0.8), cos(uv.x * 12.0 - uTime * 0.6)) * ripple * 0.02;

  // маска перехода
  float n = noise(uv * 4.0 + uTime * 0.05);
  float edge = smoothstep(uProgress - 0.25, uProgress + 0.25, uv.y * 0.55 + n * 0.45);
  float disp = (1.0 - edge) * 0.06 * (1.0 - abs(uProgress * 2.0 - 1.0));

  vec2 uvA = cover(uv + vec2(0.0, disp), uRes, uResA);
  vec2 uvB = cover(uv - vec2(0.0, disp), uRes, uResB);
  vec4 a = texture2D(tA, uvA);
  vec4 b = texture2D(tB, uvB);
  vec4 col = mix(a, b, 1.0 - edge);

  // виньетка + зерно
  float vig = smoothstep(1.15, 0.35, length(vUv - 0.5));
  col.rgb *= mix(0.72, 1.0, vig);
  col.rgb += (hash(vUv * uRes + uTime) - 0.5) * 0.045;

  // появление снизу вверх
  float rev = smoothstep(uReveal + 0.18, uReveal, vUv.y);
  gl_FragColor = vec4(col.rgb, rev);
}`;

export default function HeroCanvas({ keys, active, className = "" }: { keys: string[]; active: boolean; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const state = useRef<{ index: number; progress: number }>({ index: 0, progress: 1 });

  useEffect(() => {
    const el = wrap.current!;
    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 1.75), alpha: true, premultipliedAlpha: false, antialias: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    el.appendChild(gl.canvas);
    gl.canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;";

    const textures = keys.map(() => new Texture(gl, { generateMipmaps: false, minFilter: gl.LINEAR }));
    const sizes = keys.map(() => [1, 1]);
    keys.forEach((k, i) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        textures[i].image = img;
        sizes[i] = [img.naturalWidth, img.naturalHeight];
        if (i === 0) program.uniforms.uResA.value = sizes[0];
        if (i === 1) program.uniforms.uResB.value = sizes[1];
      };
      img.src = works[k].src;
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        tA: { value: textures[0] },
        tB: { value: textures[1 % textures.length] },
        uResA: { value: sizes[0] },
        uResB: { value: sizes[1 % sizes.length] },
        uRes: { value: [1, 1] },
        uProgress: { value: 1 },
        uTime: { value: 0 },
        uMouse: { value: [0.5, 0.5] },
        uVelocity: { value: 0 },
        uReveal: { value: 0 },
      },
      transparent: true,
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height);
      program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // курсор: позиция с инерцией + скорость
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, v: 0 };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let t0 = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - t0) / 1000);
      t0 = now;
      const dx = mouse.tx - mouse.x;
      const dy = mouse.ty - mouse.y;
      mouse.x += dx * 0.12;
      mouse.y += dy * 0.12;
      const speed = Math.min(1, Math.hypot(dx, dy) * 6);
      mouse.v += (speed - mouse.v) * (speed > mouse.v ? 0.25 : 0.045);
      program.uniforms.uMouse.value = [mouse.x, mouse.y];
      program.uniforms.uVelocity.value = mouse.v;
      program.uniforms.uTime.value += dt;
      program.uniforms.uProgress.value = state.current.progress;
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(loop);

    // слайд-шоу: A = текущий, B = следующий, progress 1→0, затем свап
    let timer: gsap.core.Tween | null = null;
    const step = () => {
      const s = state.current;
      const next = (s.index + 1) % keys.length;
      program.uniforms.tA.value = textures[s.index];
      program.uniforms.uResA.value = sizes[s.index];
      program.uniforms.tB.value = textures[next];
      program.uniforms.uResB.value = sizes[next];
      s.progress = 1;
      gsap.to(s, {
        progress: 0,
        duration: 1.8,
        ease: "power3.inOut",
        onComplete: () => {
          s.index = next;
          timer = gsap.delayedCall(3.6, step);
        },
      });
    };
    if (!prefersReducedMotion() && keys.length > 1) timer = gsap.delayedCall(4.2, step);

    const cleanup = () => {
      cancelAnimationFrame(raf);
      timer?.kill();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
    (el as HTMLDivElement & { __program?: Program }).__program = program;
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!active) return;
    const program = (wrap.current as (HTMLDivElement & { __program?: Program }) | null)?.__program;
    if (!program) return;
    gsap.to(program.uniforms.uReveal, { value: 1.2, duration: 1.6, ease: "power3.inOut", delay: 0.2 });
  }, [active]);

  return <div ref={wrap} className={`overflow-hidden ${className}`} aria-hidden="true" />;
}
