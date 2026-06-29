"use client";

type Props = {
  color?: "brass" | "line";
  className?: string;
};

export default function MeanderRule({ color = "brass", className = "" }: Props) {
  const stroke = color === "brass" ? "#AE8B4C" : "#D8CCB8";

  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 400 20"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        height="20"
      >
        {/* Greek-key meander path — unit cell repeated */}
        <pattern
          id={`meander-${color}`}
          x="0"
          y="0"
          width="40"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 18 L0 10 L8 10 L8 2 L24 2 L24 18 L16 18 L16 10 L32 10 L32 2 L40 2"
            fill="none"
            stroke={stroke}
            strokeWidth="1"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </pattern>
        <rect width="400" height="20" fill={`url(#meander-${color})`} />
      </svg>
    </div>
  );
}
