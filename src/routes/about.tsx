import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Globe2, Handshake, Award, Truck, Wrench } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aperion" },
      { name: "description", content: "Aperion is a curated menswear brand celebrating quality, craft and timeless design. From Italian leather to Japanese denim — every piece tells a story." },
    ],
  }),
  component: About,
});

function About() {
  const values = [
    { icon: Building2, title: "Quality first", body: "Every piece is selected for craftsmanship, materials and construction — not trends that fade in a season. We curate brands that prioritize longevity over volume." },
    { icon: Globe2, title: "Global curation", body: "From Italian ateliers to Japanese denim mills — we source the world's finest menswear and bring it to your doorstep with worldwide shipping." },
    { icon: Handshake, title: "Personal service", body: "Work directly with our styling team for wardrobe consultations, fit guidance and personalized recommendations tailored to your lifestyle." },
    { icon: Award, title: "Authenticated pieces", body: "Every luxury item is verified for authenticity. We partner directly with authorized retailers and maintain strict quality standards." },
    { icon: Truck, title: "Reliable delivery", body: "Fast, tracked shipping worldwide with expert packaging to ensure your pieces arrive in perfect condition." },
    { icon: Wrench, title: "Expert alterations", body: "In-house tailoring services to ensure every piece fits perfectly — because great clothing should feel like it was made for you." },
  ];

  return (
    <div className="w-full px-6 py-20 xl:px-10">

      {/* Hero */}
      <div className="max-w-4xl">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">About Aperion</div>
        <h1 className="mt-3 font-display text-5xl leading-[1.05] md:text-7xl">
          Where quality meets<br />
          <span className="italic text-terracotta">timeless design.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Aperion is a curated menswear brand built on the belief that great clothing should be
          timeless, not trendy. We source premium pieces from the world's finest makers — Italian
          leather sneakers, Japanese selvedge denim, Swiss timepieces and refined accessories.
        </p>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          We work with discerning customers who value quality, craft and understated elegance —
          the kind of style that doesn't shout, but always speaks.
        </p>
      </div>

      {/* Stats strip */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { n: "100+", label: "Premium brands" },
          { n: "6", label: "Core categories" },
          { n: "Worldwide", label: "Shipping" },
          { n: "Expert", label: "Styling service" },
        ].map(({ n, label }) => (
          <div key={label} className="surface-card p-7 text-center">
            <div className="font-display text-5xl text-terracotta">{n}</div>
            <div className="mt-2 text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="mt-20">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">How we work</div>
        <h2 className="mt-2 font-display text-4xl md:text-5xl">From discovery to delivery</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", title: "Explore the collection", body: "Browse our curated selection of premium menswear — from Italian sneakers to Swiss watches, all chosen for quality and craft." },
            { n: "02", title: "Personal styling (optional)", body: "Book a consultation with our styling team to build a personalized wardrobe tailored to your taste and lifestyle." },
            { n: "03", title: "Expert alterations & delivery", body: "We handle alterations for the perfect fit and ship worldwide with tracking. Your pieces arrive ready to wear." },
          ].map((s) => (
            <div key={s.n} className="surface-card p-7">
              <div className="font-display text-5xl text-terracotta">{s.n}</div>
              <div className="mt-4 font-display text-2xl">{s.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mt-20">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">What sets us apart</div>
        <h2 className="mt-2 font-display text-4xl md:text-5xl">Built on quality</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, title, body }) => (
            <div key={title} className="surface-card p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-peach-soft/70 text-terracotta">
                <Icon className="h-5 w-5" />
              </span>
              <div className="mt-4 font-display text-xl">{title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Who we serve */}
      <div className="mt-20">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Who we dress</div>
        <h2 className="mt-2 font-display text-4xl md:text-5xl">Style for every occasion</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Our collection serves the modern professional — from weekend casual to boardroom formal,
          we curate pieces that work for how you actually live.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Professionals", desc: "Elevated everyday style for the office and beyond." },
            { name: "Creatives", desc: "Understated luxury with a contemporary edge." },
            { name: "Travelers", desc: "Versatile, packable pieces that move with you." },
            { name: "Collectors", desc: "Limited editions and investment pieces." },
          ].map(({ name, desc }) => (
            <div key={name} className="surface-card p-5">
              <div className="font-display text-lg">{name}</div>
              <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 surface-card flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between"
        style={{ backgroundImage: "linear-gradient(135deg, var(--peach-soft) 0%, var(--surface) 100%)" }}>
        <div>
          <h3 className="font-display text-3xl md:text-4xl">Ready to elevate your wardrobe?</h3>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Book a styling consultation or browse the collection — we're here to help you dress better.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/quote" className="btn-primary">Book consultation</Link>
          <Link to="/contact" className="btn-ghost">Get in touch</Link>
        </div>
      </div>

    </div>
  );
}
