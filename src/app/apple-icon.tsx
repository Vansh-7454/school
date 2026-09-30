import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1B3A",
          borderRadius: 36,
          border: "4px solid #C9A24B",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            border: "2px solid rgba(201, 162, 75, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: "bold",
              color: "#C9A24B",
              fontFamily: "Georgia, serif",
              lineHeight: 1,
            }}
          >
            A
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
