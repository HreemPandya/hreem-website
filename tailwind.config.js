/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./public/**/*.html"],
  mode: "jit",
  // Existing theme toggle swaps .dark-mode / .light-mode on <html> (see App.js),
  // so hook Tailwind's dark: variant + shadcn dark tokens to .dark-mode.
  darkMode: ["selector", ".dark-mode"],
  theme: {
    extend: {
      colors: {
        'noir-base':    '#07090D',
        'noir-deep':    '#0B0F18',
        'noir-surface': '#111827',
        'violet-noir':  '#7C3AED',
        'cyan-noir':    '#22D3EE',
        'amber-noir':   '#F59E0B',
        "deep-blue": "#010026",
        "green-400": "#68D391",
        "green-500": "#48BB78",
        "green-600": "#38A169",
        "green-700": "#2F855A",
        'terracotta': '#E76F51',
        'light-beige': '#F5E6D3',
        'lm-bg-base': '#F8F6F2',
        'lm-bg-surface': '#FDFCF9',
        'lm-text-primary': '#2A2A2A',
        'lm-text-muted': '#5A5A5A',
        'lm-accent': '#4A6B4E',
        blue: "#2CBCE9",
        red: "#DC4492",
        yellow: "#FDCC49",
        grey: "#ededed",
        "dark-grey": "#757575",
        "opaque-black": "rgba(0,0,0,0.35)",

        // shadcn/ui tokens — values come from the CSS variables in index.css.
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // Make a bare `border` (used by shadcn Card/Input/etc.) resolve to the token.
      borderColor: {
        DEFAULT: "hsl(var(--border))",
      },
      backgroundImage: (theme) => ({
        'gradient-noir': 'linear-gradient(135deg, #7C3AED 0%, #22D3EE 100%)',
        'gradient-noir-subtle': 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(34,211,238,0.08) 100%)',
        "gradient-rainbow":
          "linear-gradient(81.66deg, #00B5EE 7.21%, #FF45A4 45.05%, #FFBA00 78.07%)",

        "gradient-rainblue":
          "linear-gradient(90deg, #24CBFF 14.53%, #FC59FF 69.36%, #FFBD0C 117.73%)",
      }),
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        opensans: ["Open Sans", "sans-serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
