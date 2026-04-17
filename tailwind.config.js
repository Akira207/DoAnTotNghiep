/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        // 🎯 Core Colors
        primary: "#007BFF",
        secondary: "#FF8C00",
        tertiary: "#2ECC71",

        // 🎯 Background & Surface System (NO-LINE design)
        background: "#F7F5FF",
        surface: "#F7F5FF",

        "surface-container-low": "#EFEFFF",
        "surface-container": "#E4E7FF",
        "surface-container-high": "#DDE1FF",
        "surface-container-highest": "#D5DBFF",
        "surface-container-lowest": "#FFFFFF",

        // 🎯 Text
        "on-background": "#232C51",
        "on-surface": "#232C51",
        "on-surface-variant": "#505A81",
        "on-primary": "#FFFFFF",
        "on-secondary": "#FFFFFF",
        "on-tertiary": "#FFFFFF",

        // 🎯 State Colors
        success: "#2ECC71",
        warning: "#FF8C00",
        error: "#E53935",

        // 🎯 Soft Containers (for badges / states)
        "primary-container": "#CCE5FF",
        "secondary-container": "#FFE0C2",
        "tertiary-container": "#D4F8E8",
      },

      // 🎯 Typography (Inter only)
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      fontSize: {
        // Display (stats)
        display: ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],

        // Headline
        h1: ["32px", { lineHeight: "1.2", fontWeight: "800" }],
        h2: ["24px", { lineHeight: "1.3", fontWeight: "800" }],
        h3: ["18px", { lineHeight: "1.4", fontWeight: "700" }],

        // Body
        body: ["14px", { lineHeight: "1.6" }],
        body_sm: ["12px", { lineHeight: "1.5" }],

        // Label
        label: ["11px", { lineHeight: "1.4", letterSpacing: "0.05em" }],
      },

      // 🎯 Border radius (Subtle only)
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
      },

      // 🎯 Shadow (soft - no harsh lines)
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.05)",
        card: "0 8px 30px rgba(0,0,0,0.06)",
      },

      // 🎯 Spacing (Normal density)
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },

      // 🎯 Animation (subtle only)
      animation: {
        pulse_soft: "pulseSoft 2s ease-in-out infinite",
      },

      keyframes: {
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.6 },
        },
      },
    },
  },

  plugins: [],
};