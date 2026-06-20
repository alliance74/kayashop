import { Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { priceForQty } from "@/lib/api";
import { useEffect } from "react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, setQty, remove, subtotal, count } = useCart();

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-2xl overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background border-b border-line px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl uppercase tracking-tight">
                Your Bag {count > 0 && `(${count})`}
              </h2>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface transition-colors"
                aria-label="Close cart"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Cart Content */}
          <div className="flex-1 px-6 py-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <ShoppingBag className="h-16 w-16 text-terracotta/40" />
                <h3 className="mt-4 font-display text-2xl">Your bag is empty</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Start browsing our collection
                </p>
                <Link
                  to="/products"
                  onClick={onClose}
                  className="btn-primary mt-6"
                >
                  Browse catalog
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((i) => {
                  const unit = priceForQty(i.product, i.quantity);
                  return (
                    <div key={i.productId} className="rounded-xl bg-surface p-4">
                      <div className="flex gap-3">
                        {/* Product Image */}
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white">
                          {i.image ? (
                            <img
                              src={i.image}
                              alt={i.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="grid h-full w-full place-items-center font-display text-xl text-terracotta/40">
                              ◆
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-1 flex-col gap-2">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              to="/products/$id"
                              params={{ id: i.productId }}
                              onClick={onClose}
                              className="text-sm font-medium hover:underline line-clamp-2"
                            >
                              {i.name}
                            </Link>
                            <button
                              onClick={() => remove(i.productId)}
                              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full hover:bg-surface-alt transition-colors"
                              aria-label="Remove item"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="flex items-end justify-between">
                            <div className="text-sm font-bold">
                              ${(unit * i.quantity).toFixed(2)}
                            </div>
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() => setQty(i.productId, i.quantity - 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-line hover:bg-surface-alt transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-sm font-medium">
                                {i.quantity}
                              </span>
                              <button
                                onClick={() => setQty(i.productId, i.quantity + 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-line hover:bg-surface-alt transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer - Only show when there are items */}
          {items.length > 0 && (
            <div className="sticky bottom-0 border-t border-line bg-background px-6 py-4">
              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-lg">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-display text-2xl font-bold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-background font-medium transition-all hover:bg-foreground/90 hover:shadow-lg"
                >
                  <ShoppingBag className="h-5 w-5" />
                  GO TO CHECKOUT
                </Link>

                <p className="text-center text-xs text-muted-foreground">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
