export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // BRAND
        primary: "#0058BA",
        "primary-light": "#F7F5FF",
        "primary-border": "#EFEFFF",

        // BACKGROUND
        background: "#F8FAFC",
        surface: "#FFFFFF",
        "inverse-surface": "#020A2F",
        "surface-container-low": "#EFEFFF",

        // TEXT
        "on-surface": "#1A1A1A",
        "on-surface-variant": "#64748B",

        // BORDER
        "outline-variant": "#E2E8F0",

        // STATUS
        success: "#28A745",
        warning: "#FFC107",
        danger: "#DC3545",
        info: "#17A2B8",

        // CHART
        chartPrimary: "#0058BA",
        chartSecondary: "#8C4A00",
        chartIncome: "#10B981",
        chartExpense: "#EF4444",
      },

      borderRadius: {
        DEFAULT: "4px",
        lg: "4px",
        xl: "4px",
      },

      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};