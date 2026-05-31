# 個人作品集 Portfolio

以 **React + Vite** 製作的單頁式作品集,透過 **GitHub Actions** 自動部署到 **GitHub Pages**。

## 特色

- **作品目錄**:資料集中於 [`src/data/projects.js`](src/data/projects.js),新增專案只要改一個檔案
- **自動分類篩選**:依專案標籤自動產生篩選按鈕
- **深 / 淺色主題**:記憶使用者選擇,並尊重系統偏好
- **響應式設計**:手機 / 平板 / 桌機皆適用
- **自動部署**:push 到 `main` 即由 GitHub Actions build & deploy

## 結構

```
Portfolio/
├── index.html                    # Vite 進入點
├── vite.config.js                # base: "/Portfolio/"(對應 repo 名)
├── package.json
├── public/
│   ├── avatar.svg                # 頭像佔位圖(可換成自己的照片)
│   └── .nojekyll                 # 告訴 Pages 不要跑 Jekyll
├── src/
│   ├── main.jsx · App.jsx · index.css
│   ├── hooks/useReveal.js        # 捲動進場動畫
│   ├── data/
│   │   ├── projects.js           # ← 主要編輯處:作品資料
│   │   └── skills.js             # ← 技能資料
│   └── components/               # Navbar / Hero / Projects / Skills / Footer
└── .github/workflows/deploy.yml  # 自動部署設定
```

## 🛠️ 開發

需要 Node.js 18+。

```bash
npm install      # 安裝相依套件
npm run dev      # 本機開發(預設 http://localhost:5173/Portfolio/)
npm run build    # 打包輸出到 dist/
npm run preview  # 預覽打包結果
```

## 客製化

1. **個人資訊**:編輯 [`src/components/Hero.jsx`](src/components/Hero.jsx) 與 [`Navbar.jsx`](src/components/Navbar.jsx) 的姓名、職稱、社群連結。
2. **作品**:編輯 [`src/data/projects.js`](src/data/projects.js),依範例新增物件。
3. **技能**:編輯 [`src/data/skills.js`](src/data/skills.js)。
4. **頭像**:把照片放進 `public/`,並改 [`Hero.jsx`](src/components/Hero.jsx) 的檔名。
5. **履歷**:把 PDF 命名為 `public/resume.pdf`(Hero 的「下載履歷」就會生效)。
6. **主題色**:改 [`src/index.css`](src/index.css) 最上方 `:root` 的 `--primary`。

## 部署到 GitHub Pages

本專案已內含 [`deploy.yml`](.github/workflows/deploy.yml),只需:

1. 把程式碼推上 GitHub(repo 名須與 `vite.config.js` 的 `base` 一致,目前是 `Portfolio`):

   ```bash
   git add .
   git commit -m "Build portfolio with React + Vite"
   git push -u origin main
   ```

2. 進入 repo → **Settings** → **Pages** → **Build and deployment** → **Source** 選 **GitHub Actions**。
3. 推送後,到 **Actions** 分頁看部署進度。完成後網址為:
   `https://penguinwarrior.github.io/Portfolio/`

> 💡 **改 repo 名稱了?** 記得同步修改 `vite.config.js` 的 `base`(例如改名為 `my-site` 就設 `base: "/my-site/"`)。
> 想用根網域 `https://penguinwarrior.github.io/`?把 repo 命名為 `PenguinWarrior.github.io`,並把 `base` 改回 `"/"`。

## 📄 授權

MIT — 自由使用與修改。
