// Vite 會把 base 前綴自動加到 import.meta.env.BASE_URL
const avatar = `${import.meta.env.BASE_URL}avatar.svg`;

export default function Hero() {
  return (
    <section className="hero" id="about">
      <div className="container hero__inner">
        <div className="hero__text reveal">
          <p className="hero__eyebrow">你好,我是</p>
          <h1 className="hero__name">王韋程</h1>
          <p className="hero__role">軟體工程師 · 後端開發 · 數位分身</p>
          <p className="hero__bio">
            我是一名軟體工程師,從高中起投入程式開發,大學主修資訊工程。
            自2022年畢業後累積四年實務經驗:專注於後端,負責系統資料流設計、
            資料庫架構規劃、REST API 開發與專案伺服器維運,並透過每週的跨域研發
            參與前端數位分身系統;近一年則轉向前端,專責數位分身系統的開發。
            我習慣從資料與架構的角度思考問題,並樂於在前後端之間找到最合適的解法。
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
            <img src={avatar} alt="王韋程 頭像" />
          </div>
        </div>
      </div>
    </section>
  );
}
