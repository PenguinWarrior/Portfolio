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
      en: "Switch to Chinese",
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
      zh: "PORTFOLIO · 履歷補充資料",
      en: "PORTFOLIO · Resume Supplement",
    },
    name: "王韋程",
    role: {
      zh: "軟體工程師 · 系統整合 · 前後端開發",
      en: "Software Engineer · System Integration · Full-stack Development",
    },
    bio: {
      zh: "具備約四年軟體開發與系統整合經驗，主要累積於後端服務、資料流設計、資料庫規劃、部署維運，以及互動式前端系統開發。重視需求理解、系統結構清晰度與功能可維護性。",
      en: "A software engineer with around four years of experience in software development and system integration, covering backend services, data flow design, database planning, deployment, operations, and interactive frontend systems. Focused on clear requirements, maintainable architecture, and practical implementation.",
    },
    chips: [
      { zh: "前後端整合", en: "Frontend & backend integration" },
      { zh: "系統資料流", en: "System data flow" },
      { zh: "REST API", en: "REST API" },
      { zh: "資料庫設計", en: "Database design" },
      { zh: "部署與維運", en: "Deployment & operations" },
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
      zh: "以專案類型整理過往開發與系統實作經驗，呈現介面設計、資料串接、後端服務與維運協作能力。",
      en: "Organized by project type to present experience in interface design, data integration, backend services, and operations collaboration.",
    },
    all: { zh: "全部", en: "All" },
    categoryLabel: { zh: "作品分類", en: "Project categories" },
    preview: { zh: "線上預覽 ↗", en: "Live preview ↗" },
    source: { zh: "原始碼 ↗", en: "Source code ↗" },
  },
  skills: {
    title: { zh: "技能", en: "Skills" },
    subtitle: {
      zh: "依實務開發流程整理技術能力，涵蓋前後端串接、資料處理、部署維運與跨部門協作。",
      en: "Skills organized by practical development workflows, covering frontend-backend integration, data handling, deployment, operations, and collaboration.",
    },
  },
  experience: {
    title: { zh: "經歷", en: "Experience" },
    subtitle: {
      zh: "以下整理主要工作經驗與能力累積，作為 104 履歷補充參考。",
      en: "A summary of key work experience and accumulated capabilities as a supplement to the 104 resume profile.",
    },
  },
  skillGroups: [
    {
      key: "frontend",
      title: { zh: "前端與互動介面", en: "Frontend & Interaction" },
      items: [
        { zh: "JavaScript", en: "JavaScript" },
        { zh: "HTML / CSS", en: "HTML / CSS" },
        { zh: "介面狀態設計", en: "UI state design" },
        { zh: "互動式系統開發", en: "Interactive system development" },
      ],
    },
    {
      key: "backend",
      title: { zh: "後端與 API", en: "Backend & API" },
      items: [
        { zh: "REST API 設計", en: "REST API design" },
        { zh: "系統資料流設計", en: "System data flow design" },
        { zh: "服務介面規劃", en: "Service interface planning" },
        { zh: "Node.js", en: "Node.js" },
      ],
    },
    {
      key: "database",
      title: { zh: "資料庫與資料處理", en: "Database & Data Handling" },
      items: [
        { zh: "資料庫架構設計", en: "Database architecture" },
        { zh: "PostgreSQL", en: "PostgreSQL" },
        { zh: "資料建模", en: "Data modeling" },
        { zh: "查詢邏輯與效能檢核", en: "Query logic & performance review" },
      ],
    },
    {
      key: "tools",
      title: { zh: "部署、維運與協作", en: "Deployment, Ops & Collaboration" },
      items: [
        { zh: "Git", en: "Git" },
        { zh: "Docker", en: "Docker" },
        { zh: "Linux", en: "Linux" },
        { zh: "問題排查", en: "Troubleshooting" },
        { zh: "跨域協作", en: "Cross-functional collaboration" },
      ],
    },
  ],
  projects: [
    {
      key: "avatar-frontend",
      title: { zh: "互動式前端系統", en: "Interactive Frontend System" },
      category: "frontend",
      description: {
        zh: "負責互動式前端介面開發，處理畫面狀態、使用者操作流程與後端資料串接，協助系統呈現即時互動與視覺化內容。",
        en: "Developed interactive frontend interfaces, handling UI states, user flows, and backend data integration to support real-time interaction and visualization.",
      },
      image: "",
      tags: [
        { zh: "前端互動", en: "Frontend interaction" },
        { zh: "JavaScript", en: "JavaScript" },
        { zh: "API 串接", en: "API integration" },
      ],
      demo: "",
      code: "",
    },
    {
      key: "rest-api",
      title: { zh: "後端 API 與系統資料流設計", en: "Backend API & Data Flow Design" },
      category: "backend",
      description: {
        zh: "規劃並開發後端 API 服務，處理前端所需資料格式、請求流程與系統間資料串接，提升前後端整合效率。",
        en: "Planned and developed backend API services, including data formats, request flows, and system-to-system integration to improve frontend-backend collaboration.",
      },
      image: "",
      tags: [
        { zh: "REST API", en: "REST API" },
        { zh: "資料流設計", en: "Data flow design" },
        { zh: "系統整合", en: "System integration" },
      ],
      demo: "",
      code: "",
    },
    {
      key: "db-architecture",
      title: { zh: "資料庫架構與查詢設計", en: "Database Architecture & Query Design" },
      category: "database",
      description: {
        zh: "依據系統需求規劃資料表結構、欄位關係與查詢邏輯，支援前後端功能穩定取得、儲存與驗證資料。",
        en: "Planned table structures, field relationships, and query logic based on system requirements to support stable data retrieval, storage, and validation.",
      },
      image: "",
      tags: [
        { zh: "資料庫設計", en: "Database design" },
        { zh: "PostgreSQL", en: "PostgreSQL" },
        { zh: "SQL", en: "SQL" },
      ],
      demo: "",
      code: "",
    },
    {
      key: "server-ops",
      title: { zh: "系統部署與維運協作", en: "System Deployment & Operations" },
      category: "tools",
      description: {
        zh: "協助系統部署、環境設定與基礎維運流程，處理服務啟動、設定檔管理與問題排查，確保功能可穩定運行。",
        en: "Supported deployment, environment setup, and basic operations, including service startup, configuration management, and troubleshooting for stable delivery.",
      },
      image: "",
      tags: [
        { zh: "部署", en: "Deployment" },
        { zh: "環境設定", en: "Environment setup" },
        { zh: "問題排查", en: "Troubleshooting" },
      ],
      demo: "",
      code: "",
    },
  ],
  experiences: [
    {
      key: "frontend-system",
      period: { zh: "近期", en: "Recent" },
      role: {
        zh: "前端工程師 · 互動式系統開發",
        en: "Frontend Engineer · Interactive System Development",
      },
      org: "",
      points: [
        {
          zh: "負責前端功能實作、畫面狀態管理與使用者操作流程整理。",
          en: "Implemented frontend features, UI state handling, and user flow organization.",
        },
        {
          zh: "串接後端資料流與 API，協助功能穩定呈現並提升系統可維護性。",
          en: "Integrated backend data flows and APIs to support stable functionality and maintainability.",
        },
      ],
    },
    {
      key: "backend-system",
      period: { zh: "前期經驗", en: "Earlier Experience" },
      role: { zh: "後端工程師", en: "Backend Engineer" },
      org: "",
      points: [
        {
          zh: "參與系統資料流設計、REST API 開發與資料庫架構規劃。",
          en: "Worked on system data flow design, REST API development, and database architecture planning.",
        },
        {
          zh: "協助專案伺服器建置、部署流程與維運問題排查。",
          en: "Supported server setup, deployment processes, and operational troubleshooting.",
        },
      ],
    },
    {
      key: "education",
      period: { zh: "學歷", en: "Education" },
      role: { zh: "資訊工程學系", en: "Department of Information Engineering" },
      org: "",
      points: [
        {
          zh: "主修資訊工程，建立軟體開發、資料結構與系統設計相關基礎。",
          en: "Majored in Information Engineering, building foundations in software development, data structures, and system design.",
        },
      ],
    },
  ],
};

export const projects = content.projects;
export const skillGroups = content.skillGroups;
export const experiences = content.experiences;
export const contactLinks = [];
