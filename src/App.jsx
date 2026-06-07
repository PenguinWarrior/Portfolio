import { useEffect, useMemo, useRef, useState } from "react";
import Intro from "./components/Intro.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import HyperOverlay from "./components/HyperOverlay.jsx";
import { content } from "./data/content.js";

export default function App() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "zh");
  const panelInnerRefs = useRef([]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const toggleLang = () => setLang((l) => (l === "zh" ? "en" : "zh"));

  const pages = useMemo(
    () => [
      {
        key: "cover",
        label: content.pages.cover.label[lang],
        node: <Intro lang={lang} />,
      },
      {
        key: "about",
        label: content.pages.about.label[lang],
        node: <Hero lang={lang} />,
      },
      {
        key: "projects",
        label: content.pages.projects.label[lang],
        node: <Projects lang={lang} />,
      },
      {
        key: "skills",
        label: content.pages.skills.label[lang],
        node: <Skills lang={lang} />,
      },
      {
        key: "experience",
        label: content.pages.experience.label[lang],
        node: <Experience lang={lang} />,
      },
    ],
    [lang],
  );

  const pageCount = pages.length;
  const progress = useMemo(
    () => (pageCount <= 1 ? 0 : active / (pageCount - 1)),
    [active, pageCount],
  );

  const goToPage = (index) => {
    const target = Math.min(Math.max(index, 0), pageCount - 1);
    const panel = panelInnerRefs.current[target];
    if (panel) panel.scrollTop = 0;
    setActive(target);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    const onLoaded = () => setLoaded(true);
    if (document.readyState === "complete") {
      onLoaded();
      return;
    }

    window.addEventListener("load", onLoaded);
    return () => window.removeEventListener("load", onLoaded);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const onPointerMove = (event) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      root.style.setProperty("--mouse-x", x.toFixed(4));
      root.style.setProperty("--mouse-y", y.toFixed(4));
      root.style.setProperty("--mouse-shift-x", ((x - 0.5) * 2).toFixed(4));
      root.style.setProperty("--mouse-shift-y", ((y - 0.5) * 2).toFixed(4));
    };

    onPointerMove({
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2,
    });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    let locked = false;

    const unlock = () => {
      window.setTimeout(() => {
        locked = false;
      }, 620);
    };

    const canScrollInsideActivePanel = (deltaY) => {
      const panel = panelInnerRefs.current[active];
      if (!panel) return false;

      const hasOverflow = panel.scrollHeight > panel.clientHeight + 4;
      if (!hasOverflow) return false;

      const atTop = panel.scrollTop <= 2;
      const atBottom =
        panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2;

      if (deltaY > 0) return !atBottom;
      if (deltaY < 0) return !atTop;
      return false;
    };

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 18) return;

      const panel = panelInnerRefs.current[active];
      if (canScrollInsideActivePanel(event.deltaY) && panel) {
        event.preventDefault();
        panel.scrollBy({ top: event.deltaY, left: 0, behavior: "auto" });
        return;
      }

      event.preventDefault();
      if (locked) return;
      locked = true;
      if (event.deltaY > 0) goToPage(active + 1);
      else goToPage(active - 1);
      unlock();
    };

    const onKeyDown = (event) => {
      const nextKeys = ["ArrowDown", "PageDown", " "];
      const prevKeys = ["ArrowUp", "PageUp"];
      if (![...nextKeys, ...prevKeys, "Home", "End"].includes(event.key)) return;

      const direction = nextKeys.includes(event.key) ? 1 : -1;
      if (canScrollInsideActivePanel(direction)) return;

      event.preventDefault();
      if (event.key === "Home") return goToPage(0);
      if (event.key === "End") return goToPage(pageCount - 1);
      if (locked) return;
      locked = true;
      nextKeys.includes(event.key) ? goToPage(active + 1) : goToPage(active - 1);
      unlock();
    };

    const onAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const key = anchor.getAttribute("href")?.replace("#", "");
      const index = pages.findIndex((page) => page.key === key);
      if (index < 0) return;
      event.preventDefault();
      goToPage(index);
    };

    document.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onAnchorClick);
    return () => {
      document.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onAnchorClick);
    };
  }, [active, pageCount, pages]);

  useEffect(() => {
    document.documentElement.style.setProperty("--page-index", active);
    document.documentElement.style.setProperty(
      "--page-progress",
      progress.toFixed(4),
    );
  }, [active, progress]);

  return (
    <div className="fullpage-shell">
      {!loaded && (
        <div className="loading-screen">
          <div className="loader">
            <div className="inner one" />
            <div className="inner two" />
            <div className="inner three" />
          </div>
        </div>
      )}

      <HyperOverlay
        active={active}
        pages={pages}
        theme={theme}
        lang={lang}
        onToggleTheme={toggleTheme}
        onToggleLang={toggleLang}
      />

      <header className="fp-nav" aria-label={content.nav.pageNavigation[lang]}>
        <button
          className="fp-brand"
          type="button"
          onClick={() => goToPage(0)}
        >
          {content.nav.brand}
          <span>.</span>
        </button>
        <div className="fp-dots" aria-hidden="true">
          {pages.map((page, index) => (
            <button
              key={page.key}
              type="button"
              className={`fp-dot${index === active ? " is-active" : ""}`}
              onClick={() => goToPage(index)}
              aria-label={`${content.nav.goTo[lang]} ${page.label}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="fp-stage">
        {pages.map((page, index) => (
          <section
            key={page.key}
            className={`snap-panel snap-panel--${page.key}${index === active ? " is-active" : ""}`}
            data-state={
              index === active ? "active" : index < active ? "past" : "future"
            }
            style={{ "--panel-distance": Math.abs(index - active) }}
            id={page.key}
            aria-hidden={index !== active}
          >
            <div className="snap-panel__tag">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{page.label}</b>
            </div>
            <div
              className="snap-panel__inner"
              ref={(el) => {
                panelInnerRefs.current[index] = el;
              }}
              tabIndex={index === active ? 0 : -1}
            >
              {page.node}
            </div>
          </section>
        ))}
      </main>

      <aside className="fp-progress" aria-hidden="true">
        <span>{pages[active].label}</span>
        <i style={{ transform: `scaleY(${Math.max(0.08, progress)})` }} />
      </aside>
    </div>
  );
}
