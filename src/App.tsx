import { useEffect, useState } from "react";
import { About } from "./components/About";
import { Awards } from "./components/Awards";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Featured } from "./components/Featured";
import { Focus } from "./components/Focus";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Personal } from "./components/Personal";
import { Scene } from "./components/Scene";
import { SideUniverse } from "./components/SideUniverse";
import { Skills } from "./components/Skills";
import { HubApp } from "./hub/HubApp";
import { HubDoor } from "./hub/HubDoor";
import { isHubHash } from "./hub/routes";

export default function App() {
  const [hub, setHub] = useState(() => isHubHash());

  useEffect(() => {
    const onHash = () => setHub(isHubHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (hub) return <HubApp />;

  return (
    <div className="relative min-h-screen">
      <Scene />
      <SideUniverse />
      <div className="grain" />
      <Nav />
      <main className="relative">
        <Hero />
        <Focus />
        <About />
        <Featured />
        <Personal />
        <Experience />
        <Skills />
        <Awards />
        <Contact />
      </main>
      <HubDoor />
    </div>
  );
}
