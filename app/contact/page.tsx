"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/useForm";
import { ContactSchema, type ContactForm } from "@/lib/schemas";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { data, errors, isSubmitting, setValue, handleSubmit } = useForm(ContactSchema);

  const onSubmit = async (formData: ContactForm) => {
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to send message");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitError("تعذر إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقاً.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-lg border border-green-200 bg-green-50 p-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-green-800">تم إرسال الرسالة بنجاح!</h2>
          <p className="mb-4 text-green-700">
            شكراً لتواصل معنا. سنتواصل معك خلال دقائق
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="bg-transparent">
            إرسال رسالة أخرى
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">اتصل بنا</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          نود أن نسمع منك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-1">
        {/* Contact Form */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">أرسل لنا رسالة</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit);
              }}
              className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-gray-700">
                    الاسم الأول *
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="أحمد"
                    value={data.firstName || ""}
                    onChange={(e) => setValue("firstName", e.target.value)}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-gray-700">
                    اسم العائلة *
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="محمد"
                    value={data.lastName || ""}
                    onChange={(e) => setValue("lastName", e.target.value)}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    البريد الإلكتروني *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ahmed@example.com"
                    value={data.email || ""}
                    onChange={(e) => setValue("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                    رقم الهاتف
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="05xx xxx xxxx"
                    value={data.phone || ""}
                    onChange={(e) => setValue("phone", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                  الرسالة *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="يرجى وصف استفسارك بالتفصيل..."
                  value={data.message || ""}
                  onChange={(e) => setValue("message", e.target.value)}
                  className={`focus:ring-primary w-full resize-none rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 ${errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              {submitError && (
                <div className="rounded-md bg-red-50 p-3">
                  <p className="text-sm text-red-600">{submitError}</p>
                </div>
              )}

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
