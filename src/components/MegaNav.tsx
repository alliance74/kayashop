import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Search, Menu, X, ChevronDown, ShoppingBag } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useCart } from "@/lib/cart";

// Import carousel images for dropdown
import shoesImg from "../../coursel/shoes.png";
import clothesImg from "../../coursel/clothes.png";
import pantsImg from "../../coursel/pants.jpg";
import watchImg from "../../coursel/watch.jpg";

const CATEGORIES = [
  "Shoes",
  "Tops", 
  "Pants",
  "Accessories",
  "Watches",
  "Casual Shirts"
];

const ANNOUNCEMENTS = [
  "Student Discount: Get 15% off your entire order with a valid student ID",
  "Free Worldwide Shipping on all orders over $200 with full tracking",
  "New Summer 2026 Collection is now live - Shop the latest arrivals",
  "Premium Quality Guaranteed: Italian craftsmanship meets modern design",
  "Flash Sale: Save up to 30% off on selected premium fashion items",
  "VIP Members get early access to new arrivals and exclusive collections",
];

export function MegaNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { count, openCart } = useCart();

  // Close on navigation
  useEffect(() => { setMobileOpen(false); setProductsOpen(false); }, [path]);

  // Detect scroll - hide announcement bar immediately on any scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Rotate announcements every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(interval);
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
    <>
      {/* Announcement Bar - positioned above sticky navbar, slides up when scrolling */}
      <div
        className={
          "fixed left-0 right-0 top-0 z-30 transition-transform duration-300 ease-in-out " +
          (scrolled ? "-translate-y-full" : "translate-y-0")
        }
        style={{
          background: "linear-gradient(135deg, var(--terracotta) 0%, var(--terracotta-deep) 100%)"
        }}
      >
        <div className="relative h-10 flex items-center justify-center px-4 text-center text-background">
          {ANNOUNCEMENTS.map((announcement, index) => (
            <p
              key={index}
              className={
                "absolute inset-0 flex items-center justify-center text-sm font-medium tracking-wide transition-all duration-700 " +
                (index === currentAnnouncementIndex
                  ? "opacity-100 translate-y-0"
                  : index < currentAnnouncementIndex
                  ? "opacity-0 -translate-y-full"
                  : "opacity-0 translate-y-full")
              }
            >
              {announcement}
            </p>
          ))}
        </div>
      </div>

      {/* Main Navigation - always sticky */}
      <header
        className={
          "sticky z-40 border-b border-line/60 bg-white backdrop-blur-xl shadow-sm transition-[top] duration-300 ease-in-out " +
          (scrolled ? "top-0" : "top-10")
        }
      >
        <div className="flex w-full items-center gap-6 px-6 h-20 xl:px-10">
          {/* Left Nav */}
          <nav className="hidden items-center gap-1 lg:flex flex-1">
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

          {/* Center Logo */}
          <Logo />

          {/* Right Actions */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <Link to="/products" className="hidden h-10 w-10 items-center justify-center rounded-full border border-line hover:bg-surface md:flex" aria-label="Search">
              <Search className="h-4 w-4" />
            </Link>
            <ThemeSwitcher />
            <button 
              onClick={openCart}
              className="relative flex h-10 items-center gap-2 rounded-full border border-line px-4 hover:bg-surface transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Cart</span>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1.5 text-[11px] font-semibold text-white">
                  {count}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen((v) => !v)} className="flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden" aria-label="Menu">
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* products dropdown panel */}
        {productsOpen && (
          <div
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="fixed left-0 top-[80px] z-40 h-[calc(100vh-80px)] border-r border-line bg-background shadow-warm animate-in fade-in slide-in-from-left-2 duration-150 overflow-y-auto"
            style={{ width: "280px" }}
          >
            <div className="flex flex-col h-full">
              {/* Category Links */}
              <div className="py-6">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category}
                    to="/products"
                    search={{ category }}
                    className="block px-6 py-3 text-base text-ink hover:bg-surface hover:text-terracotta transition-colors font-medium"
                  >
                    {category}
                  </Link>
                ))}
                <div className="mt-2 border-t border-line pt-2">
                  <Link 
                    to="/products" 
                    className="block px-6 py-3 text-base font-medium text-terracotta hover:bg-surface transition-colors"
                  >
                    View all products →
                  </Link>
                </div>
              </div>

              {/* Product Images Grid */}
              <div className="mt-auto border-t border-line p-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-square overflow-hidden rounded-lg bg-surface">
                    <img 
                      src={shoesImg} 
                      alt="Shoes" 
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg bg-surface">
                    <img 
                      src={clothesImg} 
                      alt="Clothes" 
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg bg-surface">
                    <img 
                      src={pantsImg} 
                      alt="Pants" 
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg bg-surface">
                    <img 
                      src={watchImg} 
                      alt="Watch" 
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* mobile drawer */}
        {mobileOpen && (
          <div className="border-t border-line bg-surface lg:hidden">
            <div className="w-full space-y-1 px-6 py-4 xl:px-10">
              <MobileLink to="/products">All Products</MobileLink>
              <div className="ml-3 mt-1 space-y-1">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category}
                    to="/products"
                    search={{ category }}
                    className="block rounded-md px-2 py-1.5 text-[13px] text-muted-foreground hover:bg-surface-alt"
                  >
                    {category}
                  </Link>
                ))}
              </div>
              <MobileLink to="/contact">Contact</MobileLink>
              <MobileLink to="/about">About</MobileLink>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function NavLink({ to, active, scrolled, children }: { to: string; active: boolean; scrolled: boolean; children: React.ReactNode }) {
  const base = "relative px-3 py-2 text-sm transition-colors ";
  const color = active ? "text-ink font-medium" : "text-ink-soft hover:text-ink";
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
  const color = (open || active) ? "text-ink font-medium" : "text-ink-soft hover:text-ink";
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
