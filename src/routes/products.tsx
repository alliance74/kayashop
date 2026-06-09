import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search, ArrowRight, X } from "lucide-react";
import { categories, seedProducts } from "@/data/catalog";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "All Products — Atelier" },
      { name: "description", content: "Explore our curated collection of premium menswear — shoes, tops, pants, accessories, watches and more." },
      { property: "og:title", content: "All Products — Atelier" },
      { property: "og:description", content: "Curated premium menswear from the world's finest brands." },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { category?: string } => {
    return {
      category: typeof search.category === 'string' ? search.category : undefined,
    };
  },
  component: Catalog,
});

const PRODUCT_CATEGORIES = [
  "Shoes",
  "Tops", 
  "Pants",
  "Accessories",
  "Watches",
  "Casual Shirts"
];

function Catalog() {
  const { category: urlCategory } = Route.useSearch();
  const [q, setQ] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sync URL category to local state
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory]);

  const filteredCats = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return categories;
    return categories.filter((c) =>
      c.name.toLowerCase().includes(needle) ||
      c.short.toLowerCase().includes(needle) ||
      c.subcategories.some((s) => s.toLowerCase().includes(needle)),
    );
  }, [q]);

  const displayProducts = useMemo(() => {
    let products = seedProducts;
    
    // Filter by selected category
    if (selectedCategory) {
      const categorySlug = selectedCategory.toLowerCase().replace(/\s+/g, '-');
      products = products.filter((p) => p.category === categorySlug);
    }
    
    // Filter by search query
    const needle = q.trim().toLowerCase();
    if (needle) {
      products = products.filter((p) => 
        p.name.toLowerCase().includes(needle) || 
        p.description.toLowerCase().includes(needle)
      );
    }
    
    return products;
  }, [selectedCategory, q]);

  return (
    <div className="w-full px-6 py-16 xl:px-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Collection</div>
          <h1 className="mt-2 font-display text-5xl md:text-6xl">Curated menswear</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Browse our premium collection by category or search for specific items.
          </p>
        </div>
        <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-line bg-surface px-4 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search shoes, shirts, denim…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mt-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
              (selectedCategory === null
                ? "border-terracotta bg-terracotta text-white"
                : "border-line hover:border-terracotta hover:text-terracotta")
            }
          >
            All Categories
          </button>
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
                (selectedCategory === cat
                  ? "border-terracotta bg-terracotta text-white"
                  : "border-line hover:border-terracotta hover:text-terracotta")
              }
            >
              {cat}
            </button>
          ))}
        </div>
        {selectedCategory && (
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Showing: {selectedCategory}</span>
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-1 text-terracotta hover:underline"
            >
              <X className="h-3 w-3" /> Clear filter
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {displayProducts.length > 0 ? (
        <div className="mt-10">
          <h2 className="font-display text-2xl">
            {selectedCategory ? `${selectedCategory} Collection` : q ? "Search Results" : "All Products"}
          </h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {displayProducts.map((p) => (
              <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="surface-card group overflow-hidden transition-transform hover:-translate-y-1">
                <div className="relative aspect-[4/5] overflow-hidden bg-peach-soft/60">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-foreground/85 px-3 py-1 text-[11px] uppercase tracking-wider text-background">
                    {p.category}
                  </span>
                </div>
                <div className="p-4">
                  <div className="font-display text-base">{p.name}</div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 text-center">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}

      {/* Category Collections (only show when not filtering) */}
      {!selectedCategory && !q && (
        <div className="mt-16">
          <h2 className="font-display text-2xl">Browse by Category</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCats.map((c) => (
              <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="surface-card group overflow-hidden transition-transform hover:-translate-y-1">
                <div className="relative aspect-[5/3] overflow-hidden bg-peach-soft/60">
                  <img src={c.cover} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-background">
                    <div className="text-[11px] uppercase tracking-[0.18em] opacity-85">{c.short}</div>
                    <div className="font-display text-2xl">{c.name}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-5">
                  <p className="line-clamp-2 max-w-sm text-sm text-muted-foreground">{c.blurb}</p>
                  <ArrowRight className="h-4 w-4 text-terracotta" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Category Info Section */}
      <div className="mt-20 surface-card p-10">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl">Premium menswear categories</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {PRODUCT_CATEGORIES.map((cat) => (
              <div key={cat} className="border-l-2 border-terracotta pl-4">
                <h3 className="font-display text-lg">{cat}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cat === "Shoes" && "From Italian leather sneakers to luxury loafers"}
                  {cat === "Tops" && "Premium polos, linen shirts, and quarter-zips"}
                  {cat === "Pants" && "Fine linen trousers and selvedge denim"}
                  {cat === "Accessories" && "Luxury leather goods and eyewear"}
                  {cat === "Watches" && "Timepieces from Rolex and Cartier"}
                  {cat === "Casual Shirts" && "Relaxed button-downs and casual styles"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

