import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

// Keyhole/pointed-arch image mask — Arabic-inspired framing.
// Use sparingly: 1–2 places on the home page only.
export default function ArchFrame({ src, alt, className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,1 L0,0.38 Q0,0 0.5,0 Q1,0 1,0.38 L1,1 Z" />
          </clipPath>
        </defs>
      </svg>
      <div
        className="relative w-full h-full"
        style={{ clipPath: "url(#arch-clip)" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
