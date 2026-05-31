import { useEffect, useRef, useState } from "react";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import BottomNav from "./components/BottomNav.jsx";
import ContactModal from "./components/ContactModal.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import useReveal from "./hooks/useReveal.js";
import StarsCanvas from "./components/StarsCanvas.jsx";
import FullscreenParticlePortrait from "./components/FullscreenParticlePortrait.jsx";

export default function App() {
  // ✅ 保留：全站捲動進場動畫
  useReveal();

  // ✅ Step 7 新增：控制初始 LoadingScreen 是否顯示
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Step 1 新增：目前所在頁面 index
  const [currentPage, setCurrentPage] = useState(0);

  // ✅ Step 4 新增：主題狀態，預設深色
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  // ✅ Step 5 新增：語言狀態，預設中文
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "zh";
  });

  // ✅ Step 6 新增：控制「聯絡我」彈窗是否開啟
  const [contactOpen, setContactOpen] = useState(false);

  // ✅ Step 1 新增：滾輪鎖，避免一次滾動連續跳多頁
  const wheelLocked = useRef(false);

  // ✅ Step 5 修改：PAGES 移到 App 裡面，這樣 lang 改變時各頁會重新取得語言
  const PAGES = [
    {
      id: "about",
      label: lang === "zh" ? "關於我" : "About",
      component: <Hero lang={lang} />,
    },
    {
      id: "projects",
      label: lang === "zh" ? "作品" : "Projects",
      component: <Projects lang={lang} />,
    },
    {
      id: "skills",
      label: lang === "zh" ? "技能" : "Skills",
      component: <Skills lang={lang} />,
    },
    {
      id: "experience",
      label: lang === "zh" ? "經歷" : "Experience",
      component: <Experience lang={lang} />,
    },
  ];

  // ✅ Step 1 新增：最後頁 index
  const lastPageIndex = PAGES.length - 1;

  // ✅ Step 7 新增：Loading 顯示時間
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, []);

  // ✅ Step 4 修改：主題變更時，同步寫入 html[data-theme] 與 localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ Step 5 新增：語言變更時，同步更新瀏覽器語言屬性與 localStorage
  useEffect(() => {
    document.documentElement.setAttribute(
      "lang",
      lang === "zh" ? "zh-Hant" : "en",
    );
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    // ✅ Step 1 新增：用滾輪方向控制橫向翻頁
    const handleWheel = (event) => {
      event.preventDefault();

      // ✅ Step 7 新增：Loading 期間不處理滾輪，避免背景頁面偷跑
      if (isLoading) return;

      // ✅ Step 6 新增：彈窗開啟時不再切頁，避免背景頁面跟著動
      if (contactOpen) return;

      if (wheelLocked.current) return;

      const direction = event.deltaY > 0 ? 1 : -1;

      setCurrentPage((prev) => {
        const next = prev + direction;

        // ✅ Step 6 新增：如果目前在最後一頁，且繼續往下滾，打開聯絡彈窗
        if (prev === lastPageIndex && direction > 0) {
          setContactOpen(true);
          return prev;
        }

        // ✅ 避免超出第一頁
        if (next < 0) return 0;

        // ✅ 避免超出最後一頁
        if (next > lastPageIndex) return lastPageIndex;

        return next;
      });

      // ✅ 鎖住一小段時間，讓翻頁動畫完成
      wheelLocked.current = true;

      window.setTimeout(() => {
        wheelLocked.current = false;
      }, 850);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [lastPageIndex, contactOpen, isLoading]);

  return (
    <>
      {/* ✅ Step 7 新增：初始 LoadingScreen */}
      {isLoading && <LoadingScreen />}

      {/* ✅ Step 8 新增：全站 canvas 星空背景 */}
      {!isLoading && <StarsCanvas />}
      {!isLoading && <FullscreenParticlePortrait />}

      {/* ✅ Step 7 修改：Loading 結束後才讓主畫面可操作 */}
      <main className={`page-shell${isLoading ? " is-loading" : ""}`}>
        <div className="page-shell__dots" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div
          className="page-track"
          style={{ transform: `translateX(-${currentPage * 100}vw)` }}
        >
          {PAGES.map((page) => (
            <section
              className="page-panel"
              key={page.id}
              aria-label={page.label}
            >
              {page.component}
            </section>
          ))}
        </div>
      </main>

      {/* ✅ Step 7 修改：Loading 期間先隱藏底部 Nav */}
      {!isLoading && (
        <BottomNav
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          theme={theme}
          setTheme={setTheme}
          lang={lang}
          setLang={setLang}
        />
      )}

      {/* ✅ Step 6 新增：最後一頁往下滾時開啟的聯絡彈窗 */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        lang={lang}
      />
    </>
  );
}
