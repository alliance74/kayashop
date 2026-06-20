import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Aperion" }] }),
  component: CartPage,
});

function CartPage() {
  // Redirect to products page since cart is now a sidebar
  return <Navigate to="/products" />;
}

