# Smart Agri Management — Frontend

> React + Vite frontend for the Smart Agri Management platform.

## 🚀 Tech Stack

- **React 19** — UI framework
- **Vite 8** — Build tool & dev server
- **React Router** — Client-side routing
- **Vanilla CSS** — Component-scoped styles
- **OxLint** — Fast JavaScript linter

## 📁 Project Structure

```
frontend/
├── public/               # Static assets (favicon, robots.txt, manifest.json)
├── src/
│   ├── assets/           # Images, icons, fonts, videos
│   ├── components/       # Reusable UI components
│   ├── layouts/          # Page layout wrappers (Main, Dashboard, Auth)
│   ├── pages/            # Route-level pages (Farmer, Buyer, Admin, Auth)
│   ├── routes/           # App routing configuration
│   ├── services/         # API service layer (Axios calls)
│   ├── context/          # React context providers (Auth, Theme, Language)
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── constants/        # Global constants and enums
│   ├── config/           # App configuration (API endpoints, roles, theme)
│   ├── data/             # Static data (crops, menus, testimonials)
│   ├── App.jsx           # Root component
│   └── main.jsx          # Entry point
├── index.html            # HTML entry point
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies
```

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🌐 Environment Variables

Create a `.env` file in this directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Smart Agri Management
```

## 👥 User Roles

| Role    | Description                        |
|---------|------------------------------------|
| Farmer  | Manage farms, crops, irrigation    |
| Buyer   | Browse marketplace, place orders   |
| Admin   | Manage all users, view reports     |
