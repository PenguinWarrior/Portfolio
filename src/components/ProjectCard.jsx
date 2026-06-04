import { memo } from "react";
import { content } from "../data/content.js";

function ProjectCard({ project, lang = "zh" }) {
  const { title, description, image, tags = [], demo, code } = project;
  const titleText = title[lang];
  const initial = (titleText || "?").trim().charAt(0).toUpperCase();

  return (
    <article className="card reveal">
      <div className="card__media">
        {image ? (
          <img
            src={image}
            alt={`${titleText} ${lang === "zh" ? "縮圖" : "thumbnail"}`}
            loading="lazy"
          />
        ) : (
          <div className="card__media-fallback">{initial}</div>
        )}
      </div>
      <div className="card__body">
        <h3 className="card__title">{titleText}</h3>
        <p className="card__desc">{description[lang]}</p>
        <div className="card__tags">
          {tags.map((t) => (
            <span key={t[lang]}>{t[lang]}</span>
          ))}
        </div>
        {(demo || code) && (
          <div className="card__links">
            {demo && (
              <a href={demo} target="_blank" rel="noopener">
                {content.projectsMeta.preview[lang]}
              </a>
            )}
            {code && (
              <a href={code} target="_blank" rel="noopener">
                {content.projectsMeta.source[lang]}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default memo(ProjectCard);
