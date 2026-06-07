import { memo } from "react";
import { content } from "../data/content.js";

function Hero({ lang = "zh" }) {
  const heroCopy = content.hero;

  return (
    <section className="cover" id="about">
      {/* 背景裝飾,純視覺 */}
      <div className="cover__bg" aria-hidden="true">
        <span className="cover__blob cover__blob--1" />
        <span className="cover__blob cover__blob--2" />
        <span className="cover__grid" />
      </div>

      <div className="container cover__inner reveal">
        <div className="cover__badge">{heroCopy.badge}</div>

        <p className="cover__eyebrow">{heroCopy.eyebrow[lang]}</p>
        <h1 className="cover__name">{heroCopy.name}</h1>
        <p className="cover__role">{heroCopy.role[lang]}</p>

        <p className="cover__bio">{heroCopy.bio[lang]}</p>

        <ul className="cover__chips">
          {heroCopy.chips.map((item) => (
            <li key={item[lang]}>{item[lang]}</li>
          ))}
        </ul>

        <div className="cover__actions">
          <a href="#projects" className="btn btn--primary">
            {heroCopy.actions.viewProjects[lang]}
          </a>
        </div>
      </div>

      <a
        href="#projects"
        className="cover__scroll"
        aria-label={heroCopy.scrollAria[lang]}
      >
        <span />
      </a>
    </section>
  );
}

export default memo(Hero);
