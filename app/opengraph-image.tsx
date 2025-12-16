import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          backgroundColor: "#0B1220",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(0,112,243,0.35) 0%, rgba(0,112,243,0) 55%), radial-gradient(circle at 85% 30%, rgba(0,196,204,0.25) 0%, rgba(0,196,204,0) 50%), radial-gradient(circle at 70% 85%, rgba(88,86,214,0.25) 0%, rgba(88,86,214,0) 55%)",
          color: "#E6EEF8",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 22,
              color: "rgba(230,238,248,0.85)",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#22C55E",
                boxShadow: "0 0 0 6px rgba(34,197,94,0.15)",
              }}
            />
            Portfolio • Mobile & Web
          </div>

          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -1.5 }}>
            Yoann Andrieux
          </div>

          <div style={{ fontSize: 34, color: "rgba(230,238,248,0.9)" }}>
            Développeur React Native
          </div>

          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {["React Native", "Next.js", "TypeScript", "iOS", "Android"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "10px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontSize: 20,
                  color: "rgba(230,238,248,0.9)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}

