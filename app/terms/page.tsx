export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-gray max-w-none">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">شروط الخدمة</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
        </p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. قبول الشروط</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              بوصولك واستخدامك لهذا الموقع، فأنت تقبل وتوافق على الالتزام بشروط وأحكام هذا الاتفاق. إذا كنت لا توافق على الالتزام بما سبق، يرجى عدم استخدام هذه الخدمة.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">2. استخدام الترخيص</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              يُمنح الإذن لتنزيل نسخة واحدة مؤقتاً من المواد على موقع المتجر للعرض الشخصي غير التجاري فقط. هذا هو منح ترخيص وليس نقل الملكية، ولا يجوز لك بموجب هذا الترخيص:
            </p>
            <ul className="list-disc space-y-2 pr-6">
              <li>تعديل أو نسخ المواد</li>
              <li>استخدام المواد لأي غرض تجاعي أو لأي عرض عام</li>
              <li>محاولة逆向工程 أي برنامج موجود على الموقع</li>
              <li>إزالة أي حقوق نشر أو ملاحظات ملكية أخرى من المواد</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">3. معلومات المنتج</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              نسعى لتوفير معلومات دقيقة عن المنتجات، بما في ذلك الأوصاف والأسعار والتوفر. ومع ذلك:
            </p>
            <ul className="list-disc space-y-2 pr-6">
              <li>قد تختلف ألوان المنتجات بسبب إعدادات الشاشة</li>
              <li>نحتفظ بالحق في تصحيح أي أخطاء في التسعير أو معلومات المنتج</li>
              <li>تخضع حالة التوفر للتغيير دون إشعار مسبق</li>
              <li>قد نحدد الكميات المتاحة للشراء</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">4. الطلبات والدفع</h2>
          <div className="space-y-4 text-gray-700">
            <h3 className="text-xl font-medium text-gray-900">قبول الطلب</h3>
            <p>
              جميع الطلبات تخضع للقبول من جانبنا. نحتفظ بالحق في رفض أو إلغاء أي طلب لأي سبب، بما في ذلك على سبيل المثال لا الحصر التوفر المنتج أو أخطاء معلومات المنتج أو التسعير أو النشاط المشبوه.
            </p>

            <h3 className="mt-6 text-xl font-medium text-gray-900">شروط الدفع</h3>
            <ul className="list-disc space-y-2 pr-6">
              <li>الدفع مستحق وقت الطلب</li>
              <li>نقبل بطاقات الائتمان الرئيسية و PayPal</li>
              <li>جميع الأسعار بالعملة المحلية ما لم يُحدد خلاف ذلك</li>
              <li>أنت مسؤول عن أي ضرائب applicable</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">5. الشحن والتسليم</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              تختلف أوقات الشحن والتكاليف حسب موقعك وطريقة الشحن المختارة. نحن لسنا مسؤولين عن التأخيرات الناجمة عن شركات الشحن أو معالجة الجمارك.
            </p>
            <ul className="list-disc space-y-2 pr-6">
              <li>الشحن القياسي: 5-7 أيام عمل</li>
              <li>الشحن السريع: 2-3 أيام عمل</li>
              <li>شحن ليلة واحدة: يوم عمل واحد</li>
              <li>الشحن الدولي: 7-21 أيام عمل</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">6. الإرجاع والاسترداد</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              يرجى الاطلاع على{" "}
              <a href="/returns" className="text-primary hover:underline">
                سياسة الإرجاع
              </a>{" "}
              للحصول على معلومات مفصلة حول الإرجاع والاستبدال والاسترداد.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">7. حسابات المستخدمين</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              عند إنشاء حساب لدينا، يجب عليك تقديم معلومات دقيقة وكاملة. أنت مسؤول عن:
            </p>
            <ul className="list-disc space-y-2 pr-6">
              <li>الحفاظ على سرية بيانات اعتماد حسابك</li>
              <li>جميع الأنشطة التي تحدث تحت حسابك</li>
              <li>إخطارنا فوراً بأي استخدام غير مصرح به</li>
              <li>التأكد من أن معلومات حسابك محدثة</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">8. الاستخدامات المحظورة</h2>
          <div className="space-y-4 text-gray-700">
            <p>لا يجوز لك استخدام خدماتنا:</p>
            <ul className="list-disc space-y-2 pr-6">
              <li>لأي غرض غير قانوني أو لتحريض الآخرين على أداء أفعال غير قانونية</li>
              <li>لخرق أي لوائح أو قوانين دولية أو اتحادية أو محلية</li>
              <li>لالتهاك على حقوق الملكية الفكرية الخاصة بنا أو حقوق الآخرين</li>
              <li>لمضايقة أو إساءة أو إهانة أو تشهير أو تمييز أو تخويف</li>
              <li>لتقديم معلومات خاطئة أو مضللة</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">9. تحديد المسؤولية</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              لا يتحمل المتجر أو موردوه بأي حال من الأحوال المسؤولية عن أي أضرار (بما في ذلك على سبيل المثال لا الحصر أضرار فقدان البيانات أو الربح أو انقطاع الأعمال) الناشئة عن استخدام أو عدم القدرة على استخدام المواد على موقع المتجر، حتى لو تم إخطار المتجر أو ممثله المعتمد بإمكانية حدوث such damage.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">10. القانون الحاكم</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              تخضع هذه الشروط والأحكام وتفسر وفقاً لقوانين الدولة وتخضع حصرياً لاختصاص المحاكم في تلك الدولة أو الموقع.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">11. تغييرات الشروط</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              نحتفظ بالحق في مراجعة شروط الخدمة هذه في أي وقت دون إشعار. باستخدامك لهذا الموقع، فأنت توافق على الالتزام بالإصدار الحالي من شروط الخدمة.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">12. معلومات الاتصال</h2>
          <div className="space-y-4 text-gray-700">
            <p>إذا كانت لديك أي أسئلة حول شروط الخدمة هذه، يرجى التواصل معنا:</p>
            <div className="rounded-lg bg-gray-50 p-6">
              <p>
                <strong>البريد الإلكتروني:</strong> legal@store.com
              </p>
              <p>
                <strong>الهاتف:</strong> 1-800-STORE-01
              </p>
              <p>
                <strong>العنوان:</strong> 123 شارع التجارة، مدينة الأعمال، BC 12345
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
