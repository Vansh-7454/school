import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#0B1B3A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#C9A24B",
          borderRadius: 6,
          border: "1.5px solid #C9A24B",
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
        }}
      >
        A
      </div>
    ),
    {
      ...size,
    }
  );
}
