import { About } from "./components/About";
import { Awards } from "./components/Awards";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Featured } from "./components/Featured";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Personal } from "./components/Personal";
import { Scene } from "./components/Scene";
import { Skills } from "./components/Skills";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Scene />
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
