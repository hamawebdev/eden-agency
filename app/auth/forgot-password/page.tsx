"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/useForm";
import { ForgotPasswordSchema, type ForgotPasswordForm } from "@/lib/schemas";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data, errors, isSubmitting, setValue, handleSubmit } = useForm(ForgotPasswordSchema);

  const onSubmit = async () => {
    // Simulate password reset request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">تحقق من بريدك الإلكتروني</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              أرسلنا رابط إعادة تعيين كلمة المرور إلى {data.email}
            </p>
          </div>

          <div className="mt-8">
            <Link href="/auth/signin">
              <Button variant="outline" className="w-full bg-transparent">
                العودة لتسجيل الدخول
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            هل نسيت كلمة المرور؟
          </h2>
          <p className="text-muted-foreground mt-2 text-center text-sm">
            أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit);
          }}>
          <div>
            <Input
              type="email"
              placeholder="البريد الإلكتروني"
              value={data.email || ""}
              onChange={(e) => setValue("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">:</p>}
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "جاري الإرسال..." : "إرسال رابط إعادة التعيين"}
          </Button>

          <div className="text-center">
            <Link href="/auth/signin" className="text-primary hover:text-primary/80 font-medium">
              العودة لتسجيل الدخول
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
