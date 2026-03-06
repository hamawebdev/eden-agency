export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-gray max-w-none">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">معلومات الشحن</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          نقدم خيارات شحن سريعة وموثوقة لجعل طلبك يصل إليك بسرعة وأمان.
        </p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">خيارات الشحن</h2>
          <div className="text-gray-700">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-start text-xs font-medium tracking-wider text-gray-500 uppercase">
                      طريقة الشحن
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-medium tracking-wider text-gray-500 uppercase">
                      وقت التسليم
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-medium tracking-wider text-gray-500 uppercase">
                      التكلفة
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-medium tracking-wider text-gray-500 uppercase">
                      التتبع
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                      الشحن القياسي
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      5-7 أيام عمل
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      500 دينار (مجاني فوق 10000 دينار)
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">نعم</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                      الشحن السريع
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      2-3 أيام عمل
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">1200 دينار</td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">نعم</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                      شحن ليلة واحدة
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      يوم عمل واحد
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">2400 دينار</td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">نعم</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                      الدولي
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      7-21 أيام عمل
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      يختلف حسب الموقع
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">نعم</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">الشحن المجاني</h2>
          <div className="rounded-lg border border-green-200 bg-green-50 p-6">
            <h3 className="mb-3 text-lg font-semibold text-green-800">🚚 الشحن القياسي المجاني</h3>
            <p className="mb-4 text-green-700">
              استمتع بشحن قياسي مجاني على جميع الطلبات التي تتجاوز 10000 دينار. لا تحتاج لرمز ترويجي - يتم تطبيق الخصم تلقائياً عند الدفع.
            </p>
            <ul className="list-disc space-y-2 pr-6 text-green-700">
              <li>ينطبق على الشحن القياسي داخل الدولة</li>
              <li>يجب أن يبلغ إجمالي الطلبات 10000 دينار أو أكثر قبل الضرائب</li>
              <li>يستثني المنتجات كبيرة الحجم ومتطلبات التسليم الخاصة</li>
              <li>لا يمكن دمجه مع العروض الترويجية الأخرى للشحن</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">وقت المعالجة</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              جميع الطلبات تعالج خلال 1-2 أيام عمل. الطلبات المقدمة بعد الساعة 2 ظهراً ستُعالج في اليوم العمل التالي.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">المنتجات المتوفرة</h3>
                <p className="text-muted-foreground">يشحن خلال 1-2 أيام عمل</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">طلبات مسبقة</h3>
                <p className="text-muted-foreground">يشحن في أو قبل التاريخ المقدر</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">منتجات مخصصة</h3>
                <p className="text-muted-foreground">يختلف وقت المعالجة (3-10 أيام عمل)</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">طلبات بالجملة</h3>
                <p className="text-muted-foreground">تواصل معنا لمعرفة الجدول الزمني</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">تتبع الطلب</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              بمجرد شحن طلبك، ستتلقى رقم التتبع عبر البريد الإلكتروني. يمكنك تتبع طردك باستخدام:
            </p>
            <ul className="list-disc space-y-2 pr-6">
              <li>لوحة التحكم في حسابك على موقعنا</li>
              <li>رابط التتبع في بريد إلكتروني تأكيد الشحن</li>
              <li>مباشرة على موقع الناقل</li>
              <li>تطبيقنا المحمول (قريباً)</li>
            </ul>

            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="mb-3 font-semibold text-gray-900">يشمل معلومات التتبع:</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ul className="text-muted-foreground space-y-2">
                  <li>• الموقع الحالي للطرد</li>
                  <li>• تاريخ التسليم المقدر</li>
                  <li>• تحديثات حالة التسليم</li>
                </ul>
                <ul className="text-muted-foreground space-y-2">
                  <li>• معلومات الناقل</li>
                  <li>• إشعارات محاولات التسليم</li>
                  <li>• إثبات التسليم</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">معلومات التسليم</h2>
          <div className="space-y-4 text-gray-700">
            <h3 className="text-xl font-medium text-gray-900">متطلبات التسليم:</h3>
            <ul className="list-disc space-y-2 pr-6">
              <li>يجب أن يكون هناك شخص متاح للتوقيع على الطرود التي تتجاوز 50000 دينار</li>
              <li>يمكن ترك الطرود على بابك للتسليم القياسي</li>
              <li>تسليم الشقق يتطلب الوصول إلى المبنى</li>
              <li>توصيل صندوق بريد متاح للمنتجات الصغيرة فقط</li>
            </ul>

            <h3 className="mt-6 text-xl font-medium text-gray-900">مشاكل التسليم:</h3>
            <p>إذا واجهت أي مشاكل في التسليم، يرجى التواصل معنا خلال 48 ساعة:</p>
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <ul className="space-y-2 text-yellow-800">
                <li>• الطرد يظهر كم التسليم لكن لم تستلمه</li>
                <li>• طرود تالفة عند التسليم</li>
                <li>• عنوان التسليم غير صحيح</li>
                <li>• فشلت محاولات التسليم المتعددة</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">تواصل مع دعم الشحن</h2>
          <div className="space-y-4 text-gray-700">
            <p>هل تحتاج إلى مساعدة في أسئلة أو مشاكل الشحن؟</p>
            <div className="rounded-lg bg-gray-50 p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">قسم الشحن</h3>
                  <p>
                    <strong>البريد الإلكتروني:</strong> shipping@store.com
                  </p>
                  <p>
                    <strong>الهاتف:</strong> 1-800-SHIP-NOW
                  </p>
                  <p>
                    <strong>الأوقات:</strong> الإثنين - الجمعة 8 صباحاً - 6 مساءً
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">الأسئلة الشائعة</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• حالة الطلب والتتبع</li>
                    <li>• تغييرات عنوان الشحن</li>
                    <li>• جدولة التسليم</li>
                    <li>• عروض الشحن الدولي</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
