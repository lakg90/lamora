import type { Metadata } from "next";
import Image from "next/image";
import MeanderRule from "@/components/MeanderRule";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Sourcing",
  description:
    "The cashmere story — from fibre to fringe. How LAMORA throws are made.",
};

export default function SourcingPage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <div className="bg-ink pt-32 pb-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-eyebrow text-paper/40 mb-3">Materials &amp; craft</p>
          <h1 className="text-display-lg font-display text-paper font-light">
            From fibre<br />to fringe.
          </h1>
        </div>
      </div>
      <MeanderRule color="brass" />

      {/* The fibre */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <Reveal>
            <div>
              <p className="text-eyebrow-brass mb-4">The fibre</p>
              <h2 className="text-display-md font-display text-ink mb-5">
                Certified cashmere blend
              </h2>
              <div className="w-10 h-px bg-brass mb-6" />
              <div className="space-y-4 font-sans text-sm text-muted leading-relaxed">
                <p>
                  Cashmere is the undercoat of the cashmere goat — an inner
                  fleece so fine it can only be combed out by hand, once a year,
                  in spring. What reaches the loom is already scarce. What leaves
                  our workshop is selected for fineness and evenness.
                </p>
                <p>
                  Every LAMORA throw is a certified cashmere blend, verified
                  against international fibre standards. The certification covers
                  fibre grade, blend composition, and traceability back to origin.
                </p>
                <p>
                  The cloth is woven in India — one of the oldest cashmere
                  weaving traditions in the world, refined over centuries in the
                  workshops of Kashmir and the plains beyond.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="relative aspect-square overflow-hidden bg-paper-raised">
              <Image
                src="/products/meander-fjord-detail.jpg"
                alt="Close detail of the Meander weave showing cashmere texture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <MeanderRule color="line" />

      {/* The patterns */}
      <section className="py-20 px-6 md:px-16 bg-paper-raised">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-eyebrow mb-3">The weave</p>
            <h2 className="text-display-md font-display text-ink mb-14">
              Two patterns, one thread
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24">
            <Reveal delay={100}>
              <div>
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-paper">
                  <Image
                    src="/products/meander-dune-main.jpg"
                    alt="Meander pattern throw in Dune"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                </div>
                <p className="text-eyebrow-brass mb-2">Pattern I</p>
                <h3 className="font-display text-2xl text-ink font-light mb-3">
                  The Meander
                </h3>
                <div className="w-8 h-px bg-brass mb-4" />
                <p className="font-sans text-sm text-muted leading-relaxed">
                  A Greek key drawn in cashmere — geometry that has meant
                  &apos;unending&apos; for three thousand years. The pattern runs in
                  continuous interlocking lines, precise at any magnification,
                  holding its shape through years of use.
                </p>
              </div>
            </Reveal>
            <Reveal delay={220}>
              <div>
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-paper">
                  <Image
                    src="/products/laurel-fjord-main.jpg"
                    alt="Laurel pattern throw in Fjord"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                </div>
                <p className="text-eyebrow-brass mb-2">Pattern II</p>
                <h3 className="font-display text-2xl text-ink font-light mb-3">
                  The Laurel
                </h3>
                <div className="w-8 h-px bg-brass mb-4" />
                <p className="font-sans text-sm text-muted leading-relaxed">
                  A leaf that climbs the cloth, soft-edged and unhurried. The
                  Laurel is the organic counterpart to the Meander — where the
                  Greek key insists, the Laurel breathes.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <MeanderRule color="line" />

      {/* The finishing */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-eyebrow mb-3">Finishing</p>
            <h2 className="text-display-md font-display text-ink mb-6">
              The fringe
            </h2>
            <div className="w-10 h-px bg-brass mb-8" />
          </Reveal>
          <Reveal delay={150}>
            <div className="space-y-5 font-sans text-sm text-muted leading-relaxed max-w-prose">
              <p>
                Every LAMORA throw is finished with a hand-knotted fringe. This
                is not decoration: it is the structural finish that secures the
                weft threads and prevents unravelling. It is the last thing a
                maker touches before the cloth leaves.
              </p>
              <p>
                {/* PLACEHOLDER: workshop or finishing location to be confirmed by owner */}
                [PLACEHOLDER — finishing location and process to be confirmed.]
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <MeanderRule color="line" />

      {/* Care */}
      <section className="py-20 px-6 md:px-16 bg-paper-raised">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-eyebrow mb-3">Care</p>
            <h2 className="text-display-md font-display text-ink mb-6">
              A cloth that improves with age
            </h2>
            <div className="w-10 h-px bg-brass mb-8" />
          </Reveal>
          <Reveal delay={150}>
            <div className="space-y-4 font-sans text-sm text-muted leading-relaxed max-w-prose">
              <p>
                Dry clean, or hand wash cold and dry flat. Store folded with cedar.
              </p>
              <p>
                Pills are cashmere being cashmere — de-pill gently with a cashmere
                comb and the cloth improves with age. The fibres settle and soften
                after the first few washes.
              </p>
              <p>
                Avoid hanging, which stretches the weave. Fold, store flat, let it
                rest between uses.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
