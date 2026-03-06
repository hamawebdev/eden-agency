import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="bg-primary py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">ابق على اطلاع</h2>
        <p className="text-primary-foreground/80 mb-8 text-xl">
          اشترك في نشرتنا الإخبارية وكن اول من يعرف عن المنتجات الجديدة والعروض الحصرية والعروض الترويجية الخاصة.
        </p>

        <div className="mx-auto max-w-md">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 bg-white"
            />
            <Button variant="secondary" className="whitespace-nowrap">
              اشترك الآن
            </Button>
          </div>
          <p className="text-primary-foreground/60 mt-4 text-sm">
            نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.
          </p>
        </div>
      </div>
    </section>
  );
}
