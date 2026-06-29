"use client";

import type { PatternId, ColourwayId, WeightId } from "@/lib/products";

export type FilterState = {
  pattern: PatternId | "all";
  colour: ColourwayId | "all";
  weight: WeightId | "all";
};

type Props = {
  filters: FilterState;
  onChange: (f: FilterState) => void;
};

const PATTERNS: { id: PatternId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "meander", label: "Meander" },
  { id: "laurel", label: "Laurel" },
];

const COLOURS: { id: ColourwayId | "all"; label: string; hex?: string }[] = [
  { id: "all", label: "All" },
  { id: "fjord", label: "Fjord", hex: "#8DA6BE" },
  { id: "dune", label: "Dune", hex: "#C2A98A" },
  { id: "slate", label: "Slate", hex: "#7E8488" },
];

const WEIGHTS: { id: WeightId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "classic", label: "Classic" },
  { id: "heavyweight", label: "Heavyweight" },
];

export default function Filters({ filters, onChange }: Props) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem" }} role="group" aria-label="Filter products">
      <FilterGroup label="Pattern">
        {PATTERNS.map((p) => (
          <Chip
            key={p.id}
            active={filters.pattern === p.id}
            onClick={() => onChange({ ...filters, pattern: p.id })}
          >
            {p.label}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label="Colour">
        {COLOURS.map((c) => (
          <Chip
            key={c.id}
            active={filters.colour === c.id}
            onClick={() => onChange({ ...filters, colour: c.id })}
          >
            {c.hex && (
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  background: c.hex,
                  marginRight: "6px",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
            )}
            {c.label}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label="Weight">
        {WEIGHTS.map((w) => (
          <Chip
            key={w.id}
            active={filters.weight === w.id}
            onClick={() => onChange({ ...filters, weight: w.id })}
          >
            {w.label}
          </Chip>
        ))}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p
        className="font-sans"
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#6B665C",
          marginBottom: "0.75rem",
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }} role="radiogroup" aria-label={label}>
        {children}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className="font-sans"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0.4rem 0.85rem",
        fontSize: "0.7rem",
        letterSpacing: "0.08em",
        border: active ? "1px solid #1B2942" : "1px solid #D8CCB8",
        background: active ? "#1B2942" : "transparent",
        color: active ? "#F4EFE5" : "#6B665C",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </button>
  );
}
