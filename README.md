# Nuxt_TodoList

## 關於專案
待辦清單todoList練習，使用 nuxt3 + tailwind + mongoose 開發。
![畫面](/public/demo.png)

## 開啟專案
Node.js 版本建議為：`20` 以上

### env檔案
```bash
# 可複製.env-example
MONGO_URL= 輸入mongoDB連結
```
### 套件安裝
```bash
# npm
npm install
```
### 專案運行
預設啟動：`http://localhost:3000`
```bash
# npm
npm run dev
```
## 資料夾說明
```txt
Nuxt_TodoList
├─ assets            // CSS檔案
├─ components        // vue組件
├─ pages             // vue頁面
├─ plugins           // 插件
├─ public            // 靜態資源，圖片等
├─ server            // mongodb連接，api等
│  ├─ api            // api       
│  ├─ models         // 資料庫模型
│  ├─ utils          // 工具
│  └─ index.js       // 入口
├─ utils             // 工具
├─ .env.example      
├─ .gitignore         
├─ .prettierrc.json  // Prettier 設定檔
├─ app.vue           // 頁面主入口
├─ nuxt.config.ts    
├─ package-lock.json
├─ package.json
├─ tailwind.config.js // tailwind 設定檔
└─ tsconfig.json
```
## 專案技術
- nuxt3 v3.13.0
- mongoose v8.7.0
- tailwindcss v3.4.13 

## 參考資料
- [D15：Nuxt 3.x Server API 整合 MongoDB 實作，邁向全端第一步](https://ithelp.ithome.com.tw/articles/10328551)
- [nuxt3-mongodb-crud](https://github.com/ReaganM02/nuxt3-mongodb-crud)