# Smart Agri Management — API Collection

This directory contains the Postman collection for testing all Smart Agri Management REST APIs.

## 📄 Files

| File | Description |
|------|-------------|
| `SmartAgri.postman_collection.json` | Full Postman collection with all API endpoints |

## 🚀 How to Import

1. Open **Postman**
2. Click **Import** → **Upload Files**
3. Select `SmartAgri.postman_collection.json`
4. Click **Import**

## ⚙️ Environment Setup

Create a Postman Environment with the following variables:

| Variable | Value |
|----------|-------|
| `base_url` | `http://localhost:8080/api` |
| `token` | *(set after login)* |
| `farmer_token` | *(set after farmer login)* |
| `buyer_token` | *(set after buyer login)* |
| `admin_token` | *(set after admin login)* |

## 📋 API Modules

| Module | Base Path |
|--------|-----------|
| Auth | `/api/auth` |
| Farmer | `/api/farmer` |
| Farm Management | `/api/farms` |
| Crop Management | `/api/crops` |
| Buyer | `/api/buyer` |
| Marketplace | `/api/market` |
| Orders | `/api/orders` |
| Payments | `/api/payments` |
| Admin | `/api/admin` |
| Weather | `/api/weather` |
| Notifications | `/api/notifications` |
| Complaints | `/api/complaints` |

## 🔐 Authentication

All protected endpoints require a **Bearer token** in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```
Run the **Login** request first to obtain a token.
