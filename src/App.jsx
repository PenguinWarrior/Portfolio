import { useEffect, useMemo, useRef, useState } from "react";
import Intro from "./components/Intro.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import HyperOverlay from "./components/HyperOverlay.jsx";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "your.email@example.com",
    href: "mailto:your.email@example.com",
  },
  {
    label: "GitHub",
    value: "github.com/yourname",
    href: "https://github.com/yourname",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/yourname",
    href: "https://www.linkedin.com/in/yourname",
  },
];

const PAGES = [
  { key: "cover", label: "封面", node: <Intro /> },
  { key: "about", label: "關於我", node: <Hero /> },
  { key: "projects", label: "作品目錄", node: <Projects /> },
  { key: "skills", label: "技能", node: <Skills /> },
  { key: "experience", label: "經歷", node: <Experience /> },
];

export default function App() {
  const [active, setActive] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );
  const panelInnerRefs = useRef([]);

  const pageCount = PAGES.length;
  const progress = useMemo(
    () => (pageCount <= 1 ? 0 : active / (pageCount - 1)),
    [active, pageCount],
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

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
      }, 780);
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

    const goNext = () => {
      if (contactOpen) return;
      setActive((current) => {
        if (current >= pageCount - 1) {
          setContactOpen(true);
          return current;
        }
        return current + 1;
      });
    };

    const goPrev = () => {
      if (contactOpen) {
        setContactOpen(false);
        return;
      }
      setActive((current) => Math.max(0, current - 1));
    };

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 18) return;

      // 目前頁面還有內容可以捲時，先讓該頁內容自然滾動；到頂/到底後才換頁。
      if (!contactOpen && canScrollInsideActivePanel(event.deltaY)) return;

      event.preventDefault();
      if (locked) return;
      locked = true;
      event.deltaY > 0 ? goNext() : goPrev();
      unlock();
    };

    const onKeyDown = (event) => {
      const nextKeys = ["ArrowDown", "PageDown", " "];
      const prevKeys = ["ArrowUp", "PageUp"];
      if (
        ![...nextKeys, ...prevKeys, "Escape", "Home", "End"].includes(event.key)
      )
        return;

      const direction = nextKeys.includes(event.key) ? 1 : -1;
      if (!contactOpen && canScrollInsideActivePanel(direction)) return;

      event.preventDefault();
      if (event.key === "Escape") return setContactOpen(false);
      if (event.key === "Home") {
        setContactOpen(false);
        return setActive(0);
      }
      if (event.key === "End") {
        setContactOpen(false);
        return setActive(pageCount - 1);
      }
      if (locked) return;
      locked = true;
      nextKeys.includes(event.key) ? goNext() : goPrev();
      unlock();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, contactOpen, pageCount]);

  useEffect(() => {
    document.documentElement.style.setProperty("--page-index", active);
    document.documentElement.style.setProperty(
      "--page-progress",
      progress.toFixed(4),
    );
  }, [active, progress]);

  return (
    <div className={`fullpage-shell${contactOpen ? " is-contact-open" : ""}`}>
      <HyperOverlay active={active} pages={PAGES} contactOpen={contactOpen} />

      <header className="fp-nav" aria-label="作品集分頁導覽">
        <button
          className="fp-brand"
          type="button"
          onClick={() => {
            setContactOpen(false);
            setActive(0);
          }}
        >
          PORTFOLIO<span>.</span>
        </button>
        <div className="fp-dots" aria-hidden="true">
          {PAGES.map((page, index) => (
            <button
              key={page.key}
              type="button"
              className={`fp-dot${index === active ? " is-active" : ""}`}
              onClick={() => {
                setContactOpen(false);
                setActive(index);
              }}
              aria-label={`前往${page.label}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <button
          className="theme-toggle"
          aria-label="切換深淺色主題"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </header>

      <main className="fp-stage">
        {PAGES.map((page, index) => (
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
        <span>{PAGES[active].label}</span>
        <i style={{ transform: `scaleY(${Math.max(0.08, progress)})` }} />
      </aside>

      <div
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-hidden={!contactOpen}
        aria-label="聯絡我"
      >
        <button
          className="contact-modal__backdrop"
          type="button"
          onClick={() => setContactOpen(false)}
          aria-label="關閉聯絡視窗"
        />
        <div className="contact-modal__panel">
          <button
            className="contact-modal__close"
            type="button"
            onClick={() => setContactOpen(false)}
            aria-label="關閉"
          >
            ×
          </button>
          <p className="contact-modal__eyebrow">FINAL NODE // CONTACT</p>
          <h2>聯絡我</h2>
          <br />
          <p className="contact-modal__desc"> </p>
          <div className="contact-links">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener" : undefined}
              >
                <span>{link.label}</span>
                <strong>{link.value}</strong>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
