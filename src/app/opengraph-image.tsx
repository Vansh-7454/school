import { ImageResponse } from "next/og";

export const alt = "Aurelia International School | Nurturing Minds, Inspiring Excellence";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B1B3A",
          backgroundImage: "radial-gradient(circle at 50% 40%, #162B56 0%, #0B1B3A 75%, #060F22 100%)",
          color: "#FAF6ED",
          padding: "60px 80px",
          border: "16px solid #C9A24B",
          boxSizing: "border-box",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Subtle decorative inner border */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "1px solid rgba(201, 162, 75, 0.4)",
            display: "flex",
          }}
        />

        {/* Logo Crest / Monogram */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "3px solid #C9A24B",
            backgroundColor: "rgba(201, 162, 75, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: "bold",
              color: "#C9A24B",
              fontFamily: "Georgia, serif",
              lineHeight: 1,
            }}
          >
            A
          </div>
        </div>

        {/* School Name */}
        <div
          style={{
            fontSize: 54,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            textAlign: "center",
            color: "#FAF6ED",
            marginBottom: 14,
            display: "flex",
          }}
        >
          AURELIA INTERNATIONAL SCHOOL
        </div>

        {/* Gold Separator Bar */}
        <div
          style={{
            width: 180,
            height: 3,
            backgroundColor: "#C9A24B",
            marginBottom: 20,
            display: "flex",
          }}
        />

        {/* Motto / Tagline */}
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#C9A24B",
            textAlign: "center",
            fontWeight: 500,
            display: "flex",
          }}
        >
          Nurturing Minds · Inspiring Excellence · Shaping Tomorrow
        </div>

        {/* Sub-label */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 16,
            letterSpacing: "0.15em",
            color: "rgba(250, 246, 237, 0.6)",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
            display: "flex",
          }}
        >
          London · British & IB World School · Established 1894
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
