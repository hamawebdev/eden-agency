"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { Reviews1 } from "@/components/reviews1";
import * as fbq from "@/lib/fb-pixel";
import { t } from "@/lib/i18n";

type Props = { product: Product; relatedProducts: Product[] };

export default function ProductDetailPage({ product, relatedProducts }: Props) {
  const router = useRouter();
  const trackedProductId = useRef<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const clearCart = useCartStore((state) => state.clearCart);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (!product?.id || trackedProductId.current === product.id) return;

    const eventId = fbq.generateEventId("viewcontent");
    const payload = {
      content_name: product.name,
      content_ids: [product.id],
      content_type: "product",
      value: product.price,
      currency: "DZD",
    };

    fbq.event("ViewContent", payload, eventId);

    const browserData = fbq.getMetaBrowserData();
    void fetch("/api/meta/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        eventName: "ViewContent",
        eventId,
        eventSourceUrl: window.location.href,
        customData: payload,
        userData: browserData,
      }),
    }).catch(() => {
      // Do not block user flow if Meta endpoint fails.
    });

    trackedProductId.current = product.id;
  }, [product?.id, product?.name, product?.price]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        {t("common.productNotFound")}
      </div>
    );
  }

  const handleAddToCart = () => {
    clearCart();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || product.image,
      quantity: quantity
    });
    router.push("/checkout");
  };

  const productImages = product.images || [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
            <img
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">{product.price} DA</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {product.originalPrice} DA
                </span>
              )}
            </div>
          </div>

          {product.description && (
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          )}

          {/* Color Selection */}
          {product.colors && (
            <div>
              <h3 className="mb-3 font-semibold text-gray-900">{t("products.color")}</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`h-10 w-10 rounded-full border-2 ${selectedColor?.name === color.name
                      ? "border-primary border-4"
                      : "border-gray-300"
                      }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">{t("products.quantity")}</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button onClick={handleAddToCart} className="flex-1" size="lg">
              {t("common.buy")}
            </Button>
          </div>



          {/* Features */}
          {product.features && (
            <div className="border-t pt-6">
              <h3 className="mb-3 font-semibold text-gray-900">{t("products.keyFeatures")}</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="bg-primary h-2 w-2 rounded-full" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">{t("products.relatedProducts")}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="mt-16">
        <Reviews1 />
      </div>
    </div>
  );
}
