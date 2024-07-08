# 天氣預報應用程式

這是一個使用 React、React Query 和 Zustand 開發的天氣預報 Web 應用程式，使用台灣中央氣象局的 API 來提供即時天氣資料。

## 功能特點

1. **地區選擇功能**：使用者可以選擇查詢的縣市地區。
   
2. **日期和時間選擇**：使用者可以選擇日期和時間，查詢該時段的天氣預報。
   
3. **不同時間範圍的天氣預報**：提供未來一周、未來兩天和 36 小時的天氣預報選項。
   
4. **天氣型態選擇**：使用者可以選擇特定的天氣型態（如晴天、雨天等），查詢符合條件的地區。
   
5. **結果排序功能**：支援依照不同天氣型態或氣溫高低排序功能。

## 使用技術

- **React**：用於構建用戶界面的主要框架。
- **React Query**：用於管理數據查詢和狀態管理。
- **Zustand**：用於本地狀態管理，例如天氣型態選擇和排序功能。

## API 使用

應用程式使用台灣中央氣象局提供的 API 來獲取天氣資料。API 的詳細說明和文件可以在以下連結找到：
[台灣中央氣象局 API 文件](https://opendata.cwa.gov.tw/dist/opendata-swagger.html)

## 規格書

本應用程式依照台灣中央氣象局的天氣資料規格書進行開發，詳細規格可以參考以下連結：
[台灣中央氣象局天氣資料規格書](https://opendata.cwa.gov.tw/opendatadoc/MFC/A0012-001.pdf)
