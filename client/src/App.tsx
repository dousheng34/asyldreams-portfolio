import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PinterestGallery from "./pages/PinterestGallery";
import Series from "./pages/Series";
import SeriesDetail from "./pages/SeriesDetail";
import CaseStudy from "./pages/CaseStudy";

// Moving Paper Gallery: application shell preserves the paper-gallery system in stored light and dark modes.

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/pinterest"} component={PinterestGallery} />
      <Route path={"/series"} component={Series} />
      <Route path={"/series/:slug"} component={SeriesDetail} />
      <Route path={"/cases/:slug"} component={CaseStudy} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
