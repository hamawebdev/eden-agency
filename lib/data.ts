import { ProductSchema, type Product } from "./schemas";

// Sample products data - types are automatically inferred
export const sampleProducts = [
  {
    id: "chatgpt",
    name: "chatgpt plus",
    price: 900,
    image: "/products/chatgpt.webp",
    rating: 5.0,
    reviews: 124,
    category: "الذكاء الاصطناعي",
    badge: "الأكثر مبيعاً",
    description: "الأسعار:\n- 900DA شهرياً\n- 2000DA لثلاثة أشهر\n- 7500DA للسنة",
    features: [
      "اشتراك رسمي 100% في شات جي بي تي بلس",
      "التفعيل عبر بريدك الإلكتروني الشخصي",
      "ضمان كامل طوال فترة الاشتراك",
      "الوصول لأحدث النماذج",
      "رفع غير محدود للملفات",
    ]
  },
  {
    id: "capcut",
    name: "capcut pro",
    price: 900,
    image: "/products/capcut.webp",
    rating: 4.8,
    reviews: 89,
    category: "التحرير",
    description: "الأسعار:\n- 900DA شهرياً\n- 2000DA لثلاثة أشهر\n- 7500DA للسنة",
    features: [
      "وصول كامل لجميع الأدوات المميزة: بدون إعلانات وغير محدود",
      "فلاتر وتأثيرات متقدمة لفيديوهات عالية الجودة",
      "انتقالات وحركات حصرية لمظهر احترافي",
      "تصدير بدقة 1080p و 4K بدون علامات مائية",
      "مكتبة غنية بالموسيقى والمؤثرات الصوتية",
      "قوالب جاهزة لتحرير سريع واحترافي",
      "تخزين آمن 100 جيجابايت لفيديوهاتك وملفاتك",
      "حسابات 100% آمنة ومضمونة",
      "دعم سريع لتفعيل الحساب بسهولة"
    ]
  },
  {
    id: "adobe",
    name: "adobe creative cloud",
    price: 1500,
    image: "/products/adobe.webp",
    rating: 4.9,
    reviews: 156,
    category: "التصميم",
    badge: "شائع",
    description: "الأسعار:\n- 1500DA شهرياً\n\n📌 ملاحظة: يشمل أيضاً أدوبي فاييرفلي وأدوبي ستوك (صور ومحتوى مخزون احترافي).",
    features: [
      "تطبيقات أدوبي الرسمية 100%",
      "التفعيل عبر بريدك الإلكتروني الشخصي",
      "الاستخدام على جهازين (PC / Mac)",
      "دعم تقني مباشر من أدوبي",
      "ضمان كامل طوال فترة الاشتراك"
    ]
  },
  {
    id: "perplexity",
    name: "perplexity pro",
    price: 1000,
    image: "/products/perplexity.webp",
    rating: 4.7,
    reviews: 67,
    category: "الذكاء الاصطناعي",
    description: "الأسعار:\n- 1000DA شهرياً",
    features: [
      "اشتراك رسمي 100% في بربليكسيتي",
      "التفعيل عبر بريدك الإلكتروني الشخصي",
      "ضمان كامل طوال فترة الاشتراك"
    ]
  }
] as const;

// Validate and export products with proper typing
export const products: Product[] = sampleProducts.map((product) => ProductSchema.parse(product));

// Categories data with inferred types
export const categories = [
  {
    name: "الذكاء الاصطناعي",
    href: "/products?category=الذكاء_الاصطناعي",
    count: "منتجان"
  },
  {
    name: "التحرير",
    href: "/products?category=التحرير",
    count: "منتج واحد"
  },
  {
    name: "التصميم",
    href: "/products?category=التصميم",
    count: "منتج واحد"
  }
] as const;

// Testimonials data with inferred types
export const testimonials = [
  {
    id: 1,
    name: "سيف الدين",
    role: "مالك موثق",
    content: "أنا بطبيعتي دائماً إنسان ما نديرش الثقة في من جاء . بس أيدين يخلوك تثق فيهم بالسلاح من المعاملة الطيبة وسرعة الرد والضمانات وكل شيء . هذي مش أول مرة نتعامل معهم وبإذن الله مش الأخيرة وراح نرشحهم لكل واحد يحوس على الخدمات اللي يقدمونها . بالتوفيق",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60"
  },
  {
    id: 2,
    name: "Mirai che",
    role: "مالك موثق",
    content: "-استجابة سريعة\n-سعر جيد\n-سهل تطبيق الاشتراك\n-المنتج كما وصفه البائع (بدون إعلانات مضللة)\n\nالثقة مستحقة",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60"
  },
  {
    id: 3,
    name: "Dawn Design",
    role: "مالك موثق",
    content: "أشخاص مثاليون للعمل . شباب صادقون وموثوقون . حظاً سعيداً",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60"
  }
] as const;

// Export inferred types
export type Category = (typeof categories)[number];
export type Testimonial = (typeof testimonials)[number];
