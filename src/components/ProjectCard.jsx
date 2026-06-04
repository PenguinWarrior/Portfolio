import { memo } from "react";

function ProjectCard({ project }) {
  const { title, description, image, tags = [], demo, code } = project;
  const initial = (title || "?").trim().charAt(0).toUpperCase();

  return (
    <article className="card reveal">
      <div className="card__media">
        {image ? (
          <img src={image} alt={`${title} 縮圖`} loading="lazy" />
        ) : (
          <div className="card__media-fallback">{initial}</div>
        )}
      </div>
      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <p className="card__desc">{description}</p>
        <div className="card__tags">
          {tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {(demo || code) && (
          <div className="card__links">
            {demo && (
              <a href={demo} target="_blank" rel="noopener">
                線上預覽 ↗
              </a>
            )}
            {code && (
              <a href={code} target="_blank" rel="noopener">
                原始碼 ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default memo(ProjectCard);
