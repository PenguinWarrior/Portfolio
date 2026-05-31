/* ============================================================
   ✅ Step 5：中英文文字對照表
   目的：保留原本中文內容不變，英文另放於此檔案。
   若之後要調整英文文案，優先改這裡。
   ============================================================ */

export const i18n = {
  zh: {
    nav: ["關於我", "作品", "技能", "經歷"],
    langButton: "EN",

    hero: {
      eyebrow: "你好,我是",
      name: "王韋程",
      role: "軟體工程師 · 後端開發 · 數位分身",
      bio:
        "我是一名軟體工程師,從高中起投入程式開發,大學主修資訊工程。\n" +
        "自2022年畢業後累積四年實務經驗:專注於後端,負責系統資料流設計、\n" +
        "資料庫架構規劃、REST API 開發與專案伺服器維運,並透過每週的跨域研發\n" +
        "參與前端數位分身系統;近一年則轉向前端,專責數位分身系統的開發。\n" +
        "我習慣從資料與架構的角度思考問題,並樂於在前後端之間找到最合適的解法。",
      viewProjects: "查看作品",
      downloadResume: "下載履歷",
      avatarAlt: "王韋程 頭像",
    },

    projects: {
      title: "作品目錄",
      subtitle: "依技能分類,點擊上方按鈕篩選。",
      all: "全部",
      demo: "線上預覽 ↗",
      code: "原始碼 ↗",
      thumbnailAlt: "縮圖",
    },

    skills: {
      title: "技能",
      subtitle: "我常用的工具與技術。",
    },

    experience: {
      title: "經歷",
      subtitle: "工作與學習的時間軸。",
    },

    // ✅ Step 5 新增：技能分類名稱翻譯，key 使用原本中文，避免改動原始 data。
    categoryMap: {
      後端開發: "後端開發",
      資料庫: "資料庫",
      "前端 / 數位分身": "前端 / 數位分身",
      工具與協作: "工具與協作",
    },

    // ✅ Step 5 新增：技能項目翻譯，中文版維持原文。
    skillItemMap: {},

    // ✅ Step 5 新增：作品英文對照，中文版不需要覆蓋。
    projectMap: {},

    // ✅ Step 5 新增：經歷英文對照，中文版不需要覆蓋。
    experienceMap: {},
  },

  en: {
    nav: ["About", "Projects", "Skills", "Experience"],
    langButton: "中",

    hero: {
      eyebrow: "Hello, I am",
      name: "Wang Wei-Cheng",
      role: "Software Engineer · Backend Development · Digital Avatar",
      bio:
        "I am a software engineer who started programming in high school and majored in Computer Science.\n" +
        "Since graduating in 2022, I have accumulated four years of practical experience, focusing on backend development,\n" +
        "system data flow design, database architecture, REST API development, and project server maintenance.\n" +
        "Through weekly cross-domain R&D, I also participated in frontend digital avatar systems.\n" +
        "In the past year, I have shifted toward frontend development, focusing on digital avatar system implementation.\n" +
        "I approach problems from the perspective of data and architecture, and I enjoy finding suitable solutions across frontend and backend systems.",
      viewProjects: "View Projects",
      downloadResume: "Download Résumé",
      avatarAlt: "Wang Wei-Cheng avatar",
    },

    projects: {
      title: "Projects",
      subtitle: "Filter projects by skill category.",
      all: "All",
      demo: "Live Demo ↗",
      code: "Source Code ↗",
      thumbnailAlt: "thumbnail",
    },

    skills: {
      title: "Skills",
      subtitle: "Tools and technologies I commonly use.",
    },

    experience: {
      title: "Experience",
      subtitle: "A timeline of my work and learning journey.",
    },

    // ✅ Step 5 新增：分類名稱英文對照。
    categoryMap: {
      後端開發: "Backend Development",
      資料庫: "Database",
      "前端 / 數位分身": "Frontend / Digital Avatar",
      工具與協作: "Tools & Collaboration",
    },

    // ✅ Step 5 新增：技能項目英文對照。
    skillItemMap: {
      "REST API 設計": "REST API Design",
      系統資料流設計: "System Data Flow Design",
      伺服器維運: "Server Operations",
      "Node.js": "Node.js",

      資料庫架構設計: "Database Architecture",
      PostgreSQL: "PostgreSQL",
      資料建模: "Data Modeling",
      效能調校: "Performance Tuning",

      數位分身系統: "Digital Avatar System",
      JavaScript: "JavaScript",
      "HTML / CSS": "HTML / CSS",
      "3D / 視覺化 / XR": "3D / Visualization / XR",

      Git: "Git",
      Docker: "Docker",
      "CI/CD": "CI/CD",
      Linux: "Linux",
      跨域研發: "Cross-domain R&D",
    },

    // ✅ Step 5 新增：作品資料英文對照。
    // key 使用原本中文 title，避免改動 projects.js。
    projectMap: {
      數位分身前端系統: {
        title: "Digital Avatar Frontend System",
        description:
          "Developed the frontend interface and interactions for a digital avatar system, integrating backend data flows to present real-time status and 3D visualization.",
        tags: ["Digital Avatar", "JavaScript", "3D / Visualization"],
      },
      "REST API 服務": {
        title: "REST API Service",
        description:
          "Designed and developed REST APIs, planned system data flows and service interfaces, and supported integration between frontend and other systems.",
        tags: ["REST API", "System Data Flow", "Node.js"],
      },
      資料庫架構設計: {
        title: "Database Architecture Design",
        description:
          "Planned database architecture and data models, optimized indexes and query performance, and ensured stability and efficiency under large-scale data.",
        tags: ["Database Design", "PostgreSQL", "Performance Tuning"],
      },
      伺服器維運與部署: {
        title: "Server Operations & Deployment",
        description:
          "Handled server setup, deployment, and maintenance, introducing containerization and CI/CD workflows to improve delivery stability.",
        tags: ["Docker", "CI/CD", "Linux"],
      },
    },

    // ✅ Step 5 新增：經歷資料英文對照。
    // key 使用陣列 index，避免改動 experience.js。
    experienceMap: {
      0: {
        period: "Year 4 — Present",
        role: "Frontend Engineer · Digital Avatar System",
        org: "",
        points: [
          "Focused on frontend development and feature implementation for digital avatar systems.",
          "Applied backend experience to integrate system data flows and APIs across frontend and backend.",
        ],
      },
      1: {
        period: "Years 1 — 3",
        role: "Backend Engineer",
        org: "",
        points: [
          "Designed system data flows and planned database architecture.",
          "Developed and maintained REST APIs.",
          "Built, deployed, and maintained project servers.",
          "Participated in weekly cross-domain R&D for frontend digital avatar systems.",
        ],
      },
      2: {
        period: "University",
        role: "Department of Computer Science",
        org: "",
        points: [
          "Majored in Computer Science and built a foundation in software development.",
          "Started self-learning programming in high school and continued accumulating hands-on experience.",
        ],
      },
    },
  },
};
