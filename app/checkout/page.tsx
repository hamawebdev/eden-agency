"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/stores/cartStore";
import { useForm } from "@/hooks/useForm";
import { CheckoutSchema, type CheckoutForm } from "@/lib/schemas";
import Faq3 from "@/components/mvpblocks/faq-3";
import { submitOrderToGoogleSheet } from "@/app/actions/checkout";
import { Reviews1 } from "@/components/reviews1";
import * as fbq from "@/lib/fb-pixel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

const DURATION_PRICES: Record<string, { label: string; value: number }[]> = {
  chatgpt: [
    { label: "شهر واحد", value: 900 },
    { label: "3 أشهر", value: 2000 },
    { label: "سنة واحدة", value: 7500 },
  ],
  capcut: [
    { label: "شهر واحد", value: 900 },
    { label: "3 أشهر", value: 2000 },
    { label: "سنة واحدة", value: 7500 },
  ],
  adobe: [{ label: "شهر واحد", value: 1500 }],
  perplexity: [{ label: "شهر واحد", value: 1000 }],
};

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const { data, errors, isSubmitting, setValue, handleSubmit } = useForm(CheckoutSchema);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const router = useRouter();

  const handleDurationChange = (itemId: string, index: number) => {
    setDurations((prev) => ({ ...prev, [itemId]: index }));
  };

  const finalTotal = items.reduce((acc, item) => {
    const itemDurations = DURATION_PRICES[item.id] || [{ label: "شهر واحد", value: item.price }];
    const selectedDurationIndex = durations[item.id] || 0;
    return acc + itemDurations[selectedDurationIndex].value * item.quantity;
  }, 0);

  const onSubmit = async (formData: CheckoutForm) => {
    const purchaseEventId = fbq.generateEventId("purchase");
    const browserData = fbq.getMetaBrowserData();

    // Handle checkout logic here
    const orderData = {
      ...formData,
      items: items.map((item) => {
        const itemDurations = DURATION_PRICES[item.id] || [{ label: "شهر واحد", value: item.price }];
        const selectedDurationIndex = durations[item.id] || 0;
        const currentPrice = itemDurations[selectedDurationIndex].value;
        const durationLabel = itemDurations.length > 1 ? itemDurations[selectedDurationIndex].label : itemDurations[0].label;

        return {
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          duration: durationLabel,
          price: currentPrice,
          total: currentPrice * item.quantity,
        };
      }),
      totalAmount: finalTotal,
      orderDate: new Date().toISOString(),
      metaEventId: purchaseEventId,
      metaEventSourceUrl: window.location.href,
      metaBrowserData: browserData,
    };

    const result = await submitOrderToGoogleSheet(orderData);

    if (result.success) {
      clearCart();
      router.push(`/thankyou?event_id=${encodeURIComponent(purchaseEventId)}&value=${finalTotal}`);
    } else {
      setIsErrorDialogOpen(true);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">الدفع</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Order Summary */}
        <div>
          <div className="sticky top-8 rounded-xl bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">ملخص الطلب</h2>

            <div className="mb-6 space-y-4">
              {items.map((item) => {
                const itemDurations = DURATION_PRICES[item.id] || [{ label: "شهر واحد", value: item.price }];
                const selectedDurationIndex = durations[item.id] || 0;
                const currentPrice = itemDurations[selectedDurationIndex].value;

                return (
                  <div key={item.id} className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        {itemDurations.length > 1 ? (
                          <p className="mt-1 text-sm text-gray-500">{itemDurations[selectedDurationIndex].label}</p>
                        ) : (
                          <p className="mt-1 text-sm text-gray-500">{itemDurations[0].label}</p>
                        )}
                      </div>
                    </div>
                    <p className="font-medium shrink-0">{currentPrice * item.quantity}دينار</p>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-200 mt-6 pt-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>الإجمالي</span>
                <span className="text-primary">{finalTotal}دينار</span>
              </div>
            </div>


          </div>
        </div>

        {/* Checkout Form */}
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit);
            }}
            className="space-y-6">
            {/* Order Information */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">معلومات الطلب</h2>
              <div className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={data.email || ""}
                    onChange={(e) => setValue("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="الاسم الكامل"
                    value={data.fullName || ""}
                    onChange={(e) => setValue("fullName", e.target.value)}
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="رقم الهاتف"
                    value={data.phone || ""}
                    onChange={(e) => setValue("phone", e.target.value)}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
                {/* Duration Selection */}
                {items.map((item) => {
                  const itemDurations = DURATION_PRICES[item.id];
                  if (!itemDurations || itemDurations.length <= 1) return null;
                  return (
                    <div key={item.id}>
                      <label className="block text-sm font-medium text-gray-700">
                        {item.name} - المدة
                      </label>
                      <select
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-sm bg-white"
                        value={durations[item.id] || 0}
                        onChange={(e) => handleDurationChange(item.id, Number(e.target.value))}
                      >
                        {itemDurations.map((duration, idx) => (
                          <option key={idx} value={idx}>
                            {duration.label} - {duration.value}دينار
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "جاري المعالجة..." : "تقديم الطلب"}
            </Button>
          </form>
        </div>
      </div>
      <div className="mt-16">
        <Faq3 />
        <Reviews1 />
      </div>

      <Dialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
        <DialogContent showCloseButton={true}>
          <DialogHeader>
            <DialogTitle>خطأ في الطلب</DialogTitle>
            <DialogDescription>
              حدث خطأ في تقديم طلبك. يرجى المحاولة مرة أخرى أو التواصل مع الدعم.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">إغلاق</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
