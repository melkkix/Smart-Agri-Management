# 🌾 Smart Agri Management

> A full-stack smart agriculture management platform connecting farmers, buyers, and administrators — built with React + Vite (frontend) and Spring Boot (backend).

---

## 🚀 Overview

Smart Agri Management empowers farmers with:
- 🌱 **Crop & Farm Management** — register farms, track crops, get recommendations
- 🌦️ **Weather & Irrigation** — real-time weather, irrigation scheduling
- 💰 **Market Prices** — live crop price tracking
- 🛒 **Marketplace** — buyers browse and purchase crops directly from farmers
- 📊 **Dashboard & Analytics** — financial reports, reminders, notifications
- 🛡️ **Admin Panel** — manage users, resolve complaints, view reports

---

## 🏗️ Project Structure

```
Smart-Agri-Management/
├── frontend/        # React + Vite (UI)
├── backend/         # Spring Boot (REST API)
├── database/        # MySQL SQL scripts
├── api/             # Postman collection
└── documents/       # SRS, ER diagrams, reports
```

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 19, Vite 8, Vanilla CSS     |
| Backend    | Spring Boot, Spring Security, JWT |
| Database   | MySQL 8                           |
| API Docs   | Postman                           |

---

## ⚡ Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
```
> Runs on http://localhost:5173

### Backend
```bash
cd backend
./mvnw spring-boot:run
```
> Runs on http://localhost:8080

### Database
```sql
SOURCE database/smart_agri.sql;
```

---

## 👥 User Roles

| Role   | Access |
|--------|--------|
| 🧑‍🌾 Farmer | Farm, crop, irrigation, market, financial tools |
| 🛒 Buyer  | Marketplace, orders, payments |
| 🛡️ Admin  | Full system management & reports |

---

## 📄 License

[MIT License](./LICENSE) © 2026 Smart Agri Management
