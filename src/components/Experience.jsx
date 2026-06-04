import { memo } from "react";
import { content, experiences } from "../data/content.js";

function Experience({ lang = "zh" }) {
  return (
    <section className="section" id="experience">
      <div className="container">
        <header className="section__head reveal">
          <h2 className="section__title">{content.experience.title[lang]}</h2>
          <p className="section__subtitle">
            {content.experience.subtitle[lang]}
          </p>
        </header>

        <ol className="timeline">
          {experiences.map((exp) => (
            <li className="timeline__item reveal" key={exp.key}>
              <span className="timeline__period">{exp.period[lang]}</span>
              <h3 className="timeline__role">
                {exp.role[lang]}
                {exp.org && <span className="timeline__org"> · {exp.org}</span>}
              </h3>
              <ul className="timeline__points">
                {exp.points.map((p, i) => (
                  <li key={`${exp.key}-${i}`}>{p[lang]}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default memo(Experience);
