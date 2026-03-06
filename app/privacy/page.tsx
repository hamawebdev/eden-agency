export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-gray max-w-none">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">سياسة الخصوصية</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
        </p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. المعلومات التي نجمعها</h2>
          <div className="space-y-4 text-gray-700">
            <h3 className="text-xl font-medium text-gray-900">المعلومات الشخصية</h3>
            <p>
              نجمع المعلومات التي تقدمها لنا مباشرة، مثل إنشاء حساب أو إجراء شراء أو الاشتراك في نشرتنا الإخبارية أو التواصل معنا. قد يشمل ذلك:
            </p>
            <ul className="list-disc space-y-2 pr-6">
              <li>الاسم ومعلومات الاتصال (البريد الإلكتروني، رقم الهاتف، العنوان البريدي)</li>
              <li>معلومات الدفع (تفاصيل بطاقة الائتمان، عنوان الفواتير)</li>
              <li>بيانات اعتماد الحساب (اسم المستخدم، كلمة المرور)</li>
              <li>سجل المشتريات والتفضيلات</li>
              <li>التواصل معنا</li>
            </ul>

            <h3 className="mt-6 text-xl font-medium text-gray-900">
              المعلومات المجمعة تلقائياً
            </h3>
            <p>
              عند visita على موقعنا، نجمع تلقائياً certain information about your device and usage، بما في ذلك:
            </p>
            <ul className="list-disc space-y-2 pr-6">
              <li>عنوان IP ومعلومات الموقع</li>
              <li>نوع المتصفح وإصداره</li>
              <li>معلومات الجهاز</li>
              <li>الصفحات التي تمت زيارتها والوقت المستغرق على موقعنا</li>
              <li>الموقع الإحالي</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            2. كيف نستخدم معلوماتك
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>نستخدم المعلومات التي نجمعها لـ:</p>
            <ul className="list-disc space-y-2 pr-6">
              <li>معالجة وتنفيذ طلباتك</li>
              <li>توفير خدمة العملاء والدعم</li>
              <li>إرسال تحديثات حول طلباتك وحسابك</li>
              <li>تحسين منتجاتنا وخدماتنا</li>
              <li>تخصيص تجربتك في التسوق</li>
              <li>إرسال اتصالات تسويقية (بموافقتك)</li>
              <li>منع الاحتيال وضمان الأمان</li>
              <li>الامتثال للالتزامات القانونية</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">3. مشاركة المعلومات</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              لا نبيع أو نتاجر أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك في الظروف التالية:
            </p>
            <ul className="list-disc space-y-2 pr-6">
              <li>
                <strong>مقدمو الخدمات:</strong> مع مقدمي خدمات сторон third-party الموثوقين الذين يساعدوننا في تشغيل أعمالنا
              </li>
              <li>
                <strong>المتطلبات القانونية:</strong> عندما يطلب القانون أو لحماية حقوقنا
              </li>
              <li>
                <strong>نقل الأعمال:</strong> فيما يتعلق باندماج أو استحواذ أو بيع أصول
              </li>
              <li>
                <strong>بموافقتك:</strong> عندما توافق صراحةً على مشاركة معلوماتك
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">4. أمان البيانات</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              نطبق إجراءات تقنية وتنظيمية مناسبة لحماية معلوماتك الشخصية ضد الوصول غير المصرح به أو التغيير أو الإفصاح أو الإتلاف. تشمل هذه الإجراءات:
            </p>
            <ul className="list-disc space-y-2 pr-6">
              <li>تشفير SSL لنقل البيانات</li>
              <li>معالجة دفع آمنة</li>
              <li>تقييمات أمنية منتظمة</li>
              <li>ضوابط الوصول والمصادقة</li>
              <li>تدريب الموظفين على حماية البيانات</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">5. حقوقك</h2>
          <div className="space-y-4 text-gray-700">
            <p>لديك الحق في:</p>
            <ul className="list-disc space-y-2 pr-6">
              <li>الوصول إلى معلوماتك الشخصية وتحديثها</li>
              <li>طلب حذف معلوماتك الشخصية</li>
              <li>الانسحاب من الاتصالات التسويقية</li>
              <li>طلب نسخة من بياناتك</li>
              <li>الاعتراض على معالجة معلوماتك الشخصية</li>
            </ul>
            <p>
              لممارسة هذه الحقوق، يرجى التواصل معنا على privacy@store.com أو استخدام معلومات الاتصال المقدمة أدناه.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">6. ملفات تعريف الارتباط والتتبع</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة لتحسين تجربة التصفح وتحليل حركة المرور وتخصيص المحتوى. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال تفضيلات متصفحك.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">7. التغييرات على هذه السياسة</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات جوهرية من خلال نشر السياسة الجديدة على هذه الصفحة وتحديث تاريخ 'آخر تحديث'.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">8. تواصل معنا</h2>
          <div className="space-y-4 text-gray-700">
            <p>إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا:</p>
            <div className="rounded-lg bg-gray-50 p-6">
              <p>
                <strong>البريد الإلكتروني:</strong> privacy@store.com
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
