# 生活自保情報庫 — 每日情報網站

獨立靜態網站，不連接、不讀寫正式 SQLite；不使用《三國策衡》的 repository 或 Render service。

## Render Static Site 設定
- Repository：獨立新建立的 `lsi-daily-info`（可自行改名）
- Branch：`main`
- Build Command：`echo ready`
- Publish Directory：`.`
- Auto Deploy：`Yes`

## 每日更新
新增 `edition-YYYY-MM-DD.json`，再在 `editions.json` 的 `editions` 陣列首位加一筆日期、檔名及標籤；push 到 `main` 後由 Render 自動部署。

## 首期內容
2026-10-11 歷史試刊，4 個事件、6 份 L1/L2/L3 內容層級，其中 2 個事件列歷史回顧。不可當作 2026-10-12 的即時新聞。正式開站後仍須遵守基本來源、日期、時效審查。
