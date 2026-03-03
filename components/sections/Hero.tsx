import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
              Discover Premium
              <span className="text-primary block">Products</span>
            </h1>
            <p className="mb-8 max-w-lg text-xl text-gray-600">
              Experience exceptional quality and modern design. Shop our curated collection of
              premium products crafted for the modern lifestyle.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <img
                src="/hero.webp"
                alt="Hero Product"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
                  <span className="font-bold text-white">80%</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Special Offer</p>
                  <p className="text-sm text-gray-600">Limited time only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
