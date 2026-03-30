import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
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
        // Enhanced packaging tile colors
        tile: {
          green: "hsl(var(--tile-green))",
          pink: "hsl(var(--tile-pink))",
          orange: "hsl(var(--tile-orange))",
          yellow: "hsl(var(--tile-yellow))",
          blue: "hsl(var(--tile-blue))",
          teal: "hsl(var(--tile-teal))",
          lime: "hsl(var(--tile-lime))",
          coral: "hsl(var(--tile-coral))",
          purple: "hsl(var(--tile-purple))",
          turquoise: "hsl(var(--tile-turquoise))",
          mint: "hsl(var(--tile-mint))",
          magenta: "hsl(var(--tile-magenta))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        'times': ['Times', 'Times New Roman', 'serif'],
        'serif': ['Times', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        'brand': 'var(--shadow-brand)',
        'colorful': 'var(--shadow-colorful)',
        'vibrant': 'var(--shadow-vibrant)',
        'mosaic': 'var(--mosaic-border-thick)',
      },
      backgroundImage: {
        'mosaic': 'var(--mosaic-gradient-complex)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "bounce-gentle": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          }
        },
        "shimmer": {
          "0%": {
            backgroundPosition: "-200% 0"
          },
          "100%": {
            backgroundPosition: "200% 0"
          }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(-2deg)" },
          "50%": { transform: "translateY(-8px) rotate(2deg)" }
        },
        "saucer-hover": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "25%": { transform: "translateY(-10px) translateX(5px)" },
          "75%": { transform: "translateY(-6px) translateX(-5px)" }
        },
        "saucer-glow": {
          "0%, 100%": { filter: "drop-shadow(0 0 8px hsl(174 100% 35% / 0.4))" },
          "50%": { filter: "drop-shadow(0 0 20px hsl(174 100% 35% / 0.7))" }
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" }
        },
        "pop-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "80%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "bounce-hover": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "bounce-gentle": "bounce-gentle 2s infinite",
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "float-slow": "float-slow 4s ease-in-out infinite",
        "saucer-hover": "saucer-hover 4s ease-in-out infinite",
        "saucer-glow": "saucer-glow 3s ease-in-out infinite",
        "wiggle": "wiggle 2s ease-in-out infinite",
        "pop-in": "pop-in 0.5s ease-out forwards",
        "bounce-hover": "bounce-hover 0.4s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
