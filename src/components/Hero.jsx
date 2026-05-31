import { i18n } from "../data/i18n.js";

export default function Hero({ lang = "zh" }) {
  const t = i18n[lang].hero;

  return (
    <section className="hero hero--target" id="about">
      {/* ✅ 修正：文字區固定在左側，不讓內容撐爆畫面 */}
      <div className="hero-target__content reveal is-visible">
        <p className="hero-target__eyebrow">{t.eyebrow}</p>

        {/* ✅ 修正：大標只放姓名，避免中文職稱爆版 */}
        <h1 className="hero-target__title">
          <mark>{t.name}</mark>
        </h1>

        {/* ✅ 修正：職稱改成副標，小字呈現 */}
        <p className="hero-target__role">{t.role}</p>

        {/* ✅ 修正：自介保留，但限制高度，避免壓到底部 Nav */}
        <p className="hero-target__bio">{t.bio}</p>

        <div className="hero-target__links">
          <a className="target-link color-yellow" href="#projects">
            {t.viewProjects}
          </a>

          <a
            className="target-link color-red"
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            target="_blank"
            rel="noopener"
          >
            {t.downloadResume}
          </a>
        </div>

        <ul className="hero-target__socials">
          <li>
            <a
              href="https://github.com/PenguinWarrior"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/your-id"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a href="mailto:you@example.com">Email</a>
          </li>
        </ul>
      </div>

      {/* ✅ 修正：粒子人物固定在右側，不參與排版 */}
      {/* <div className="hero-target__portrait">
        <ParticlePortrait alt={t.avatarAlt} />
      </div> */}
    </section>
  );
}
