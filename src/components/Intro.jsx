import { memo } from "react";
import { content } from "../data/content.js";

function Intro({ lang = "zh" }) {
  return (
    <section className="intro" id="intro">
      <div className="intro__bg" aria-hidden="true">
        <span className="intro__blob intro__blob--1" />
        <span className="intro__blob intro__blob--2" />
      </div>

      <h1 className="intro__word">{content.nav.brand}</h1>

      <a
        href="#about"
        className="intro__scroll"
        aria-label={content.hero.scrollAria[lang]}
      >
        <span />
      </a>
    </section>
  );
}

export default memo(Intro);
