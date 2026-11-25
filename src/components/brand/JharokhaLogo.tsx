import React from "react";

interface JharokhaMarkProps {
  size?: number;
  className?: string;
  strokeColor?: string;
  dotColor?: string;
  animated?: boolean;
}

export function JharokhaMark({
  size = 36,
  className = "",
  strokeColor = "currentColor",
  dotColor = "#E8C98A",
  animated = false,
}: JharokhaMarkProps) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.18)}
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Bindu dot at the crown */}
      <circle cx="24" cy="5.5" r="2.5" fill={dotColor} />

      {/* Outer Jharokha Arch */}
      <path
        d="M9 51V24.5C9 17.5 16 14 24 9.5C32 14 39 17.5 39 24.5V51H9Z"
        stroke={strokeColor}
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeDasharray={animated ? "160" : undefined}
        strokeDashoffset={animated ? "0" : undefined}
      />

      {/* Inner delicate arch */}
      <path
        d="M14.5 51V26.5C14.5 21.3 19 18.7 24 15.6C29 18.7 33.5 21.3 33.5 26.5V51"
        stroke={strokeColor}
        strokeOpacity="0.48"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface BrandWordmarkProps {
  tone?: "light" | "dark";
  compact?: boolean;
}

export function BrandWordmark({ tone = "light", compact = false }: BrandWordmarkProps) {
  const textColor = tone === "light" ? "#FBF7F1" : "#2B1D1C";
  const subColor = tone === "light" ? "#E8C98A" : "#5E2230";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? "10px" : "12px",
      }}
    >
      <JharokhaMark
        size={compact ? 28 : 34}
        strokeColor={tone === "light" ? "#C9A46A" : "#5E2230"}
        dotColor="#E8C98A"
      />
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: compact ? "22px" : "26px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: textColor,
          }}
        >
          RERA
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.42em",
            color: subColor,
            marginTop: "3px",
            paddingLeft: "1px",
          }}
        >
          BOUTIQUE
        </span>
      </span>
    </span>
  );
}
