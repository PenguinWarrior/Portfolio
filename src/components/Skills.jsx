import { skillGroups } from "../data/skills.js";
import { i18n } from "../data/i18n.js";

export default function Skills({ lang = "zh" }) {
  const t = i18n[lang];

  return (
    <section className="section section--alt" id="skills">
      <div className="container">
        <header className="section__head reveal">
          <h2 className="section__title">{t.skills.title}</h2>
          <p className="section__subtitle">{t.skills.subtitle}</p>
        </header>

        <div className="skills">
          {skillGroups.map((group) => (
            <div className="skill-group reveal" key={group.title}>
              {/* ✅ Step 5 修改：分類標題依語言顯示 */}
              <h3>{t.categoryMap[group.title] || group.title}</h3>

              <ul className="tags">
                {group.items.map((item) => (
                  // ✅ Step 5 修改：技能項目依語言顯示
                  <li key={item}>{t.skillItemMap[item] || item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
