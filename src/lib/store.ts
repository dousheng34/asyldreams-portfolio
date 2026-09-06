import { createContext, useContext } from "react";

export type LightboxState = { keys: string[]; index: number } | null;

export type AppState = {
  ready: boolean;
  openLightbox: (keys: string[], index: number) => void;
};

export const AppContext = createContext<AppState>({ ready: false, openLightbox: () => {} });
export const useApp = () => useContext(AppContext);
