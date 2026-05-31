import { useMemo, useState } from "react";
import { projects } from "../data/projects.js";
import { skillGroups } from "../data/skills.js";
import { i18n } from "../data/i18n.js";
import ProjectCard from "./ProjectCard.jsx";

export default function Projects({ lang = "zh" }) {
  const t = i18n[lang];
  const [filter, setFilter] = useState("全部");

  // ✅ Step 5 修改：分類仍使用中文原始值作為 filter key，顯示時才翻譯。
  // 這樣不用改 projects.js / skills.js 的原始內容。
  const categories = useMemo(() => {
    const used = new Set(projects.map((p) => p.category));
    const ordered = skillGroups
      .map((g) => g.title)
      .filter((title) => used.has(title));
    return ["全部", ...ordered];
  }, []);

  const visible = useMemo(
    () =>
      filter === "全部"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  // ✅ Step 5 新增：分類顯示文字
  const getCategoryLabel = (cat) => {
    if (cat === "全部") return t.projects.all;
    return t.categoryMap[cat] || cat;
  };

  return (
    <section className="section" id="projects">
      <div className="container">
        <header className="section__head reveal">
          <h2 className="section__title">{t.projects.title}</h2>
          <p className="section__subtitle">{t.projects.subtitle}</p>
        </header>

        <div className="filters" role="tablist" aria-label={t.projects.title}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${filter === cat ? " is-active" : ""}`}
              aria-selected={filter === cat}
              onClick={() => setFilter(cat)}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {visible.map((p) => (
            <ProjectCard key={p.title} project={p} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
