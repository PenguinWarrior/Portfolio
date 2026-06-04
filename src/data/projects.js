/* ============================================================
   作品資料 — 在這裡新增 / 編輯你的專案即可。
   - category: 所屬技能分類,須對應 skills.js 的群組名稱:
       "後端開發" / "資料庫" / "前端 / 數位分身" / "工具與協作"
       (作品目錄的篩選按鈕即由這些群組名稱產生)
   - tags:  顯示在卡片上的技術標籤(純展示,不影響篩選)。
   - image: 縮圖路徑。可放在 public/(例 "/Portfolio/img/foo.png")。
            留空會用首字母佔位圖。
   - demo / code: 連結,留空則不顯示該按鈕。
   ============================================================ */

export const projects = [
  {
    title: "數位分身前端系統",
    category: "前端 / 數位分身",
    description:
      "開發數位分身的前端介面與互動，串接後端資料流呈現即時狀態與 3D 視覺化。",
    image: "",
    tags: ["數位分身", "JavaScript", "3D / 視覺化"],
    demo: "",
    code: "",
  },
  {
    title: "REST API 服務",
    category: "後端開發",
    description:
      "設計並開發專案的 REST API，規劃系統資料流與服務介面，支撐前端與其他系統介接。",
    image: "",
    tags: ["REST API", "系統資料流", "Node.js"],
    demo: "",
    code: "",
  },
  {
    title: "資料庫架構設計",
    category: "資料庫",
    description:
      "規劃資料庫架構與資料模型，進行索引與查詢效能調校，確保大量資料下的穩定與效率。",
    image: "",
    tags: ["資料庫設計", "PostgreSQL", "效能調校"],
    demo: "",
    code: "",
  },
  {
    title: "伺服器維運與部署",
    category: "工具與協作",
    description: "負責專案伺服器的建置、部署與維運，導入容器化與 CI/CD 流程，提升交付穩定度。",
    image: "",
    tags: ["Docker", "CI/CD", "Linux"],
    demo: "",
    code: "",
  },
];
