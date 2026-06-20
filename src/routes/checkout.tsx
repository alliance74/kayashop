import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { CreditCard, Upload, Check } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Aperion" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  // Contact & Shipping Info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // Payment
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-4xl">Your cart is empty</h1>
        <Link to="/products" className="btn-primary mt-6 inline-block">Browse collection</Link>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        toast.error("Only PNG, JPG files are allowed");
        return;
      }
      setPaymentScreenshot(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !phone || !address || !city || !postalCode || !country) {
      toast.error("Please fill in all required shipping information");
      return;
    }
    
    if (!paymentScreenshot) {
      toast.error("Please upload payment confirmation screenshot");
      return;
    }

    setSubmitting(true);
    
    // Simulate order submission (works for both authenticated and guest users)
    setTimeout(() => {
      toast.success("Order placed successfully! We'll confirm once payment is verified.");
      clear();
      // Navigate to products page for guests, orders page for logged-in users
      if (user) {
        navigate({ to: "/account/orders" });
      } else {
        toast.info("Check your email for order confirmation and tracking details.");
        navigate({ to: "/products" });
      }
    }, 1500);
  };

  const calculateTotal = () => {
    return subtotal; // In real app, add shipping, tax, etc.
  };

  const orderId = `APR-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-7xl px-6">
        <h1 className="font-display text-5xl md:text-6xl">Checkout</h1>
        
        {/* Guest Checkout Notice */}
        {!user && (
          <div className="mt-6 rounded-2xl bg-peach-soft/40 border border-terracotta/20 p-4">
            <p className="text-sm">
              <span className="font-semibold">Checking out as a guest.</span> You can create an account after your order is placed.{" "}
              <Link to="/auth" search={{ redirect: "/checkout" }} className="text-terracotta hover:underline">
                Already have an account? Sign in
              </Link>
            </p>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left Column - Shipping & Payment Info */}
          <div className="space-y-8">
            {/* Contact & Shipping Information */}
            <div className="rounded-2xl border-2 border-line bg-surface p-8">
              <h2 className="font-display text-2xl">Contact & Shipping Information</h2>
              
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Full Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="field h-12 w-full px-4"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="field h-12 w-full px-4"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium">Phone Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="field h-12 w-full px-4"
                  required
                />
              </div>

              <div className="mt-6 border-t border-line pt-6">
                <h3 className="font-display text-lg">Shipping Address</h3>
                
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium">Street Address *</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main Street, Apt 4B"
                    className="field h-12 w-full px-4"
                    required
                  />
                </div>
                
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium">City *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="New York"
                      className="field h-12 w-full px-4"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Postal Code *</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="10001"
                      className="field h-12 w-full px-4"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Country *</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="United States"
                      className="field h-12 w-full px-4"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Transfer Information */}
            <div className="rounded-2xl border-2 border-line overflow-hidden" style={{ background: "linear-gradient(135deg, #1a2332 0%, #0f1419 100%)" }}>
              <div className="p-8">
                <div className="flex items-center gap-3 text-white">
                  <CreditCard className="h-6 w-6 text-green-400" />
                  <h2 className="font-display text-2xl">Bank Transfer Payment</h2>
                </div>

                <div className="mt-6 space-y-4 text-white/90">
                  <div>
                    <div className="text-sm text-white/60">Bank</div>
                    <div className="mt-1 text-lg font-medium">Bank of Georgia (BOG)</div>
                  </div>

                  <div>
                    <div className="text-sm text-white/60">Account Number (IBAN)</div>
                    <div className="mt-1 font-mono text-xl tracking-wider">GE84 BG00 0000 0611 5846 86</div>
                  </div>

                  <div>
                    <div className="text-sm text-white/60">Bank Code</div>
                    <div className="mt-1 text-lg font-medium">BAGAGE22</div>
                  </div>

                  <div className="mt-4 rounded-lg bg-white/10 p-4">
                    <p className="text-sm text-white/80">
                      Use your order reference <span className="font-mono font-semibold text-green-400">{orderId}</span> as payment description.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Payment Screenshot */}
            <div className="rounded-2xl border-2 border-line bg-surface p-8">
              <div className="flex items-center gap-3">
                <Upload className="h-6 w-6 text-green-600" />
                <h2 className="font-display text-2xl">Upload Payment Screenshot</h2>
              </div>
              
              <div className="mt-6">
                <label 
                  htmlFor="payment-upload"
                  className="relative block cursor-pointer rounded-2xl border-2 border-dashed border-line bg-background p-12 text-center transition-colors hover:border-terracotta hover:bg-peach-soft/20"
                >
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img src={previewUrl} alt="Payment screenshot" className="mx-auto max-h-64 rounded-lg shadow-lg" />
                      <div className="flex items-center justify-center gap-2 text-sm font-medium text-green-600">
                        <Check className="h-5 w-5" />
                        Screenshot uploaded
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setPaymentScreenshot(null);
                          setPreviewUrl(null);
                        }}
                        className="text-sm text-terracotta hover:underline"
                      >
                        Change file
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4 text-sm font-medium">Click to upload payment receipt</div>
                      <div className="mt-2 text-xs text-muted-foreground">PNG, JPG up to 10MB</div>
                    </>
                  )}
                  <input
                    id="payment-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-foreground text-background font-medium transition-all hover:bg-foreground/90 hover:shadow-lg disabled:opacity-50"
              >
                {submitting ? "Processing..." : `Place Order — €${calculateTotal().toFixed(2)}`}
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <aside className="h-fit rounded-2xl border-2 border-line bg-surface p-6 sticky top-6">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Order Summary</div>
            
            <ul className="mt-4 space-y-3 text-sm">
              {items.map((i) => (
                <li key={i.productId} className="flex items-start gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white">
                    {i.image ? (
                      <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full w-full place-items-center font-display text-lg text-terracotta/40">◆</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium line-clamp-2">{i.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">Qty: {i.quantity}</div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="my-4 border-t border-line" />
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>
            
            <div className="my-4 border-t border-line" />
            
            <div className="flex items-baseline justify-between">
              <span className="text-sm uppercase tracking-wider text-muted-foreground">Total</span>
              <span className="font-display text-3xl">€{calculateTotal().toFixed(2)}</span>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
