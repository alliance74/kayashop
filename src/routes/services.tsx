import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck,
  Hammer,
  Palette,
  ClipboardList,
  Wrench,
  ArrowUpRight,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Aperion" },
      {
        name: "description",
        content:
          "Aperion offers personal styling, expert alterations, virtual try-on, wardrobe building and VIP access — premium service for discerning clients.",
      },
      { property: "og:title", content: "Services — Aperion" },
      {
        property: "og:description",
        content:
          "Personal styling, alterations, virtual try-on and VIP access — experience fashion with expert guidance.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Truck,
    id: "styling",
    label: "01",
    title: "Personal Styling",
    tagline: "One-on-one consultation with our experts.",
    body: "Work directly with our styling team to build a wardrobe that matches your lifestyle, body type and personal aesthetic. We help you discover your style and curate pieces that work together.",
    features: [
      "60-minute private styling session",
      "Body type and color analysis",
      "Curated product recommendations",
      "Seasonal wardrobe planning",
      "Ongoing style support via email",
    ],
    cta: "Book a session",
    ctaTo: "/quote",
  },
  {
    icon: Hammer,
    id: "alterations",
    label: "02",
    title: "Expert Alterations",
    tagline: "Perfect fit, guaranteed.",
    body: "Our in-house tailors ensure every piece fits perfectly. From hemming pants to adjusting jacket shoulders — we handle all alterations with precision and care.",
    features: [
      "Professional tailoring services",
      "Hem adjustments for pants and jeans",
      "Jacket and blazer fitting",
      "Shirt sleeve shortening",
      "Free alterations on select items",
    ],
    cta: "Learn more",
    ctaTo: "/contact",
  },
  {
    icon: Palette,
    id: "virtual-tryon",
    label: "03",
    title: "Virtual Try-On",
    tagline: "See how pieces look before you buy.",
    body: "Upload your measurements and photos to see how items will fit and look on your body type. Our AI-powered system helps you make confident purchasing decisions.",
    features: [
      "AI-powered fit visualization",
      "Body measurement guide",
      "Mix and match outfits digitally",
      "Save favorite combinations",
      "Share looks for feedback",
    ],
    cta: "Try it now",
    ctaTo: "/products",
  },
  {
    icon: ClipboardList,
    id: "wardrobe-building",
    label: "04",
    title: "Wardrobe Building",
    tagline: "Complete capsule collections.",
    body: "Let us build a complete wardrobe from scratch. We'll select versatile pieces that work together across seasons, creating maximum outfit combinations with minimum items.",
    features: [
      "Lifestyle and needs assessment",
      "Capsule wardrobe planning",
      "Mix-and-match coordination",
      "Investment piece recommendations",
      "Seasonal updates and additions",
    ],
    cta: "Start building",
    ctaTo: "/quote",
  },
  {
    icon: Wrench,
    id: "vip-access",
    label: "05",
    title: "VIP Access",
    tagline: "First to know, first to shop.",
    body: "Join our VIP program for early access to new collections, exclusive pieces, private sales and invitation-only events. Experience fashion on your terms.",
    features: [
      "Early access to new arrivals",
      "Exclusive limited edition pieces",
      "Private sale invitations",
      "Priority styling appointments",
      "Complimentary alterations",
    ],
    cta: "Join VIP",
    ctaTo: "/contact",
  },
];

const process = [
  { n: "01", title: "Tell us about your project", body: "Fill in the quote form — room count, location, timeline and the categories you need. Takes under 5 minutes." },
  { n: "02", title: "We send a tailored proposal", body: "Within 48 hours a member of the Aperion team responds with a full scope, product selection and indicative budget." },
  { n: "03", title: "Approve and we get to work", body: "Once you approve, we lock in production and logistics slots. A project manager tracks everything to handover." },
];

function ServicesPage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="container-page pb-10 pt-14">
        <div className="max-w-4xl">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            What we do
          </div>
          <h1 className="mt-3 font-display text-6xl leading-[0.95] md:text-7xl lg:text-8xl">
            One partner.{" "}
            <span className="italic text-terracotta">Every service.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            From sourcing a single linen order to managing a full 200-room hotel
            fit-out — Aperion handles supply, installation, design and maintenance
            so you have one contract, one contact, one timeline.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/quote" className="btn-primary inline-flex items-center gap-2">
              Start a project <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-ghost">Talk to sales</Link>
          </div>
        </div>
      </section>

      {/* ── Service cards ─────────────────────────── */}
      <section className="container-page py-16">
        <div className="space-y-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            const isEven = idx % 2 === 1;
            return (
              <div
                key={s.id}
                id={s.id}
                className="surface-card grid gap-8 overflow-hidden p-8 md:grid-cols-12 md:p-12"
              >
                {/* number + icon side */}
                <div className={`md:col-span-4 ${isEven ? "md:order-2" : ""}`}>
                  <div className="flex items-start gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-peach-soft/70 text-terracotta">
                      <Icon className="h-7 w-7" />
                    </span>
                    <div>
                      <div className="font-display text-5xl text-terracotta/30">
                        {s.label}
                      </div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        {s.tagline}
                      </div>
                    </div>
                  </div>
                </div>

                {/* content side */}
                <div className={`md:col-span-8 ${isEven ? "md:order-1" : ""}`}>
                  <h2 className="font-display text-4xl md:text-5xl">{s.title}</h2>
                  <p className="mt-4 max-w-xl text-muted-foreground">{s.body}</p>

                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={s.ctaTo}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:underline"
                  >
                    {s.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Process ───────────────────────────────── */}
      <section className="container-page py-16">
        <div className="surface-card p-10 md:p-14"
          style={{ backgroundImage: "linear-gradient(135deg, var(--peach-soft) 0%, var(--surface) 60%)" }}
        >
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            How it works
          </div>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">
            Three steps from brief to handover
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {process.map((p) => (
              <div key={p.n}>
                <div className="font-display text-5xl text-terracotta">{p.n}</div>
                <div className="mt-3 font-display text-2xl">{p.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="container-page pb-24">
        <div className="surface-card flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <h3 className="font-display text-3xl md:text-4xl">
              Ready to start your project?
            </h3>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Send us your room count, location and timeline. We'll respond
              within 48 hours with a full proposal.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/quote" className="btn-primary inline-flex items-center gap-2">
              Request a quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-ghost">Talk to us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
