import { Suspense, lazy } from "react";
import { About } from "./components/About";
import { Awards } from "./components/Awards";
import { Contact } from "./components/Contact";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Experience } from "./components/Experience";
import { Featured } from "./components/Featured";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Personal } from "./components/Personal";
import { Skills } from "./components/Skills";

const Scene = lazy(() => import("./components/Scene").then((m) => ({ default: m.Scene })));

export default function App() {
  return (
    <div className="relative min-h-screen">
      <ErrorBoundary>
        <Suspense fallback={<div className="fixed inset-0 bg-ink" />}>
          <Scene />
        </Suspense>
      </ErrorBoundary>
      <div className="grain" />
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Featured />
        <Personal />
        <Experience />
        <Skills />
        <Awards />
        <Contact />
      </main>
    </div>
  );
}
