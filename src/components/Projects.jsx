import { memo, useMemo, useState } from "react";
import { projects } from "../data/projects.js";
import { skillGroups } from "../data/skills.js";
import ProjectCard from "./ProjectCard.jsx";

function Projects() {
  const [filter, setFilter] = useState("全部");

  // 分類依據 skills.js 的技能群組名稱,只列出實際有作品的群組
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

  return (
    <section className="section" id="projects">
      <div className="container">
        <header className="section__head reveal">
          <h2 className="section__title">作品目錄</h2>
          <p className="section__subtitle">依技能分類,點擊上方按鈕篩選。</p>
        </header>

        <div className="filters" role="tablist" aria-label="作品分類">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${filter === cat ? " is-active" : ""}`}
              aria-selected={filter === cat}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {visible.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Projects);
