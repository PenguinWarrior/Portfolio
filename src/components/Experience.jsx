import { experiences } from "../data/experience.js";
import { i18n } from "../data/i18n.js";

export default function Experience({ lang = "zh" }) {
  const t = i18n[lang];

  return (
    <section className="section" id="experience">
      <div className="container">
        <header className="section__head reveal">
          <h2 className="section__title">{t.experience.title}</h2>
          <p className="section__subtitle">{t.experience.subtitle}</p>
        </header>

        <ol className="timeline">
          {experiences.map((exp, index) => {
            // ✅ Step 5 新增：英文模式時使用 i18n.experienceMap，中文模式保留原始資料。
            const translated = t.experienceMap[index] || {};
            const period = translated.period || exp.period;
            const role = translated.role || exp.role;
            const org = translated.org || exp.org;
            const points = translated.points || exp.points;

            return (
              <li className="timeline__item reveal" key={exp.period + exp.role}>
                <span className="timeline__period">{period}</span>

                <h3 className="timeline__role">
                  {role}
                  {org && <span className="timeline__org"> · {org}</span>}
                </h3>

                <ul className="timeline__points">
                  {points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
