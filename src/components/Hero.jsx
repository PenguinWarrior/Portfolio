export default function Hero() {
  return (
    <section className="cover" id="about">
      {/* 背景裝飾,純視覺 */}
      <div className="cover__bg" aria-hidden="true">
        <span className="cover__blob cover__blob--1" />
        <span className="cover__blob cover__blob--2" />
        <span className="cover__grid" />
      </div>

      <div className="container cover__inner reveal">
        <div className="cover__badge">韋程</div>

        <p className="cover__eyebrow">PORTFOLIO · 作品集</p>
        <h1 className="cover__name">王韋程</h1>
        <p className="cover__role">軟體工程師 · 後端開發 · 數位分身</p>

        <p className="cover__bio">
          從高中起投入程式開發,大學主修資訊工程。四年實務經驗橫跨後端與前端 ——
          系統資料流設計、資料庫架構、REST API、伺服器維運,以及數位分身系統開發。
        </p>

        <ul className="cover__chips">
          <li>系統資料流設計</li>
          <li>資料庫架構</li>
          <li>REST API</li>
          <li>伺服器維運</li>
          <li>數位分身</li>
        </ul>

        <div className="cover__actions">
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
      </div>

      <a href="#projects" className="cover__scroll" aria-label="向下捲動">
        <span />
      </a>
    </section>
  );
}
