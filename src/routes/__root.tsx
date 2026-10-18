import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "fleshsesh academy — Curiosity. Confidence. Connection." },
      { name: "description", content: "Inclusive, expert-led education for a more curious, confident and connected you. Sexuality, consent, communication and wellbeing." },
      { name: "theme-color", content: "#1A0F1F" },
      { property: "og:title", content: "fleshsesh academy — Curiosity. Confidence. Connection." },
      { property: "og:description", content: "A modern night campus for adult learning. Sexuality, consent, communication and wellbeing." },
      { property: "og:image", content: "/og.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "fleshsesh academy — Curiosity. Confidence. Connection." },
      { name: "twitter:description", content: "A modern night campus for adult learning. Sexuality, consent, communication and wellbeing." },
      { name: "twitter:image", content: "/og.jpg" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon-32.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  component: () => (
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
