import { i18n } from "../data/i18n.js";

export default function ProjectCard({ project, lang = "zh" }) {
  const t = i18n[lang];

  // ✅ Step 5 新增：英文模式時，用 i18n.projectMap 覆蓋顯示文字。
  // 中文模式不覆蓋，保留 projects.js 原文。
  const translated = t.projectMap[project.title] || {};

  const title = translated.title || project.title;
  const description = translated.description || project.description;
  const tags = translated.tags || project.tags || [];

  const { image, demo, code } = project;
  const initial = (title || "?").trim().charAt(0).toUpperCase();

  return (
    <article className="card reveal">
      <div className="card__media">
        {image ? (
          <img
            src={image}
            alt={`${title} ${t.projects.thumbnailAlt}`}
            loading="lazy"
          />
        ) : (
          <div className="card__media-fallback">{initial}</div>
        )}
      </div>

      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <p className="card__desc">{description}</p>

        <div className="card__tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        {(demo || code) && (
          <div className="card__links">
            {demo && (
              <a href={demo} target="_blank" rel="noopener">
                {t.projects.demo}
              </a>
            )}
            {code && (
              <a href={code} target="_blank" rel="noopener">
                {t.projects.code}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
