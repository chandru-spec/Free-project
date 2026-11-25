import { ImageResponse } from "next/og";

export const alt = "RERA Boutique — Ethnic & western edits, chosen with love";
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 70% 25%, #2A0F18 0%, #140A0E 78%)",
          color: "#FBF7F1",
          border: "2px solid rgba(201, 164, 106, 0.35)",
          padding: "48px",
        }}
      >
        <svg
          width="74"
          height="88"
          viewBox="0 0 48 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="5.5" r="2.6" fill="#E8C98A" />
          <path
            d="M9 51V24.5C9 17.5 16 14 24 9.5C32 14 39 17.5 39 24.5V51H9Z"
            stroke="#C9A46A"
            strokeWidth="1.8"
          />
        </svg>

        <div
          style={{
            marginTop: 22,
            fontSize: 74,
            fontWeight: 600,
            letterSpacing: "0.24em",
            color: "#FBF7F1",
          }}
        >
          RERA
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 18,
            letterSpacing: "0.48em",
            color: "#E8C98A",
          }}
        >
          BOUTIQUE
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "rgba(251, 247, 241, 0.82)",
          }}
        >
          Ethnic & western edits, chosen with love
        </div>
      </div>
    ),
    { ...size }
  );
}
