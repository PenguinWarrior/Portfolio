import { memo } from "react";
import { skillGroups } from "../data/skills.js";

function Skills() {
  return (
    <section className="section section--alt" id="skills">
      <div className="container">
        <header className="section__head reveal">
          <h2 className="section__title">技能</h2>
          <p className="section__subtitle">我常用的工具與技術。</p>
        </header>

        <div className="skills">
          {skillGroups.map((group) => (
            <div className="skill-group reveal" key={group.title}>
              <h3>{group.title}</h3>
              <ul className="tags">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
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
