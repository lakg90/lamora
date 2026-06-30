import type { Metadata } from "next";
import Image from "next/image";
import MeanderRule from "@/components/MeanderRule";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Heritage",
  description:
    "The LAMORA story — certified cashmere blend, woven in India, made with intention.",
};

export default function HeritagePage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <div className="bg-ink pt-32 pb-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-eyebrow text-paper/40 mb-3">Brand story</p>
          <h1 className="text-display-lg font-display text-paper font-light">
            The cloth.<br />The crest.<br />The commitment.
          </h1>
        </div>
      </div>
      <MeanderRule color="brass" />

      {/* The mark — new logo */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden bg-ink flex items-center justify-center">
              <Image
                src="/brand/lamora-logo-new.png"
                alt="LAMORA crest"
                fill
                className="object-contain"
                style={{ mixBlendMode: "screen", padding: "2rem" }}
              />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div>
              <p className="text-eyebrow-brass mb-4">The mark</p>
              <h2 className="text-display-md font-display text-ink mb-5">
                LAMORA
              </h2>
              <div className="w-10 h-px bg-brass mb-6" />
              <div className="space-y-4 font-sans text-sm text-muted leading-relaxed">
                <p>
                  The name is the crest and the crest is the name. A llama
                  standing on the high plateau, mountains behind it — the
                  animal at altitude, where cold air produces the finest
                  undercoat. That is where LAMORA begins.
                </p>
                <p>
                  Two traditions meet in the cloth: Nordic restraint in the
                  palette, Arabic precision in the geometry. The Greek-key
                  motif runs through Islamic tilework and Scandinavian stone
                  alike. LAMORA sits at that junction — calm surface,
                  intricate interior.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <MeanderRule color="line" />

      {/* The material */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <Reveal delay={200}>
            <div>
              <p className="text-eyebrow-brass mb-4">The material</p>
              <h2 className="text-display-md font-display text-ink mb-5">
                Certified cashmere blend
              </h2>
              <div className="w-10 h-px bg-brass mb-6" />
              <div className="space-y-4 font-sans text-sm text-muted leading-relaxed">
                <p>
                  Every LAMORA throw is a certified cashmere blend, verified
                  against international fibre standards. The certification
                  covers fibre grade, blend composition, and traceability
                  back to origin.
                </p>
                <p>
                  The cloth is woven in India — one of the oldest cashmere
                  weaving traditions in the world, refined over centuries
                  in the workshops of Kashmir and the plains beyond.
                  We work with mills that have held the craft long enough
                  to do it without instruction.
                </p>
                <p>
                  A portion of every acquisition funds active lobbying
                  against child labour in Indian textile production. The
                  industry has a problem. We are part of the industry,
                  and we intend to use that position.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="relative aspect-[3/4] overflow-hidden bg-paper-raised">
              <Image
                src="/products/laurel-dune-detail.jpg"
                alt="Detail of the Laurel cashmere weave"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <MeanderRule color="line" />

      {/* The idea */}
      <section className="py-20 px-6 md:px-16 bg-paper-raised">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-eyebrow mb-5">The idea</p>
            <h2 className="text-display-md font-display text-ink mb-6">
              Nordic meets Arabic
            </h2>
            <div className="w-10 h-px bg-brass mx-auto mb-8" />
          </Reveal>
          <Reveal delay={150}>
            <div className="space-y-5 font-sans text-sm text-muted leading-relaxed max-w-prose mx-auto text-left">
              <p>
                Nordic sets the canvas: calm, generous space, restraint,
                almost no ornament beyond what is structural. The white of
                snow, the grey of stone, the long horizontal of the fjord.
              </p>
              <p>
                Arabic supplies the soul: precise geometry, a sense of
                ceremony, warmth expressed not in colour but in pattern.
                The meander is a Greek-key motif — but the Greek key is
                also found in Islamic geometric art, woven into tiles,
                carved into marble. The two traditions share more than
                they acknowledge.
              </p>
              <p>
                LAMORA sits at that meeting point. The palette is Nordic —
                cream, navy, the muted blue of water. The patterning is
                geometric, carried from one civilisation&apos;s tiles into
                another&apos;s cloth.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
