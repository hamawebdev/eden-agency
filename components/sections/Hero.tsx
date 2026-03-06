import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
              اكتشف اشتراكاتنا الرقمية
            </h1>
            <p className="mb-8 max-w-lg text-xl text-gray-600">
              استمتع بأقوى الاشتراكات الرقمية مثل خدمات الذكاء الاصطناعي والأدوات الاحترافية مع تفعيل فوري بعد الشراء. تجربة سريعة، آمنة، ومصممة لتمنحك وصولاً مباشراً إلى أفضل الخدمات الرقمية.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  تسوق الآن
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src="/hero.webp"
                alt="منتج مميز"
                width={800}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
                  <span className="font-bold text-white">80%</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">عرض خاص</p>
                  <p className="text-sm text-gray-600">لمدة محدودة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
