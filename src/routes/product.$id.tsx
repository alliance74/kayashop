import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories, productBySlug } from "@/data/catalog";
import { ProductImageGallery } from "@/components/ProductImageGallery";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = productBySlug(params.id);
    return {
      meta: [
        { title: p ? `${p.name} — Aperion` : "Product — Aperion" },
        { name: "description", content: p?.description ?? "Premium menswear by Aperion." },
        { property: "og:title", content: p ? `${p.name} — Aperion` : "Product — Aperion" },
        { property: "og:description", content: p?.description ?? "Premium menswear by Aperion." },
        ...(p ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const product = productBySlug(params.id);
    if (!product) throw notFound();
    const category = categories.find((c) => c.slug === product.category);
    return { product, category };
  },
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-4xl">Product not found</h1>
      <Link to="/products" className="btn-primary mt-6 inline-flex">Browse collection</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product: p, category } = Route.useLoaderData();
  return (
    <div className="container-page py-10 px-6 md:px-8 lg:px-12">
      <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Link to="/products" className="hover:text-ink">Products</Link>
        <span>/</span>
        {category && (
          <>
            <Link to="/category/$slug" params={{ slug: category.slug }} className="hover:text-ink">{category.name}</Link>
            <span>/</span>
          </>
        )}
        <span className="text-ink-soft">{p.name}</span>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <ProductImageGallery images={p.images || [p.image]} productName={p.name} />
        
        <div>
          {category && (
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{category.name}</div>
          )}
          <h1 className="mt-2 font-display text-5xl leading-tight">{p.name}</h1>
          <p className="mt-4 text-base text-ink-soft">{p.description}</p>

          <div className="surface-card mt-6 p-5">
            <div className="font-display text-lg">Pricing</div>
            <p className="mt-1 text-sm text-muted-foreground">{p.pricingNote}</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {p.tiers.map((tier, i) => (
                <div key={tier} className="rounded-xl border border-line bg-background/60 p-3 text-center">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {i === 0 ? "Standard" : i === 1 ? "Volume" : "Bulk"}
                  </div>
                  <div className="mt-1 font-display text-sm text-ink">{tier}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Contact us for pricing — we'll provide a quote within 24 hours.</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/quote" className="btn-primary">Request pricing</Link>
            <Link to="/contact" className="btn-ghost">Contact us</Link>
          </div>

          <ul className="mt-8 space-y-2 text-sm text-ink-soft">
            <li>✓ 100% Authentic luxury items</li>
            <li>✓ Worldwide shipping with insurance</li>
            <li>✓ Expert tailoring available</li>
            <li>✓ Personal styling consultation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

