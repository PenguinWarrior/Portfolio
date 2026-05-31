import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages 會把站台放在 https://<帳號>.github.io/<repo>/
// 因此 base 必須是 "/<repo 名稱>/"。本 repo 名為 "Portfolio"。
// 若改成 <帳號>.github.io 這種根網域 repo，請把 base 改回 "/"。
export default defineConfig({
  base: "/Portfolio/",
  plugins: [react()],
});
