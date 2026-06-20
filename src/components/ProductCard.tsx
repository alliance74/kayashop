import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/api";
import { toast } from "sonner";

const SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { add } = useCart();

  // For demo, we'll use the same image. In real app, you'd have product.images array
  const mainImage = product.image || "/placeholder.png";
  const hoverImage = product.image || "/placeholder.png"; // Would be product.images[1] in real app

  const handleAddToCart = (size: string) => {
    setSelectedSize(size);
    add(product, 1);
    toast.success(`Added ${product.name} (${size}) to cart`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-surface">
        {/* Main Image */}
        <img
          src={mainImage}
          alt={product.name}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
        
        {/* Hover Image */}
        <img
          src={hoverImage}
          alt={`${product.name} - alternate view`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        
        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow-md transition-all hover:scale-110"
          aria-label="Add to favorites"
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${isFavorite ? "fill-terracotta text-terracotta" : "text-ink-soft"}`} 
          />
        </button>

        {/* Size Selection Overlay - Shows on Hover */}
        <div 
          className={`absolute inset-x-0 bottom-0 z-10 bg-white p-4 transition-transform duration-300 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-soft">
            Select Size
          </div>
          <div className="grid grid-cols-4 gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => handleAddToCart(size)}
                className={`flex h-12 items-center justify-center border text-sm font-medium transition-all hover:border-ink hover:bg-surface ${
                  selectedSize === size
                    ? "border-ink bg-foreground text-background"
                    : "border-line bg-white text-ink"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-3 space-y-1">
        <h3 className="font-display text-base leading-tight">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
      </div>
    </div>
  );
}
