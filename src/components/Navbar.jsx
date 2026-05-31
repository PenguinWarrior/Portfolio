import { useEffect, useState } from "react";

const LINKS = [
  { href: "#projects", label: "作品" },
  { href: "#skills", label: "技能" },
  { href: "#contact", label: "聯絡" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header className="site-header" id="top">
      <nav className="nav container">
        <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
          YN<span>.</span>
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
