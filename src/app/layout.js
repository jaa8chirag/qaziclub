import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "QAZI CLUB | Actor • Performer • Singer | Official Artist Portal",
  description: "Official booking portal for QAZI CLUB — Actor, Performer & Singer. Direct gateway for institutional buyers, festival syndicates, enterprise patrons, and university councils.",
  keywords: ["Qazi Club", "Qazi", "Actor Performer Singer", "Qazi singer", "Qazi booking", "College Fest singer", "Live concerts", "Meet Qazi"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,100..900;1,6..96,100..900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Manrope:wght@100..900&family=Space+Grotesk:wght@100..900&display=swap"
          rel="stylesheet"
        />
        {/* Tailwind CDN configured for Warm Royal Linen & Champagne Gold Luxury Theme */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          id="tailwind-config"
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: "class",
                theme: {
                  extend: {
                    colors: {
                      "background": "#FAF8F5",
                      "surface": "#FFFFFF",
                      "surface-dim": "#F4F0E8",
                      "surface-bright": "#FFFFFF",
                      "surface-container-lowest": "#FFFFFF",
                      "surface-container-low": "#FBF9F6",
                      "surface-container": "#F6F3EC",
                      "surface-container-high": "#EFEBE2",
                      "surface-container-highest": "#E5DFD4",
                      "on-surface": "#141312",
                      "on-surface-variant": "#524E46",
                      "on-background": "#141312",
                      "primary": "#B68938",
                      "primary-container": "#D8AE56",
                      "on-primary": "#FFFFFF",
                      "on-primary-container": "#261B04",
                      "secondary": "#87672D",
                      "secondary-container": "#F7F1E4",
                      "on-secondary": "#FFFFFF",
                      "on-secondary-container": "#4F3B16",
                      "tertiary": "#9E742B",
                      "tertiary-container": "#F3E8CE",
                      "on-tertiary": "#FFFFFF",
                      "on-tertiary-container": "#3F2C0B",
                      "outline": "#D7D0C0",
                      "outline-variant": "#E8E2D6",
                      "surface-variant": "#EFEBE2",
                      "inverse-surface": "#1C1B19",
                      "inverse-on-surface": "#F8F6F0",
                      "error": "#BA1A1A",
                      "error-container": "#FFDAD6",
                      "on-error": "#FFFFFF",
                      "on-error-container": "#410002"
                    },
                    borderRadius: {
                      DEFAULT: "0.25rem",
                      lg: "0.5rem",
                      xl: "0.75rem",
                      "2xl": "1rem",
                      full: "9999px"
                    },
                    fontFamily: {
                      "body-sm": ["Manrope", "sans-serif"],
                      "title-lg": ["Manrope", "sans-serif"],
                      "body-md": ["Manrope", "sans-serif"],
                      "headline-lg-mobile": ["Bodoni Moda", "serif"],
                      "display-xl": ["Bodoni Moda", "serif"],
                      "body-lg": ["Manrope", "sans-serif"],
                      "label-lg": ["Space Grotesk", "monospace", "sans-serif"],
                      "label-sm": ["Space Grotesk", "monospace", "sans-serif"],
                      "label-md": ["Space Grotesk", "monospace", "sans-serif"],
                      "display-xl-mobile": ["Bodoni Moda", "serif"],
                      "title-md": ["Manrope", "sans-serif"],
                      "headline-sm": ["Bodoni Moda", "serif"],
                      "headline-md": ["Bodoni Moda", "serif"],
                      "headline-lg": ["Bodoni Moda", "serif"],
                      "serif-luxury": ["Cormorant Garamond", "serif"]
                    },
                    fontSize: {
                      "body-sm": ["13px", { lineHeight: "20px", fontWeight: "400" }],
                      "title-lg": ["20px", { lineHeight: "28px", fontWeight: "600" }],
                      "body-md": ["15px", { lineHeight: "24px", fontWeight: "400" }],
                      "headline-lg-mobile": ["32px", { lineHeight: "40px", fontWeight: "500" }],
                      "display-xl": ["72px", { lineHeight: "80px", letterSpacing: "-0.02em", fontWeight: "600" }],
                      "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
                      "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.08em", fontWeight: "600" }],
                      "label-sm": ["10px", { lineHeight: "14px", letterSpacing: "0.14em", fontWeight: "500" }],
                      "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.1em", fontWeight: "500" }],
                      "display-xl-mobile": ["40px", { lineHeight: "48px", letterSpacing: "-0.01em", fontWeight: "600" }],
                      "title-md": ["16px", { lineHeight: "24px", fontWeight: "600" }],
                      "headline-sm": ["24px", { lineHeight: "32px", fontWeight: "600" }],
                      "headline-md": ["32px", { lineHeight: "40px", fontWeight: "500" }],
                      "headline-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.01em", fontWeight: "500" }]
                    }
                  }
                }
              };
            `
          }}
        />
      </head>
      <body className="bg-background font-body-md text-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
        {children}
      </body>
    </html>
  );
}
