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
    // Mobile-first breakpoints
    screens: {
      'xs': '320px',     // iPhone SE (1st gen)
      'sm': '375px',     // iPhone SE, iPhone 8, iPhone X/11/12 mini
      'md': '390px',     // iPhone 12/13/14
      'lg': '430px',     // iPhone 14 Pro Max, iPhone 15 Plus
      'xl': '744px',     // iPad mini portrait
      '2xl': '1024px',   // iPad landscape, small laptops
      '3xl': '1280px',   // Desktop
      '4xl': '1536px',   // Large desktop
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
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
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
        ios: {
          blue: "hsl(var(--ios-blue))",
          gray: "hsl(var(--ios-gray))",
          "gray-dark": "hsl(var(--ios-gray-dark))",
          separator: "hsl(var(--ios-separator))",
          label: "hsl(var(--ios-label))",
          "label-secondary": "hsl(var(--ios-label-secondary))",
        },
        device: {
          bg: "hsl(var(--device-bg))",
          bezel: "hsl(var(--device-bezel))",
          notch: "hsl(var(--device-notch))",
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
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      // Spacing with tokens
      spacing: {
        'safe-top': 'var(--safe-area-top)',
        'safe-bottom': 'var(--safe-area-bottom)',
        'safe-left': 'var(--safe-area-left)',
        'safe-right': 'var(--safe-area-right)',
        'touch': 'var(--touch-target-min)',
        'touch-comfortable': 'var(--touch-target-comfortable)',
        'touch-large': 'var(--touch-target-large)',
        'fluid-xs': 'var(--space-fluid-xs)',
        'fluid-sm': 'var(--space-fluid-sm)',
        'fluid-md': 'var(--space-fluid-md)',
        'fluid-lg': 'var(--space-fluid-lg)',
        'fluid-xl': 'var(--space-fluid-xl)',
        'fluid-2xl': 'var(--space-fluid-2xl)',
        'device-width': 'var(--device-width)',
        'device-height': 'var(--device-height)',
      },
      // Size utilities
      width: {
        'device': 'var(--device-width)',
        'touch': 'var(--touch-target-min)',
        'touch-comfortable': 'var(--touch-target-comfortable)',
        'touch-large': 'var(--touch-target-large)',
      },
      height: {
        'device': 'var(--device-height)',
        'touch': 'var(--touch-target-min)',
        'touch-comfortable': 'var(--touch-target-comfortable)',
        'touch-large': 'var(--touch-target-large)',
      },
      minWidth: {
        'touch': 'var(--touch-target-min)',
        'touch-comfortable': 'var(--touch-target-comfortable)',
        'touch-large': 'var(--touch-target-large)',
      },
      minHeight: {
        'touch': 'var(--touch-target-min)',
        'touch-comfortable': 'var(--touch-target-comfortable)',
        'touch-large': 'var(--touch-target-large)',
      },
      // Font sizes with fluid typography
      fontSize: {
        'fluid-xs': 'var(--text-fluid-xs)',
        'fluid-sm': 'var(--text-fluid-sm)',
        'fluid-base': 'var(--text-fluid-base)',
        'fluid-lg': 'var(--text-fluid-lg)',
        'fluid-xl': 'var(--text-fluid-xl)',
        'fluid-2xl': 'var(--text-fluid-2xl)',
        'fluid-3xl': 'var(--text-fluid-3xl)',
        'fluid-4xl': 'var(--text-fluid-4xl)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "device": "var(--device-corner-radius)",
        "device-screen": "var(--device-screen-radius)",
        "device-inner": "var(--device-inner-radius)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        device: "var(--shadow-device)",
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
        "ios-spring": {
          "0%": { opacity: "0", transform: "scale(0.9) translateY(20px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "ios-fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "ios-slide-up": {
          from: { opacity: "0", transform: "translateY(100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "ios-push": {
          from: { opacity: "0", transform: "translateX(100%)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ios-spring": "ios-spring 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "ios-fade-in": "ios-fade-in 0.3s ease-out",
        "ios-slide-up": "ios-slide-up 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "ios-push": "ios-push 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "float": "float 3s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
