# Newzzer 📰

A React-based news aggregator app that provides real-time headlines across multiple categories and countries, powered by the [GNews API](https://gnews.io).

🔗 **Live Demo:** [newzzer-frontend.onrender.com](https://newzzer-frontend.onrender.com)

## 🛠️ Tech Stack

| Layer       | Technology                  |
| ----------- | --------------------------- |
| Frontend    | React, Bootstrap            |
| Backend     | Node.js, Express            |
| News Source | GNews API                   |
| Hosting     | Render (Frontend + Backend) |

## 🏗️ Architecture

```
[React Frontend] ──── /news?country=us&category=tech ────> [Express Proxy] ──── GNews API
   (Render)                                                    (Render)
```

### Why a Proxy Server?

Browsers block direct API calls to third-party services due to **CORS** policy. The React frontend calls this Express proxy instead, which fetches data server-side and returns it cleanly.

## ✨ Features

- 🌍 Filter news by **country**
- 🗂️ Browse by **category** (technology, sports, health, and more)
- 📱 Responsive design with **Bootstrap** styling
- ⚡ Intuitive navigation

## 🔑 Multiple API Key Rotation

GNews free tier allows only **100 requests/day per key**. The proxy server supports multiple comma-separated keys and rotates through them automatically:

```
NEWS_API=key1,key2,key3
```

- Tries **key1** first → falls back to **key2** → then **key3**
- Returns an error only if **all keys are exhausted**

## ⚡ Keeping the Server Alive

Render spins down free-tier services after 15 minutes of inactivity. **UptimeRobot** pings the `/health` endpoint regularly to keep the backend alive 24/7.

## 📁 Project Structure

```
newzzer/
├── frontend/       # React app
└── backend/        # Express proxy server
```

## 🌐 Environment Variables

```env
# Backend
PORT=3001
NEWS_API=your_key_1,your_key_2,your_key_3
```

## 📦 Getting Started

```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm start
```
