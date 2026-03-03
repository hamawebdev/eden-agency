"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { Product } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    clearCart();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    router.push("/checkout");
  };

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        {product.badge && (
          <span className="bg-primary absolute top-3 left-3 z-10 rounded-full px-2 py-1 text-xs font-medium text-white">
            {product.badge}
          </span>
        )}
        <button className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100">
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
        <Link href={`/products/${product.id}`}>
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="hover:text-primary mb-2 line-clamp-2 font-semibold text-gray-900 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">{product.price} DA</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice} DA
              </span>
            )}
          </div>
        </div>

        <Button onClick={handleAddToCart} className="w-full" size="sm">
          Buy
        </Button>
      </div>
    </div>
  );
}
