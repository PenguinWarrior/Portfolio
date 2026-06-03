import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Intro from "./components/Intro.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Footer from "./components/Footer.jsx";
import HyperOverlay from "./components/HyperOverlay.jsx";
import useReveal from "./hooks/useReveal.js";

export default function App() {
  // 全站捲動進場動畫
  useReveal();

  // 啟動時依使用者 / 系統偏好套用主題
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute(
      "data-theme",
      saved || "dark"
    );
  }, []);

  return (
    <>
      <HyperOverlay />
      <Navbar />
      <Intro />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
