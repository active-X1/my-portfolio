import type { Config } from "tailwindcss";

const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: token("background"),
        foreground: token("foreground"),
        card: token("card"),
        muted: token("muted"),
        "muted-foreground": token("muted-foreground"),
        border: token("border"),
        accent: token("accent"),
        "accent-foreground": token("accent-foreground"),
        link: token("link"),
        success: token("success"),
        danger: token("danger"),
      },
      fontSize: {
        "fluid-display": ["clamp(2rem, 1.25rem + 3.6vw, 4rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "fluid-h1": ["clamp(1.75rem, 1.3rem + 2.2vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "fluid-h2": ["clamp(1.25rem, 1.05rem + 1vw, 1.875rem)", { lineHeight: "1.2" }],
        "fluid-lead": ["clamp(1rem, 0.94rem + 0.3vw, 1.1875rem)", { lineHeight: "1.65" }],
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "bar-grow": { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
        wobble: {
          "0%, 80%, 100%": { transform: "rotate(0deg)" },
          "84%": { transform: "rotate(-9deg)" },
          "88%": { transform: "rotate(8deg)" },
          "92%": { transform: "rotate(-5deg)" },
          "96%": { transform: "rotate(3deg)" },
        },
        blink: {
          "0%, 92%, 100%": { transform: "scaleY(1)" },
          "96%": { transform: "scaleY(0.1)" },
        },
        "pop-in": {
          from: { opacity: "0", transform: "translateY(8px) scale(0.96)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "menu-in": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "bar-grow": "bar-grow 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        wobble: "wobble 6s ease-in-out infinite",
        blink: "blink 5s ease-in-out infinite",
        "pop-in": "pop-in 0.2s ease-out both",
        "menu-in": "menu-in 0.18s ease-out both",
        "rise-in": "rise-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
