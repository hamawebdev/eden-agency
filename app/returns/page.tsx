export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-gray max-w-none">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">الإرجاع والاستبدال</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          نريدك أن تكون راضياً تماماً عن مشترياتك. إذا لم تكن سعيداً بطلبك، نحن هنا لمساعدتك بسياسة الإرجاع السهلة.
        </p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">نظرة عامة على سياسة الإرجاع</h2>
          <div className="bg-primary/10 border-primary/20 mb-6 rounded-lg border p-6">
            <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
              <div>
                <div className="text-primary mb-2 text-3xl font-bold">30</div>
                <div className="text-muted-foreground text-sm">أيام للإرجاع</div>
              </div>
              <div>
                <div className="text-primary mb-2 text-3xl font-bold">مجاني</div>
                <div className="text-muted-foreground text-sm">شحن الإرجاع</div>
              </div>
              <div>
                <div className="text-primary mb-2 text-3xl font-bold">100%</div>
                <div className="text-muted-foreground text-sm">ضمان استرداد المال</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">ما يمكن إرجاعه</h2>
          <div className="space-y-4 text-gray-700">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h3 className="mb-3 text-lg font-semibold text-green-800">✓ قابل للإرجاع</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• المنتجات في حالتها الأصلية</li>
                  <li>• منتجات غير مستخدمة مع البطاقات</li>
                  <li>• المنتجات في عبوتها الأصلية</li>
                  <li>• الإلكترونيات مع جميع الملحقات</li>
                  <li>• الملابس والإكسسوارات</li>
                </ul>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h3 className="mb-3 text-lg font-semibold text-red-800">✗ غير قابل للإرجاع</h3>
                <ul className="space-y-2 text-red-700">
                  <li>• منتجات مخصصة أو مصنوعة حسب الطلب</li>
                  <li>• البضائع القابلة للتلف</li>
                  <li>• منتجات صحية أو حميمة</li>
                  <li>• المنتجات التالفة بسبب سوء الاستخدام</li>
                  <li>• التحميلات الرقمية</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">كيفية إرجاع منتج</h2>
          <div className="space-y-6 text-gray-700">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="bg-primary mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white">
                  1
                </div>
                <h3 className="mb-2 font-semibold">بدء الإرجاع</h3>
                <p className="text-sm">
                  سجّل دخولك إلى حسابك واختر المنتج الذي تريد إرجاعه
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white">
                  2
                </div>
                <h3 className="mb-2 font-semibold">طباعة الملصق</h3>
                <p className="text-sm">اطبع ملصق الشحن المدفوع للإرجاع الذي نوفره</p>
              </div>
              <div className="text-center">
                <div className="bg-primary mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white">
                  3
                </div>
                <h3 className="mb-2 font-semibold">التعبئة والشحن</h3>
                <p className="text-sm">
                  قم بتعبئة المنتج بشكل آمن وأودعه في أي موقع شحن
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white">
                  4
                </div>
                <h3 className="mb-2 font-semibold">استرداد المبلغ</h3>
                <p className="text-sm">
                  استلم استردادك خلال 5-7 أيام عمل بعد استلامنا لإرجاعك
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">تحتاج إلى مساعدة؟</h2>
          <div className="space-y-4 text-gray-700">
            <p>فريق خدمة العملاء لدينا هنا لمساعدتك في أي أسئلة حول الإرجاع:</p>
            <div className="rounded-lg bg-gray-50 p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">معلومات الاتصال</h3>
                  <p>
                    <strong>البريد الإلكتروني:</strong> returns@store.com
                  </p>
                  <p>
                    <strong>الهاتف:</strong> 1-800-STORE-01
                  </p>
                  <p>
                    <strong>الأوقات:</strong> الإثنين - الجمعة 9 صباحاً - 6 مساءً
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">عنوان الإرجاع</h3>
                  <p>
                    قسم إرجاع المتجر
                    <br />
                    123 شارع التجارة
                    <br />
                    مدينة الأعمال، BC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
