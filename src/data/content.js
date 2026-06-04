export const LANGUAGES = ["zh", "en"];
export const DEFAULT_LANGUAGE = "zh";

export const content = {
  nav: {
    brand: "PORTFOLIO",
    pageNavigation: {
      zh: "作品集分頁導覽",
      en: "Portfolio page navigation",
    },
    themeToggle: {
      zh: "切換深淺色主題",
      en: "Toggle theme",
    },
    langToggle: {
      zh: "EN",
      en: "中文",
    },
    langToggleAria: {
      zh: "切換至英文",
      en: "切換至中文",
    },
    goTo: {
      zh: "前往",
      en: "Go to",
    },
  },
  pages: {
    cover: { label: { zh: "封面", en: "Cover" } },
    about: { label: { zh: "關於我", en: "About" } },
    projects: { label: { zh: "作品目錄", en: "Projects" } },
    skills: { label: { zh: "技能", en: "Skills" } },
    experience: { label: { zh: "經歷", en: "Experience" } },
  },
  hero: {
    badge: "WAYNE",
    eyebrow: {
      zh: "PORTFOLIO · 作品集",
      en: "PORTFOLIO · Portfolio",
    },
    name: "王韋程",
    role: {
      zh: "軟體工程師 · 後端開發 · 數位分身",
      en: "Software Engineer · Backend · Digital Avatar",
    },
    bio: {
      zh: "從高中起投入程式開發，大學主修資訊工程。四年實務經驗橫跨後端與前端 —— 系統資料流設計、資料庫架構、REST API、伺服器維運，以及數位分身系統開發。",
      en: "Started programming in high school and majored in Information Engineering in college. Four years of practical experience spans backend, frontend, system data flow design, database architecture, REST APIs, server operations, and digital avatar development.",
    },
    chips: [
      { zh: "系統資料流設計", en: "System data flow design" },
      { zh: "資料庫架構", en: "Database architecture" },
      { zh: "REST API", en: "REST API" },
      { zh: "伺服器維運", en: "Server operations" },
      { zh: "數位分身", en: "Digital avatar" },
    ],
    actions: {
      viewProjects: { zh: "查看作品", en: "View projects" },
      downloadResume: { zh: "下載履歷", en: "Download resume" },
    },
    scrollAria: { zh: "向下捲動", en: "Scroll down" },
  },
  projectsMeta: {
    title: { zh: "作品目錄", en: "Projects" },
    subtitle: {
      zh: "以專案類型整理過往開發與系統實作經驗，呈現介面、資料流與功能設計能力。",
      en: "Organized by project type to showcase interface design, data flow, and implementation skills.",
    },
    all: { zh: "全部", en: "All" },
    categoryLabel: { zh: "作品分類", en: "Project categories" },
    preview: { zh: "線上預覽 ↗", en: "Live preview ↗" },
    source: { zh: "原始碼 ↗", en: "Source code ↗" },
  },
  skills: {
    title: { zh: "技能", en: "Skills" },
    subtitle: {
      zh: "我常用的工具與技術。",
      en: "My frequently used tools and technologies.",
    },
  },
  experience: {
    title: { zh: "經歷", en: "Experience" },
    subtitle: {
      zh: "工作與學習的時間軸。",
      en: "Career and learning timeline.",
    },
  },
  contactModal: {
    ariaLabel: { zh: "聯絡我", en: "Contact me" },
    backdropAria: { zh: "關閉聯絡視窗", en: "Close contact panel" },
    closeAria: { zh: "關閉", en: "Close" },
    eyebrow: { zh: "FINAL NODE // CONTACT", en: "FINAL NODE // CONTACT" },
    title: { zh: "聯絡我", en: "Contact me" },
    desc: {
      zh: "滾動到最後一頁後，再往下捲動即可開啟此視窗。請把下方連結換成你的實際資訊。",
      en: "Scroll to the end and continue to open this panel. Replace the links below with your real contact details.",
    },
  },
  contactLinks: [
    {
      key: "email",
      label: { zh: "Email", en: "Email" },
      value: "your.email@example.com",
      href: "mailto:your.email@example.com",
    },
    {
      key: "github",
      label: { zh: "GitHub", en: "GitHub" },
      value: "github.com/yourname",
      href: "https://github.com/yourname",
    },
    {
      key: "linkedin",
      label: { zh: "LinkedIn", en: "LinkedIn" },
      value: "linkedin.com/in/yourname",
      href: "https://www.linkedin.com/in/yourname",
    },
  ],
  skillGroups: [
    {
      key: "backend",
      title: { zh: "後端開發", en: "Backend" },
      items: [
        { zh: "REST API 設計", en: "REST API design" },
        { zh: "系統資料流設計", en: "System data flow design" },
        { zh: "伺服器維運", en: "Server operations" },
        { zh: "Node.js", en: "Node.js" },
      ],
    },
    {
      key: "database",
      title: { zh: "資料庫", en: "Database" },
      items: [
        { zh: "資料庫架構設計", en: "Database architecture" },
        { zh: "PostgreSQL", en: "PostgreSQL" },
        { zh: "資料建模", en: "Data modeling" },
        { zh: "效能調校", en: "Performance tuning" },
      ],
    },
    {
      key: "frontend",
      title: { zh: "前端 / 數位分身", en: "Frontend / Digital Avatar" },
      items: [
        { zh: "數位分身系統", en: "Digital avatar system" },
        { zh: "JavaScript", en: "JavaScript" },
        { zh: "HTML / CSS", en: "HTML / CSS" },
        { zh: "3D / 視覺化 / XR", en: "3D / Visualization / XR" },
      ],
    },
    {
      key: "tools",
      title: { zh: "工具與協作", en: "Tools & Collaboration" },
      items: [
        { zh: "Git", en: "Git" },
        { zh: "Docker", en: "Docker" },
        { zh: "CI/CD", en: "CI/CD" },
        { zh: "Linux", en: "Linux" },
        { zh: "跨域研發", en: "Cross-domain development" },
      ],
    },
  ],
  projects: [
    {
      key: "avatar-frontend",
      title: { zh: "數位分身前端系統", en: "Digital Avatar Frontend" },
      category: "frontend",
      description: {
        zh: "開發數位分身的前端介面與互動，串接後端資料流呈現即時狀態與 3D 視覺化。",
        en: "Built the digital avatar frontend interface and interactions, connecting backend data flows to display real-time status and 3D visualizations.",
      },
      image: "",
      tags: [
        { zh: "數位分身", en: "Digital avatar" },
        { zh: "JavaScript", en: "JavaScript" },
        { zh: "3D / 視覺化", en: "3D / Visualization" },
      ],
      demo: "",
      code: "",
    },
    {
      key: "rest-api",
      title: { zh: "REST API 服務", en: "REST API Service" },
      category: "backend",
      description: {
        zh: "設計並開發專案的 REST API，規劃系統資料流與服務介面，支撐前端與其他系統介接。",
        en: "Designed and developed REST APIs to support system data flows and service interfaces for frontend and external integrations.",
      },
      image: "",
      tags: [
        { zh: "REST API", en: "REST API" },
        { zh: "系統資料流", en: "System data flow" },
        { zh: "Node.js", en: "Node.js" },
      ],
      demo: "",
      code: "",
    },
    {
      key: "db-architecture",
      title: { zh: "資料庫架構設計", en: "Database Architecture" },
      category: "database",
      description: {
        zh: "規劃資料庫架構與資料模型，進行索引與查詢效能調校，確保大量資料下的穩定與效率。",
        en: "Planned database architecture and data models, tuned indexes and queries to ensure stability and efficiency at scale.",
      },
      image: "",
      tags: [
        { zh: "資料庫設計", en: "Database design" },
        { zh: "PostgreSQL", en: "PostgreSQL" },
        { zh: "效能調校", en: "Performance tuning" },
      ],
      demo: "",
      code: "",
    },
    {
      key: "server-ops",
      title: { zh: "伺服器維運與部署", en: "Server Operations & Deployment" },
      category: "tools",
      description: {
        zh: "負責專案伺服器的建置、部署與維運，導入容器化與 CI/CD 流程，提升交付穩定度。",
        en: "Handled project server setup, deployment, and maintenance while introducing containerization and CI/CD for more stable delivery.",
      },
      image: "",
      tags: [
        { zh: "Docker", en: "Docker" },
        { zh: "CI/CD", en: "CI/CD" },
        { zh: "Linux", en: "Linux" },
      ],
      demo: "",
      code: "",
    },
  ],
  experiences: [
    {
      key: "year-4",
      period: { zh: "第 4 年 — 至今", en: "Year 4 — Present" },
      role: {
        zh: "前端工程師 · 數位分身系統",
        en: "Frontend Engineer · Digital Avatar System",
      },
      org: "",
      points: [
        {
          zh: "專責前端數位分身系統的開發與功能實作。",
          en: "Led frontend development and feature implementation for a digital avatar system.",
        },
        {
          zh: "延續後端經驗，串接系統資料流與 API，銜接前後端。",
          en: "Leveraged backend experience to connect system data flows and APIs, bridging frontend and backend.",
        },
      ],
    },
    {
      key: "year-1-3",
      period: { zh: "第 1 — 3 年", en: "Year 1 — 3" },
      role: { zh: "後端工程師", en: "Backend Engineer" },
      org: "",
      points: [
        {
          zh: "系統資料流設計與資料庫架構規劃。",
          en: "Designed system data flows and database architecture.",
        },
        {
          zh: "REST API 開發與維護。",
          en: "Developed and maintained REST APIs.",
        },
        {
          zh: "專案伺服器建置與維運。",
          en: "Built and maintained project servers.",
        },
        {
          zh: "每週參與跨域研發，投入前端數位分身系統。",
          en: "Participated in weekly cross-domain development and contributed to frontend digital avatar systems.",
        },
      ],
    },
    {
      key: "university",
      period: { zh: "大學", en: "University" },
      role: { zh: "資訊工程學系", en: "Department of Information Engineering" },
      org: "",
      points: [
        {
          zh: "主修資訊工程，奠定軟體開發基礎。",
          en: "Majored in Information Engineering and built a foundation in software development.",
        },
        {
          zh: "高中起即自學程式，持續累積實作經驗。",
          en: "Self-taught programming since high school and continued growing practical experience.",
        },
      ],
    },
  ],
};

export const projects = content.projects;
export const skillGroups = content.skillGroups;
export const experiences = content.experiences;
export const contactLinks = content.contactLinks;
