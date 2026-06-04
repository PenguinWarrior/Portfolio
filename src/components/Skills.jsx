import { memo } from "react";
import { content, skillGroups } from "../data/content.js";

function Skills({ lang = "zh" }) {
  return (
    <section className="section section--alt" id="skills">
      <div className="container">
        <header className="section__head reveal">
          <h2 className="section__title">{content.skills.title[lang]}</h2>
          <p className="section__subtitle">{content.skills.subtitle[lang]}</p>
        </header>

        <div className="skills">
          {skillGroups.map((group) => (
            <div className="skill-group reveal" key={group.key}>
              <h3>{group.title[lang]}</h3>
              <ul className="tags">
                {group.items.map((item) => (
                  <li key={item[lang]}>{item[lang]}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Skills);
