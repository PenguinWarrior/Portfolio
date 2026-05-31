import { useState } from "react";
import { i18n } from "../data/i18n.js";

export default function BottomNav({
  currentPage,
  setCurrentPage,
  theme,
  setTheme,
  lang,
  setLang,
}) {
  const t = i18n[lang];

  // ✅ Step 6 補強新增：控制底部「聯絡我」按鈕是否展開
  const [contactExpanded, setContactExpanded] = useState(false);

  // ✅ Step 4 新增：切換淺色 / 深色主題
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // ✅ Step 5 新增：切換中文 / 英文
  const toggleLang = () => {
    setLang(lang === "zh" ? "en" : "zh");
  };

  return (
    <nav className="bottom-nav" aria-label="頁面進度導覽">
      <ol className="bottom-nav__list">
        {t.nav.map((label, index) => {
          const isActive = currentPage === index;

          return (
            <li
              className={`bottom-nav__item${isActive ? " is-active" : ""}`}
              key={label}
            >
              <button
                type="button"
                className="bottom-nav__button"
                onClick={() => setCurrentPage(index)}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="bottom-nav__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="bottom-nav__divider">|</span>
                <span className="bottom-nav__label">{label}</span>
              </button>

              {index < t.nav.length - 1 && (
                <span className="bottom-nav__line" aria-hidden="true"></span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="bottom-nav__actions">
        {/* ✅ Step 6 補強新增：聯絡我滑開按鈕 */}
        <div className={`contact-dock${contactExpanded ? " is-expanded" : ""}`}>
          <button
            type="button"
            className="contact-dock__toggle"
            onClick={() => setContactExpanded((open) => !open)}
            aria-expanded={contactExpanded}
            aria-label={lang === "zh" ? "展開聯絡方式" : "Expand contact links"}
            title={lang === "zh" ? "聯絡我" : "Contact"}
          >
            {lang === "zh" ? "聯絡我" : "Contact"}
          </button>

          {/* ✅ Step 6 補強新增：展開後顯示的聯絡 icons */}
          <div className="contact-dock__links" aria-hidden={!contactExpanded}>
            <a
              href="mailto:you@example.com"
              className="contact-dock__link"
              aria-label="Email"
              title="Email"
            >
              @
            </a>

            <a
              href="https://github.com/PenguinWarrior"
              target="_blank"
              rel="noopener"
              className="contact-dock__link"
              aria-label="GitHub"
              title="GitHub"
            >
              GH
            </a>

            <a
              href="https://linkedin.com/in/your-id"
              target="_blank"
              rel="noopener"
              className="contact-dock__link"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              in
            </a>
          </div>
        </div>

        {/* ✅ Step 5 新增：語言切換按鈕 */}
        <button
          type="button"
          className="bottom-nav__text-btn"
          onClick={toggleLang}
          aria-label={lang === "zh" ? "切換為英文" : "Switch to Chinese"}
          title={lang === "zh" ? "切換為英文" : "Switch to Chinese"}
        >
          {t.langButton}
        </button>

        {/* ✅ Step 4 新增：主題切換按鈕 */}
        <button
          type="button"
          className="bottom-nav__icon-btn"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "切換為淺色主題" : "切換為深色主題"}
          title={theme === "dark" ? "切換為淺色主題" : "切換為深色主題"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
