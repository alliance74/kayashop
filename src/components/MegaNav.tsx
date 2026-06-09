import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Search, Menu, X, ChevronDown, Shirt, ShoppingBag, Users, Watch, Glasses } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";

const CATEGORIES = [
  { name: "Shoes", icon: ShoppingBag },
  { name: "Tops", icon: Shirt },
  { name: "Pants", icon: Users },
  { name: "Accessories", icon: Glasses },
  { name: "Watches", icon: Watch },
  { name: "Casual Shirts", icon: Shirt },
];

export function MegaNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on navigation
  useEffect(() => { setMobileOpen(false); setProductsOpen(false); }, [path]);

  // Detect scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setProductsOpen(false), 150);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <header
      className={
        "sticky top-0 z-40 border-b transition-all duration-300 " +
        (scrolled
          ? "border-white/10 bg-foreground/50 backdrop-blur-xl shadow-lg"
          : "border-line/60 bg-background/85 backdrop-blur-xl")
      }
    >
      {/* main nav row — tightens on scroll */}
      <div className={"flex w-full items-center gap-6 px-6 transition-all duration-300 xl:px-10 " + (scrolled ? "h-14" : "h-20")}>
        <Logo />

        <nav className="mx-auto hidden items-center gap-1 lg:flex">
          <NavLink to="/" active={path === "/"} scrolled={scrolled}>Home</NavLink>
          <DropdownTrigger
            label="Products"
            open={productsOpen}
            active={path.startsWith("/products")}
            scrolled={scrolled}
            onMouseEnter={openProducts}
            onMouseLeave={scheduleClose}
          />
          <NavLink to="/contact" active={path.startsWith("/contact")} scrolled={scrolled}>Contact</NavLink>
          <NavLink to="/about" active={path.startsWith("/about")} scrolled={scrolled}>About</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/products" className={"hidden h-10 w-10 items-center justify-center rounded-full border hover:bg-white/10 md:flex " + (scrolled ? "border-white/20 text-white/80" : "border-line")} aria-label="Search">
            <Search className="h-4 w-4" />
          </Link>
          <ThemeSwitcher />
          <button onClick={() => setMobileOpen((v) => !v)} className={"flex h-10 w-10 items-center justify-center rounded-full border lg:hidden " + (scrolled ? "border-white/20 text-white" : "border-line")} aria-label="Menu">
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* products dropdown panel */}
      {productsOpen && (
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className="absolute inset-x-0 z-40 border-b border-line bg-background shadow-warm animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="w-full px-6 py-6 xl:px-10">
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {CATEGORIES.map(({ name, icon: Icon }) => (
                <Link
                  key={name}
                  to="/products"
                  search={{ category: name }}
                  className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-surface"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-peach-soft/70 text-terracotta transition-colors group-hover:bg-terracotta group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="text-sm font-medium text-ink">{name}</div>
                </Link>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <span className="text-sm text-muted-foreground">6 categories · curated collections for every style.</span>
              <Link to="/products" className="btn-primary text-sm">View all products →</Link>
            </div>
          </div>
        </div>
      )}

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-line bg-surface lg:hidden">
          <div className="w-full space-y-1 px-6 py-4 xl:px-10">
            <MobileLink to="/">Home</MobileLink>
            <MobileLink to="/products">All Products</MobileLink>
            <div className="ml-3 mt-1 space-y-1">
              {CATEGORIES.map(({ name }) => (
                <Link
                  key={name}
                  to="/products"
                  search={{ category: name }}
                  className="block rounded-md px-2 py-1.5 text-[13px] text-muted-foreground hover:bg-surface-alt"
                >
                  {name}
                </Link>
              ))}
            </div>
            <MobileLink to="/contact">Contact</MobileLink>
            <MobileLink to="/about">About</MobileLink>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, active, scrolled, children }: { to: string; active: boolean; scrolled: boolean; children: React.ReactNode }) {
  const base = "relative px-3 py-2 text-sm transition-colors ";
  const color = scrolled
    ? (active ? "text-white font-medium" : "text-white/70 hover:text-white")
    : (active ? "text-ink font-medium" : "text-ink-soft hover:text-ink");
  return (
    <Link to={to} className={base + color}>
      {children}
      {active && (
        <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-terracotta" />
      )}
    </Link>
  );
}

function DropdownTrigger({ 
  label, 
  open, 
  active,
  scrolled, 
  onMouseEnter, 
  onMouseLeave 
}: {
  label: string;
  open: boolean;
  active: boolean;
  scrolled: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const base = "relative flex items-center gap-1 px-3 py-2 text-sm transition-colors ";
  const color = scrolled
    ? (open || active ? "text-white font-medium" : "text-white/70 hover:text-white")
    : (open || active ? "text-ink font-medium" : "text-ink-soft hover:text-ink");
  return (
    <button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={base + color}>
      {label}
      <ChevronDown className={"h-3.5 w-3.5 transition-transform duration-200 " + (open ? "rotate-180" : "")} />
      {(open || active) && <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-terracotta" />}
    </button>
  );
}

function MobileLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="block rounded-lg px-2 py-2 text-sm font-medium hover:bg-surface-alt">
      {children}
    </Link>
  );
}
