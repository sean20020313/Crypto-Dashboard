# Crypto Dashboard - 加密貨幣價格、市值與圖表分析網站

這是一個基於 React 的加密貨幣儀表板，整合 CoinGecko API，提供即時幣種資訊、價格走勢圖與市值估算工具，適合幣圈愛好者與學習者。

## 功能特色

- 市值前 20 大加密貨幣資訊
- 顯示名稱、價格、24h 漲跌、市值與交易量
- 支援幣種名稱搜尋
- 顯示最近 7 天的價格折線圖（Sparkline）
- 市值／價格估算工具（輸入任意一項，自動換算）
- React 快速渲染，支援部署至 Vercel、Netlify

## 技術架構

| 分類     | 技術                            |
| -------- | ------------------------------- |
| 前端框架 | React 18                        |
| API      | CoinGecko API                   |
| 圖表庫   | Chart.js（或 Recharts）         |
| HTTP     | Axios                           |
| UI 套件  | 可選 Tailwind CSS               |
| 部署     | Vercel / Netlify / GitHub Pages |

## 專案結構

crypto-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── CoinList.js
│   │   ├── CoinChart.js
│   │   └── Estimator.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md

## 安裝與啟動

```bash
git clone https://github.com/your-username/crypto-dashboard.git
cd crypto-dashboard
npm install
npm start
```

開啟瀏覽器：`http://localhost:3000`

## 🔌 API 使用說明

本網站資料來源為 CoinGecko：

### 幣種基本資料（前 20 名）

```http
GET /coins/markets
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true
```

## 市值與價格估算公式

```text
價格 = 市值 ÷ 流通量
市值 = 價格 × 流通量
```

> 使用者可輸入任一項，自動估算另外兩項。

## 📄 License

MIT License © 2025 sean chang

## 🙋‍♂️ 開發者

- GitHub: [@sean20020313](https://github.com/sean20020313/sean20020313.git)
- Email: sean20020313@gmail.com
