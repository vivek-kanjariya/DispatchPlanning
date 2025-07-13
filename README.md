# 🚀 Dispatch & Space Optimization Web App

**Modular • Scalable • AI-Powered • Beautifully Animated**

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Component Details](#component-details)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Successes & Challenges](#successes--challenges)
- [Recommendations](#recommendations)
- [Credits & License](#credits--license)

---

## 🎯 Overview

This React-based frontend powers an AI logistics assistant with two main modules:

- **Dispatch Planning** (`/dashboard`)  
  → Upload product-level dispatch data and receive optimized routing and prediction logic.

- **Space Optimization** (`/sop`)  
  → Upload warehouse layout/pallet data to get AI-optimized stacking and space logic.

Both modules reuse a shared core: `FileUploadDashboard` with advanced file handling, live metadata, and result visualization (tables + graphs). All components are animated with `Framer Motion` and styled using `TailwindCSS`.

---

## ✨ Features

- 🔁 **Reusable File Upload Component** (`FileUploadDashboard`)
  - Drag & Drop + File Parser (.csv / .xlsx)
  - Metadata preview and result previews
- 📊 **Live Visualization**
  - Responsive tables (`<Table />`)
  - Dynamic graphs (`<Graph />`)
- 🎨 **Glassmorphism UI**
  - TailwindCSS with custom themes
  - Animated transitions with Framer Motion
- 🔧 **State Management**
  - Local state via `useState`, `useMemo`, `useEffect`

---

## 📂 Folder Structure

```
src/
├── App.jsx                # Routing + PopUp control
├── index.js              # Entry point
├── assets/               # Sample files (dispatch.csv, sop.csv)
├── Components/
│   ├── FileUploadDashboard.jsx
│   ├── Table.jsx
│   ├── Graph.jsx
│   └── PopUp.jsx
└── Pages/
    ├── Dashboard.jsx
    ├── Sop.jsx
    └── NotFound.jsx
```

---

## 🧩 Component Details

### 🗃️ FileUploadDashboard.jsx

- Accepts:
  - `endpoint` (POST URL)
  - `sampleFilePath` (CSV/XLSX)
  - `setPopup`, `setResponse`
- Uses:
  - [`papaparse`](https://www.npmjs.com/package/papaparse) for CSV parsing  
  - [`xlsx`](https://www.npmjs.com/package/xlsx) for Excel  
  - [`axios`](https://axios-http.com/) for backend communication  
- Features:
  - Size validation (≤ 15MB)
  - Shows metadata (columns, rows)
  - Preview first 3 rows
  - Animated UI feedback
  - Sends JSON payload as:  
    ```json
    {
      "columns": [...],
      "data": [[...], [...]]
    }
    ```

### 📋 Table.jsx

- Fully dynamic headers and rows
- Tailwind-styled glassmorphism container
- Scrollable & responsive

### 📈 Graph.jsx

- Built with [`recharts`](https://recharts.org/)
- Dynamic Bar/Line Chart combo
- Color-picking + interactive tooltips
- Reads numeric columns only

### 🧠 Dashboard.jsx

- Route: `/dashboard`
- Upload dispatch data (e.g., SKU, weight, urgency)
- Backend returns prediction-enhanced dispatch plan
- Glass container renders:
  - `<Table data={...} />`
  - `<Graph data={...} />`

### 🧠 Sop.jsx

- Route: `/sop`
- Uploads warehouse/pallet dataset
- Backend returns optimized storage/space plan
- Handles transition animation (`Framer Motion`)
- Displays structured output like `/dashboard`

---

## ⚙️ Tech Stack

| Tool                | Purpose                               |
|---------------------|----------------------------------------|
| [React + Vite](https://vitejs.dev/) | Frontend core                          |
| [TailwindCSS](https://tailwindcss.com/) | Styling and layout                   |
| [Framer Motion](https://www.framer.com/motion/) | Animations                          |
| [Axios](https://axios-http.com/) | API Communication                      |
| [PapaParse](https://www.npmjs.com/package/papaparse) | CSV Parser         |
| [xlsx](https://www.npmjs.com/package/xlsx) | Excel Parser                         |
| [Recharts](https://recharts.org/) | Graphs & Charts                        |

---

## ⚡ Setup

```bash
# Clone the repository
git clone https://github.com/your-username/dispatch-space-ui.git
cd dispatch-space-ui

# Install dependencies
npm install

# Start local dev server
npm run dev
```

**Backend Required:**  
Make sure your backend is running at the same `endpoint` provided in each page.

---

## 🖼️ Screenshots

> Add real screenshots below for better UX understanding

| Upload | Metadata | Table + Graph |
|--------|----------|----------------|
| ✅ Drag-n-drop | ✅ File stats | ✅ Smart visual |

---

## 🚧 Future Enhancements

- [ ] Pagination and sorting for large tables
- [ ] Visual skeletons during file parsing
- [ ] CSV/XLSX export of optimized results
- [ ] Add PropTypes or TypeScript migration
- [ ] Better mobile adaptation
- [ ] Improved toast popup with custom hook

---

## ✅ Successes & Challenges

### Successes

- ✨ Achieved a clean, fluid UI with animation
- ♻️ Component reuse across multiple pages
- 🔁 Proper API flow: file → preview → backend → table/graph
- 📐 Smart layout with Tailwind responsiveness
- 🚫 Handled backend edge cases gracefully

### Challenges

- 🧩 Dynamic column mapping from raw matrix
- 🔐 Backend CORS and SSL issues during localhost testing
- 🛠️ Recharts being picky with data types
- 🧠 Managing state between file ↔ backend ↔ visualization

---

## 🧪 Recommendations

- Use `.env.local` to store endpoint base URL
- Add E2E testing (Playwright or Cypress)
- Introduce lightweight global state (Zustand)
- Add role-based UI for operator/admin
- Deploy to Netlify/Vercel with CI

---

## 🙏 Credits & License

- Built with 💪 by **Vivek K**
- [MIT License](LICENSE)

---

> “Simple Drag n Drop — Scalable AI.”

