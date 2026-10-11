# Smart Agri Management — Database

This directory contains all SQL scripts for setting up the Smart Agri Management database.

## 📄 Files

| File | Description |
|------|-------------|
| `smart_agri.sql` | Complete database schema + all tables + seed data (all-in-one) |
| `tables.sql` | DDL scripts — creates all tables with constraints and indexes |
| `sample_data.sql` | DML scripts — inserts sample/demo data for testing |

## 🛠️ Setup Instructions

### Prerequisites
- MySQL 8.0+ or MariaDB 10.6+

### Option 1: All-in-one
```sql
SOURCE smart_agri.sql;
```

### Option 2: Step by step
```sql
-- 1. Create and use the database
CREATE DATABASE smart_agri;
USE smart_agri;

-- 2. Create all tables
SOURCE tables.sql;

-- 3. (Optional) Load sample data
SOURCE sample_data.sql;
```

## 🗄️ Key Tables

- `users` — Farmers, Buyers, Admins
- `farms` — Farm details (location, area, soil type)
- `crops` — Crops registered per farm
- `orders` — Buyer orders for crops
- `payments` — Payment transactions
- `complaints` — User complaints
- `notifications` — System notifications
- `market_prices` — Daily crop market prices
- `reminders` — Farmer task reminders
