"use client";

import MeanderRule from "@/components/MeanderRule";
import Reveal from "@/components/Reveal";
import { useState } from "react";

// Note: metadata must be in a server component; this is a client component due to form state.
// If you need metadata here, split into a server wrapper + client form component.

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to contact endpoint / email service
    setSubmitted(true);
  }

  return (
    <div className="bg-paper">
      {/* Hero */}
      <div className="bg-ink pt-32 pb-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-eyebrow text-paper/40 mb-3">Get in touch</p>
          <h1 className="text-display-lg font-display text-paper font-light">
            Contact
          </h1>
        </div>
      </div>
      <MeanderRule color="brass" />

      <div className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Info */}
          <Reveal>
            <div>
              <p className="text-eyebrow-brass mb-4">Direct</p>
              <h2 className="font-display text-2xl text-ink font-light mb-5">
                We reply within one business day.
              </h2>
              <div className="w-10 h-px bg-brass mb-8" />
              <div className="space-y-5 font-sans text-sm text-muted">
                <div>
                  <p className="text-eyebrow mb-1">Email</p>
                  <a
                    href="mailto:ir@lamora.com"
                    className="text-ink font-sans text-sm"
                    style={{ textDecoration: "none", borderBottom: "1px solid #D8CCB8" }}
                  >
                    ir@lamora.com
                  </a>
                </div>
                <div>
                  <p className="text-eyebrow mb-1">Address</p>
                  <p className="text-ink font-sans text-sm">
                    Marchmont Road<br />Edinburgh, Scotland
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={200}>
            {submitted ? (
              <div className="py-10">
                <p className="font-display text-2xl text-ink font-light mb-3">
                  Message received.
                </p>
                <p className="font-sans text-sm text-muted">
                  We&apos;ll be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
                <FormField label="Name" id="name" type="text" required />
                <FormField label="Email" id="email" type="email" required />
                <FormField label="Subject" id="subject" type="text" />
                <div>
                  <label htmlFor="message" className="text-eyebrow block mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-transparent border border-line px-4 py-3 text-sm font-sans text-ink placeholder-muted/50 focus-visible:outline-none focus-visible:border-brass transition-colors duration-200 resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-ink text-paper font-sans text-xs tracking-widest uppercase py-4 hover:bg-ink-soft transition-colors duration-200"
                >
                  Send message
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  id,
  type,
  required,
}: {
  label: string;
  id: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-eyebrow block mb-2">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full bg-transparent border border-line px-4 py-3 text-sm font-sans text-ink placeholder-muted/50 focus-visible:outline-none focus-visible:border-brass transition-colors duration-200"
      />
    </div>
  );
}
