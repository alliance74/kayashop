import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Truck, ShieldCheck, Hammer, Headset, Award, Globe2 } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CategoryMarquee } from "@/components/CategoryMarquee";
import { featuredCategories, industries, projects, seedProducts } from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier — Curated menswear for refined taste" },
      { name: "description", content: "Atelier offers premium menswear — Italian leather sneakers, luxury watches, fine linens and tailored pieces. Curated for style and quality." },
      { property: "og:title", content: "Atelier — Curated menswear for refined taste" },
      { property: "og:description", content: "Premium menswear, timeless design, understated luxury — every piece chosen for quality and craft." },
    ],
  }),
  component: Home,
});

function Home() {
  const products = seedProducts.slice(0, 8);

  return (
    <div>
      <HeroCarousel />

      {/* trust strip */}
      <section className="w-full px-6 xl:px-10 pb-10">
        <div className="surface-card grid grid-cols-2 gap-2 p-4 md:grid-cols-4 md:p-6">
          {[
            { icon: Truck, label: "Worldwide shipping", note: "Fast & insured delivery" },
            { icon: ShieldCheck, label: "100% Authentic", note: "Verified luxury items" },
            { icon: Hammer, label: "Tailoring service", note: "Perfect fit guaranteed" },
            { icon: Headset, label: "Style consultation", note: "Expert fashion advice" },
          ].map(({ icon: Icon, label, note }) => (
            <div key={label} className="flex items-center gap-3 p-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-peach-soft/70 text-terracotta">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-medium">{label}</div>
                <div className="text-xs text-muted-foreground">{note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES — auto-scrolling marquees */}
      <section className="py-10">
        <div className="w-full px-6 xl:px-10 mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Shop by category</div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Premium menswear essentials</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              From Italian leather footwear to Swiss timepieces — everything a modern wardrobe needs.
            </p>
          </div>
          <Link to="/products" className="hidden text-sm text-terracotta hover:underline md:inline">
            All products →
          </Link>
        </div>
        <div className="space-y-5">
          <CategoryMarquee />
          <CategoryMarquee reverse />
        </div>
      </section>

      {/* Featured categories grid */}
      <section className="w-full px-6 xl:px-10 py-16">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Featured collections</div>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Start with the essentials</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCategories.slice(0, 5).map((c, i) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className={"surface-card group relative overflow-hidden " + (i === 0 ? "lg:row-span-2 lg:col-span-1" : "")}
            >
              <div className={"relative overflow-hidden " + (i === 0 ? "aspect-[3/4] lg:aspect-auto lg:h-full" : "aspect-[5/4]")}>
                <img src={c.cover} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-100">{c.short}</div>
                  <div className="mt-1 font-display text-3xl">{c.name}</div>
                  <p className="mt-2 max-w-md text-sm opacity-85">{c.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-background">
                    Explore <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTS FEATURED */}
      <section className="w-full px-6 xl:px-10 py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Featured items</div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">This season's picks</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Handpicked essentials from the world's finest brands — Italian craftsmanship meets modern style.
            </p>
          </div>
          <Link to="/products" className="text-sm text-terracotta hover:underline">View all →</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="surface-card group overflow-hidden transition-transform hover:-translate-y-1">
              <div className="relative aspect-[4/5] overflow-hidden bg-peach-soft/60">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-foreground/85 px-3 py-1 text-[11px] uppercase tracking-wider text-background">
                  {p.category}
                </span>
              </div>
              <div className="space-y-1 p-5">
                <h3 className="font-display text-lg leading-tight">{p.name}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="w-full px-6 xl:px-10 py-16">
        <div className="surface-card grid gap-10 p-10 md:grid-cols-12 md:p-14">
          <div className="md:col-span-5">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Style philosophy</div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Dress for how you live</h2>
            <p className="mt-4 text-muted-foreground">
              From streetwear to formal occasions — Atelier curates pieces that adapt to your lifestyle,
              not the other way around.
            </p>
            <Link to="/industries" className="mt-6 inline-flex btn-primary text-sm">Explore styles →</Link>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {industries.map((i) => (
                <div key={i.name} className="rounded-2xl border border-line bg-background/60 p-4">
                  <div className="font-display text-lg">{i.name}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{i.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="w-full px-6 xl:px-10 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Seasonal lookbooks</div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Curated collections</h2>
          </div>
          <Link to="/projects" className="text-sm text-terracotta hover:underline">All lookbooks →</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <div key={p.title} className="surface-card group overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{p.location}</div>
                <div className="mt-1 font-display text-lg leading-snug">{p.title}</div>
                <p className="mt-1 text-xs text-muted-foreground">{p.scope}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="w-full px-6 xl:px-10 py-16">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Featured brands</div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">The finest houses</h2>
          <p className="mt-3 text-muted-foreground">Curated from the world's most prestigious luxury brands</p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {["Margiela","Golden Goose","Loro Piana","Cartier","Rolex","Cucinelli"].map((b) => (
            <div key={b} className="surface-card grid h-20 place-items-center font-display text-xl text-ink-soft transition-colors hover:text-terracotta">
              {b}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-6 xl:px-10 pb-24">
        <div className="surface-card flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between md:p-14"
          style={{ backgroundImage: "linear-gradient(135deg, var(--peach-soft) 0%, var(--surface) 100%)" }}
        >
          <div className="flex items-start gap-5">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-foreground text-background">
              <Globe2 className="h-6 w-6" />
            </span>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Personal styling service</div>
              <h3 className="mt-2 font-display text-3xl md:text-4xl">Build your perfect wardrobe</h3>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Work with our expert stylists to curate a collection tailored to your lifestyle, from Italian leather to Swiss timepieces.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/quote" className="btn-primary inline-flex items-center gap-2">Book consultation <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/contact" className="btn-ghost">Contact us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

