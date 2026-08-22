import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#F5F5F7",
          backgroundImage:
            "radial-gradient(circle at 18% 18%, rgba(0,112,243,.2) 0%, rgba(0,112,243,0) 52%), radial-gradient(circle at 86% 30%, rgba(0,196,204,.14) 0%, rgba(0,196,204,0) 48%)",
          color: "#1D1D1F",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 74px", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", color: "#68707D", fontSize: 20 }}>
            <span style={{ width: 12, height: 12, marginRight: 12, borderRadius: 99, background: "#22C55E", boxShadow: "0 0 0 7px rgba(34,197,94,.14)" }} />
            Portfolio · Mobile & Web
          </div>
          <div style={{ marginTop: 58, display: "flex", flexDirection: "column", fontSize: 94, lineHeight: .9, fontWeight: 800, letterSpacing: -4 }}>
            <span>Yoann</span>
            <span>Andrieux</span>
          </div>
          <div style={{ marginTop: 34, color: "#0070F3", fontSize: 50, fontWeight: 750 }}>
            Dev React Native
          </div>
          <div style={{ marginTop: 26, color: "#68707D", fontSize: 19, letterSpacing: 1 }}>
            React Native · React · Next.js · TypeScript · Produit & UX
          </div>
        </div>
        <div style={{ position: "absolute", right: 74, bottom: 44, color: "#68707D", fontSize: 16, letterSpacing: 2 }}>
          YOANN-ANDRIEUX.FR
        </div>
      </div>
    ),
    size
  );
}
