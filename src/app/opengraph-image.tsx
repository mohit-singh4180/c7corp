import { ImageResponse } from "next/og";

export const alt = "C7 Corp — Innovative Solutions for Modern Businesses";
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
          background: "linear-gradient(135deg, #10143a 0%, #1d1b4b 50%, #2b1f55 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          padding: "60px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(180deg, #f7ce7a 0%, #eab04a 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: "bold",
              color: "#181008",
            }}
          >
            C7
          </div>
          <span
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            Corp
          </span>
        </div>

        <h1
          style={{
            fontSize: "56px",
            fontWeight: "800",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            color: "#ffffff",
            marginBottom: "20px",
            maxWidth: "960px",
          }}
        >
          Innovative Solutions for{" "}
          <span style={{ color: "#f5be6c" }}>Modern Businesses</span>
        </h1>

        <p
          style={{
            fontSize: "24px",
            lineHeight: 1.5,
            color: "rgba(255, 255, 255, 0.85)",
            maxWidth: "800px",
            marginBottom: "40px",
          }}
        >
          AI-first company building next-generation web &amp; mobile apps.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "18px",
            color: "#fed078",
            fontWeight: "600",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <span>Dubai Hub</span>
          <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>•</span>
          <span>Delhi Hub</span>
          <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>•</span>
          <span>c7corp.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
