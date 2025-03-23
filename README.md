# GOIT Team Project - Node.js Task Manager Client

This is the client for the Task Manager application built with **React.js** and styled with **TailwindCSS**. It includes full support for authentication, board/column/card management, and theme customization using static image assets.

---

## 🚀 Features

- **JWT Authentication** (Login / Register)
- **Boards** with title, icon, background image
- **Columns** per board
- **Cards** per column with priorities, deadlines
- **Static assets serving** (backgrounds & icons)

## 🛠️ Installation

1. **Clone the project:**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create a `.env.local` file:**

```env
VITE_API_URL=http://localhost:5000
```

---
## 📂 Project Structure

```bash
GOIT-TASK-MANAGER-BACKEND/
├── public/
│      ├── images/
│      └── svg/
├── src/
│   ├── assets/
│   ├── components/
│   │     └── themeToggle.jsx
│   ├── pages/
│   │     └──WelcomePage.jsx
│   ├── redux/
│   │     └── slices/
│   │     │     └── userSlice.js
│   │     ├── selectors.js
│   │     └── store.js
│   ├── services/
│   │     ├── reduxServices.js
│   │     └── userServices.js
│   ├── utils/
│   │     ├── apiClient.js
│   │     ├── cookies.js
│   │     └── notUsed.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.local
├── index.html
├── package.json
├── package-lock.json
├── eslint.config.js
├── vite.config.js
└── README.md
```

---