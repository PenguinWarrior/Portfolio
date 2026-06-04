import { memo, useMemo, useState } from "react";
import ProjectCard from "./ProjectCard.jsx";
import { content, projects, skillGroups } from "../data/content.js";

function Projects({ lang = "zh" }) {
  const [filter, setFilter] = useState("all");

  const categories = useMemo(() => {
    const used = new Set(projects.map((p) => p.category));
    const ordered = skillGroups.filter((group) => used.has(group.key));
    return [
      { key: "all", label: content.projectsMeta.all[lang] },
      ...ordered.map((group) => ({ key: group.key, label: group.title[lang] })),
    ];
  }, [lang]);

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <section className="section" id="projects">
      <div className="container">
        <header className="section__head reveal">
          <h2 className="section__title">{content.projectsMeta.title[lang]}</h2>
          <p className="section__subtitle">
            {content.projectsMeta.subtitle[lang]}
          </p>
        </header>

        <div
          className="filters"
          role="tablist"
          aria-label={content.projectsMeta.categoryLabel[lang]}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`filter-btn${filter === cat.key ? " is-active" : ""}`}
              aria-selected={filter === cat.key}
              onClick={() => setFilter(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {visible.map((p) => (
            <ProjectCard key={p.key} project={p} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Projects);
