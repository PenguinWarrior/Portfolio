import { memo } from "react";

function Intro() {
  return (
    <section className="intro" id="intro">
      <div className="intro__bg" aria-hidden="true">
        <span className="intro__blob intro__blob--1" />
        <span className="intro__blob intro__blob--2" />
      </div>

      <h1 className="intro__word">PORTFOLIO</h1>

      <a href="#about" className="intro__scroll" aria-label="向下捲動">
        <span />
      </a>
    </section>
  );
}

export default memo(Intro);
