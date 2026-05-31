// Vite 會把 base 前綴自動加到 import.meta.env.BASE_URL
const avatar = `${import.meta.env.BASE_URL}avatar.svg`;

export default function Hero() {
  return (
    <section className="hero" id="about">
      <div className="container hero__inner">
        <div className="hero__text reveal">
          <p className="hero__eyebrow">你好,我是</p>
          <h1 className="hero__name">Your Name</h1>
          <p className="hero__role">前端工程師 · UI 設計 · 全端開發</p>
          <p className="hero__bio">
            這裡是一段簡短的自我介紹。說明你的專長、熱情所在,以及你想解決的問題。
            保持兩到三句、清楚有力即可。
          </p>
          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">查看作品</a>
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              className="btn btn--ghost"
              target="_blank"
              rel="noopener"
            >
              下載履歷
            </a>
          </div>
          <ul className="hero__socials">
            <li><a href="https://github.com/PenguinWarrior" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="https://linkedin.com/in/your-id" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="mailto:you@example.com">Email</a></li>
          </ul>
        </div>
        <div className="hero__avatar reveal">
          <div className="avatar-ring">
            <img src={avatar} alt="Your Name 頭像" />
          </div>
        </div>
      </div>
    </section>
  );
}
