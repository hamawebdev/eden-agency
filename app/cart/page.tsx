"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">سلتك فارغة</h1>
        <p className="text-muted-foreground mb-8">
          يبدو أنك لم تقم بإضافة أي شيء إلى سلتك بعد.
        </p>
        <Link href="/products">
          <Button size="lg">متابعة التسوق</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">سلة التسوق</h1>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-6">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={80}
                height={80}
                className="h-20 w-20 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-muted-foreground">{item.price} دينار</p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50">
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="text-left">
                <p className="font-semibold text-gray-900">
                  {item.price * item.quantity} دينار
                </p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-500 hover:text-red-700">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold">الإجمالي:</span>
            <span className="text-primary text-2xl font-bold">{getTotal()} دينار</span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/products" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                متابعة التسوق
              </Button>
            </Link>
            <Link href="/checkout" className="flex-1">
              <Button className="w-full" size="lg">
               المتابعة للدفع
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
