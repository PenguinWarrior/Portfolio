import { useEffect, useRef } from "react";

export default function HyperOverlay({
  active = 0,
  pages = [],
  theme = "light",
  lang = "zh",
  onToggleTheme = () => {},
  onToggleLang = () => {},
}) {
  const labelRef = useRef(null);

  useEffect(() => {
    if (labelRef.current) {
      labelRef.current.textContent = pages[active]?.label || "PORTFOLIO";
    }
  }, [active, pages]);

  return (
    <>
      <div className="ambient-bg" aria-hidden="true">
        <span className="ambient-bg__glow ambient-bg__glow--one" />
        <span className="ambient-bg__glow ambient-bg__glow--two" />
        <span className="ambient-bg__grain" />
      </div>

      <aside className="utility-bar" aria-label="portfolio utilities">
        <span className="utility-bar__label" ref={labelRef}>
          {pages[active]?.label || "PORTFOLIO"}
        </span>
        <div className="utility-bar__actions">
          <button
            type="button"
            className="utility-btn"
            aria-label="切換主題"
            onClick={onToggleTheme}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button
            type="button"
            className="utility-btn"
            aria-label="切換語言"
            onClick={onToggleLang}
          >
            {lang === "zh" ? "EN" : "中"}
          </button>
        </div>
      </aside>
    </>
  );
}
