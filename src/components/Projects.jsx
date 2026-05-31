import { useMemo, useState } from "react";
import { projects } from "../data/projects.js";
import ProjectCard from "./ProjectCard.jsx";

export default function Projects() {
  const [filter, setFilter] = useState("全部");

  // 依資料動態收集分類
  const categories = useMemo(() => {
    const tags = new Set();
    projects.forEach((p) => (p.tags || []).forEach((t) => tags.add(t)));
    return ["全部", ...tags];
  }, []);

  const visible = useMemo(
    () =>
      filter === "全部"
        ? projects
        : projects.filter((p) => (p.tags || []).includes(filter)),
    [filter]
  );

  return (
    <section className="section" id="projects">
      <div className="container">
        <header className="section__head reveal">
          <h2 className="section__title">作品目錄</h2>
          <p className="section__subtitle">精選專案,點擊卡片查看細節與原始碼。</p>
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
