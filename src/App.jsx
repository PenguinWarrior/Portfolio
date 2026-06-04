import { useEffect, useMemo, useRef, useState } from "react";
import Intro from "./components/Intro.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import HyperOverlay from "./components/HyperOverlay.jsx";
import { content, contactLinks } from "./data/content.js";

export default function App() {
  const [active, setActive] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "zh");
  const panelInnerRefs = useRef([]);
  const audioCtxRef = useRef(null);
  const lastHoverButtonRef = useRef(null);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const toggleLang = () => setLang((l) => (l === "zh" ? "en" : "zh"));

  const getAudioContext = () => {
    if (audioCtxRef.current) return audioCtxRef.current;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    audioCtxRef.current = new AudioContext();
    return audioCtxRef.current;
  };

  const playSound = ({ type, setupFrequency, duration = 0.25 }) => {
    const audioCtx = getAudioContext();
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    setupFrequency(now, osc.frequency);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  };

  const playScrollSound = (direction) => {
    if (direction > 0) {
      playSound({
        type: "sine",
        duration: 0.25,
        setupFrequency: (now, frequency) => {
          frequency.setValueAtTime(500, now);
          frequency.exponentialRampToValueAtTime(90, now + 0.25);
        },
      });
    } else {
      playSound({
        // type: "sawtooth",
        // duration: 0.3,
        // setupFrequency: (now, frequency) => {
        //   frequency.setValueAtTime(140, now);
        //   frequency.exponentialRampToValueAtTime(800, now + 0.3);
        type: "sine",
        duration: 0.06,
        setupFrequency: (now, frequency) => {
          frequency.setValueAtTime(780, now);
          frequency.setValueAtTime(1180, now + 0.03);
        },
      });
    }
  };

  const playButtonHoverSound = () => {
    playSound({
      type: "sine",
      duration: 0.08,
      setupFrequency: (now, frequency) => {
        frequency.setValueAtTime(900, now);
        frequency.setValueAtTime(1400, now + 0.04);
      },
    });
  };

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

      const panel = panelInnerRefs.current[active];
      const canScroll =
        !contactOpen && canScrollInsideActivePanel(event.deltaY);
      if (canScroll && panel) {
        event.preventDefault();
        panel.scrollBy({ top: event.deltaY, left: 0, behavior: "auto" });
        return;
      }

      event.preventDefault();
      if (locked) return;
      locked = true;
      playScrollSound(event.deltaY > 0 ? 1 : -1);
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

    document.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, contactOpen, pageCount]);

  useEffect(() => {
    const onPointerOver = (event) => {
      const button = event.target.closest("button");
      if (!button || button === lastHoverButtonRef.current) return;
      lastHoverButtonRef.current = button;
      playButtonHoverSound();
    };

    const onPointerOut = (event) => {
      const button = event.target.closest("button");
      if (button && button === lastHoverButtonRef.current) {
        lastHoverButtonRef.current = null;
      }
    };

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--page-index", active);
    document.documentElement.style.setProperty(
      "--page-progress",
      progress.toFixed(4),
    );
  }, [active, progress]);

  return (
    <div className={`fullpage-shell${contactOpen ? " is-contact-open" : ""}`}>
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
        contactOpen={contactOpen}
        contactLabel={content.contactModal.title[lang]}
        theme={theme}
        lang={lang}
        onToggleTheme={toggleTheme}
        onToggleLang={toggleLang}
      />

      <header className="fp-nav" aria-label={content.nav.pageNavigation[lang]}>
        <button
          className="fp-brand"
          type="button"
          onClick={() => {
            setContactOpen(false);
            setActive(0);
          }}
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
              onClick={() => {
                setContactOpen(false);
                setActive(index);
              }}
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

      <div
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-hidden={!contactOpen}
        aria-label={content.contactModal.ariaLabel[lang]}
      >
        <button
          className="contact-modal__backdrop"
          type="button"
          onClick={() => setContactOpen(false)}
          aria-label={content.contactModal.backdropAria[lang]}
        />
        <div className="contact-modal__panel">
          <button
            className="contact-modal__close"
            type="button"
            onClick={() => setContactOpen(false)}
            aria-label={content.contactModal.closeAria[lang]}
          >
            ×
          </button>
          <p className="contact-modal__eyebrow">
            {content.contactModal.eyebrow[lang]}
          </p>
          <h2>{content.contactModal.title[lang]}</h2>
          <p className="contact-modal__desc">
            {content.contactModal.desc[lang]}
          </p>
          <div className="contact-links">
            {contactLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener" : undefined}
              >
                <span>{link.label[lang]}</span>
                <strong>{link.value}</strong>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
