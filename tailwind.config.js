/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        "card-bg": "var(--color-card-bg)",
        "modal-bg": "var(--color-modal-bg)",
        "sidebar-bg": "var(--color-sidebar-bg)",
        "top-bar": "var(--color-top-bar)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        title: "var(--color-title)",
        "btn-text": "var(--color-btn-text)",
        text: "var(--color-text)",
        input: "var(--color-input)",
        "input-active": "var(--color-input-active)",
        placeholder: "var(--color-placeholder)",
        "input-text": "var(--color-input-text)",
        icon: "var(--color-icon)",
        "icon-selected": "var(--color-icon-selected)",
        "icon-active": "var(--color-icon-active)",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [],
};
