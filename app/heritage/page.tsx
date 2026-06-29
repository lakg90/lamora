import type { Metadata } from "next";
import Image from "next/image";
import MeanderRule from "@/components/MeanderRule";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Heritage",
  description:
    "The LAMORA story — a name, a crest, and two traditions meeting in a single cloth.",
};

export default function HeritagePage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <div className="bg-ink pt-32 pb-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-eyebrow text-paper/40 mb-3">Brand story</p>
          <h1 className="text-display-lg font-display text-paper font-light">
            The name.<br />The mark.<br />The idea.
          </h1>
        </div>
      </div>
      <MeanderRule color="brass" />

      {/* The name */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <Reveal>
            <div className="relative aspect-[3/4] overflow-hidden bg-paper-raised">
              <Image
                src="/products/meander-fjord-main.jpg"
                alt="Meander Throw in Fjord — the LAMORA signature colourway"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div>
              <p className="text-eyebrow-brass mb-4">The name</p>
              <h2 className="text-display-md font-display text-ink mb-5">
                LAMORA
              </h2>
              <div className="w-10 h-px bg-brass mb-6" />
              <div className="space-y-4 font-sans text-sm text-muted leading-relaxed">
                <p>
                  {/* PLACEHOLDER: owner to provide the name origin story */}
                  [PLACEHOLDER — name origin to be provided by owner.]
                </p>
                <p>
                  The crest shows a llama and a mountain — the animal that
                  lives at altitude, where the air thins and the fibre is finest.
                  The mountain is both literal and symbolic: the high place from
                  which the material comes.
                </p>
              </div>
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
                almost no ornament beyond what is structural. The white of snow,
                the grey of stone, the long horizontal of the fjord.
              </p>
              <p>
                Arabic supplies the soul: precise geometry, a sense of
                ceremony, warmth expressed not in colour but in pattern. The
                meander is a Greek-key motif — but the Greek key is also found
                in Islamic geometric art, woven into tiles, carved into marble.
                The two traditions share more than they acknowledge.
              </p>
              <p>
                LAMORA sits at that meeting point. The palette is Nordic —
                cream, navy, the muted blue of water. The patterning is
                geometric, carried from one civilisation&apos;s tiles into another&apos;s
                cloth.
              </p>
              <p>
                {/* PLACEHOLDER: founder background / founding story to be provided by owner */}
                [PLACEHOLDER — founder background and founding story to be provided.]
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <MeanderRule color="line" />

      {/* The mark */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <Reveal>
            <div>
              <p className="text-eyebrow-brass mb-4">The mark</p>
              <h2 className="text-display-md font-display text-ink mb-5">
                The crest
              </h2>
              <div className="w-10 h-px bg-brass mb-6" />
              <div className="space-y-4 font-sans text-sm text-muted leading-relaxed">
                <p>
                  The llama and the mountain. The animal lives above 3,000 metres,
                  where the cold is consistent and the undercoat grows dense.
                  The mountain frames the origin — not a specific peak, but the
                  idea of altitude, remoteness, purity.
                </p>
                <p>
                  The crest is used sparingly. It anchors the header; it does not
                  appear on the cloth itself. The throw speaks without it.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="relative aspect-square overflow-hidden bg-ink flex items-center justify-center">
              <Image
                src="/brand/lamora-logo.png"
                alt="LAMORA crest — llama and mountain mark"
                width={240}
                height={240}
                className="object-contain brightness-200 contrast-50 p-8"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
