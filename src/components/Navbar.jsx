import { useEffect, useState } from "react";

const LINKS = [
  { href: "#projects", label: "作品" },
  { href: "#skills", label: "技能" },
  { href: "#experience", label: "經歷" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(true); // 一開始在封面上,先隱藏
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 捲過第一屏(PORTFOLIO 封面)後才顯示導覽列
  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY < window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header className={`site-header${hidden ? " site-header--hidden" : ""}`} id="top">
      <nav className="nav container">
        <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
          韋程<span>.</span>
        </a>

        <button
          className="nav__toggle"
          aria-label="開啟選單"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>

        <ul className={`nav__menu${open ? " is-open" : ""}`}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="theme-toggle"
              aria-label="切換深淺色主題"
              onClick={toggleTheme}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
