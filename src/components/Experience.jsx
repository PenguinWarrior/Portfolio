import { experiences } from "../data/experience.js";

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <header className="section__head reveal">
          <h2 className="section__title">經歷</h2>
          <p className="section__subtitle">工作與學習的時間軸。</p>
        </header>

        <ol className="timeline">
          {experiences.map((exp) => (
            <li className="timeline__item reveal" key={exp.period + exp.role}>
              <span className="timeline__period">{exp.period}</span>
              <h3 className="timeline__role">
                {exp.role}
                {exp.org && <span className="timeline__org"> · {exp.org}</span>}
              </h3>
              <ul className="timeline__points">
                {exp.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
