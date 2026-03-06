"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";

import { cn } from "@/lib/utils";

import { Rating } from "@/components/shadcnblocks/rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Review {
  id: string;
  rating: number;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  verified?: boolean;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "1",
    rating: 5,
    content: "la deuxième fois li nchri 3likom merci beaucoup",
    author: {
      name: "fatehbaeea",
    },
    date: "21/06/2025",
    verified: false,
  },
  {
    id: "2",
    rating: 5,
    content: "انا بطبيعتي ديما انسان مانديرش الثقة فيمن جا . بصح فوكسي يخلوك تثيق فيهم بالسيف من المعاملة تاعهم الطيبة و سرعة الرد و الضمانات و كلش . هاذي مش اول مرة نتعامل معاهم و باذن الله مش الاخير و راح نرشحهم لكل واحد يحوس على الخدمات لي يقدموهم . بالتوفيق",
    author: {
      name: "Sif Eddine",
    },
    date: "27/06/2025",
    verified: true,
  },
  {
    id: "3",
    rating: 5,
    content: "سرعة و مصداقية بارك الله فيكم",
    author: {
      name: "Mostafa dje",
    },
    date: "29/06/2025",
    verified: true,
  },
  {
    id: "4",
    rating: 5,
    content: "لنا تعاملات أخرى باذن الله، ثقة ومصداقية\nيعطيكم الصحة💪✨",
    author: {
      name: "Nasreddine",
    },
    date: "01/07/2025",
    verified: true,
  },
  {
    id: "5",
    rating: 5,
    content: "الافضل 🤍",
    author: {
      name: "zineddine",
    },
    date: "02/07/2025",
    verified: true,
  },
  {
    id: "6",
    rating: 5,
    content: "الثقة و المصداقية الأفضل في المجال بما في ذلك الأسعار",
    author: {
      name: "محمد",
    },
    date: "05/07/2025",
    verified: true,
  },
  {
    id: "7",
    rating: 5,
    content: "Merci beaucoup pour votre service",
    author: {
      name: "CARLOSLEVRAI",
    },
    date: "06/07/2025",
    verified: false,
  },
  {
    id: "8",
    rating: 5,
    content: "صدق والمصداقية شكرا❤️",
    author: {
      name: "Aymene Moulai",
    },
    date: "08/07/2025",
    verified: true,
  },
  {
    id: "9",
    rating: 5,
    content: ".",
    author: {
      name: "Younes ismail",
    },
    date: "10/07/2025",
    verified: false,
  },
  {
    id: "10",
    rating: 5,
    content: "ما شاء الله صدق و مصداقية 🤍",
    author: {
      name: "Younes ismail",
    },
    date: "10/07/2025",
    verified: true,
  },
  {
    id: "11",
    rating: 5,
    content: "Service professionnel, équipe réactive, consignes claires, abonnement simple ! Top, bittawfi9 inchallah !",
    author: {
      name: "Nazim",
    },
    date: "14/07/2025",
    verified: false,
  },
  {
    id: "12",
    rating: 5,
    content: "une equipe au top du top,franchement mercii beaucoup 👌❤️",
    author: {
      name: "khouas nabil",
    },
    date: "18/07/2025",
    verified: true,
  },
  {
    id: "13",
    rating: 5,
    content: "Perfect people to work honest guys and trustworthy good luck boys",
    author: {
      name: "Dawn Design",
    },
    date: "21/07/2025",
    verified: true,
  },
  {
    id: "14",
    rating: 5,
    content: "Très bon service, espérant qu il sera toujours comme ça, bonne continuation.",
    author: {
      name: "Rami",
    },
    date: "26/07/2025",
    verified: true,
  },
  {
    id: "15",
    rating: 5,
    content: "C'est la première fois nchri 3lihm service Trés rapide lah ybareq",
    author: {
      name: "Mohamed",
    },
    date: "28/07/2025",
    verified: true,
  },
  {
    id: "16",
    rating: 5,
    content: "-Fast response\n-Good price\n-Easy to apply the subscription\n-The product was as described by the seller ( no deceptive advertising)\n\nTRUST EARNED",
    author: {
      name: "Mirai che",
    },
    date: "01/08/2025",
    verified: true,
  },
  {
    id: "17",
    rating: 5,
    content: "ماشاء الله معاملة في القمة والثقة في التعامل 💯",
    author: {
      name: "Rabah",
    },
    date: "23/08/2025",
    verified: true,
  },
  {
    id: "18",
    rating: 5,
    content: "جميل جداً",
    author: {
      name: "AMJID ZAOUI",
    },
    date: "20/09/2025",
    verified: false,
  },
  {
    id: "19",
    rating: 5,
    content: "trust earned, GOOD LUCK GUYS",
    author: {
      name: "yasserjl51",
    },
    date: "02/10/2025",
    verified: true,
  },
  {
    id: "20",
    rating: 4,
    content: "Great",
    author: {
      name: "Austen",
    },
    date: "14/10/2025",
    verified: false,
  },
  {
    id: "21",
    rating: 5,
    content: "Thanks",
    author: {
      name: "Hichem Yahia",
    },
    date: "17/10/2025",
    verified: false,
  },
  {
    id: "22",
    rating: 5,
    content: "بارك اللّه فيكم على الخدمة، فريق دعم يعمل بسلاسة، خدمة موثوقة وتعامل محترم، وللأمانة نسوا إلغاء التفعيل لشهر آخر ورفضوا أن أدفع لهم عليه.\nبارك اللَّه فيكم، وسأتعامل معكم مستقبلا إن احتجت أحد البرامج إن شاء اللَّه.",
    author: {
      name: "M.BOUCIF",
    },
    date: "28/10/2025",
    verified: true,
  },
  {
    id: "23",
    rating: 5,
    content: "سرعة احترافية و مصداقية اللهم بارك",
    author: {
      name: "Reguieg abderrahmane",
    },
    date: "10/11/2025",
    verified: true,
  },
];

interface Reviews1Props {
  reviews?: Review[];
  title?: string;
  className?: string;
}

const Reviews1 = ({
  reviews = DEFAULT_REVIEWS,
  title = "آراء العملاء",
  className,
}: Reviews1Props) => {
  const [currentReviews, setCurrentReviews] = useState<Review[]>(reviews);
  const [newReview, setNewReview] = useState({
    rating: 5,
    content: "",
    name: "",
  });

  const averageRating =
    currentReviews.reduce((sum, review) => sum + review.rating, 0) / currentReviews.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.content || !newReview.name) return;

    const addedReview: Review = {
      id: Math.random().toString(36).substring(7),
      rating: newReview.rating,
      content: newReview.content,
      author: {
        name: newReview.name,
      },
      date: new Date().toLocaleDateString("ar-SA", { month: "short", day: "numeric", year: "numeric" }),
      verified: true // Marking self-submitted as verified for demo
    };

    setCurrentReviews((prev) => [...prev, addedReview]);
    setNewReview({ rating: 5, content: "", name: "" }); // Reset
  };

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h2>
          <div className="mt-2 flex items-center gap-3">
            <Rating rate={averageRating} className="[&_svg]:size-5" />
            <span className="text-sm text-muted-foreground">
              {averageRating.toFixed(1)} من 5 · {currentReviews.length} تقييمات
            </span>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-0">
          {currentReviews.map((review, index) => (
            <div key={review.id}>
              {index > 0 && <Separator className="my-6" />}
              <div className="space-y-3">
                {/* Rating & Title */}
                <div>
                  <Rating rate={review.rating} className="[&_svg]:size-4" />
                </div>

                {/* Content */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {review.content}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage
                      src={review.author.avatar}
                      alt={review.author.name}
                    />
                    <AvatarFallback className="text-xs">
                      {review.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{review.author.name}</span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-emerald-600">
                        <BadgeCheck className="size-4" />
                        <span className="text-xs">شراء موثق</span>
                      </span>
                    )}
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Form */}
        <div className="mt-12 rounded-xl bg-gray-50 p-6 border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800">
          <h3 className="mb-4 text-xl font-semibold">اكتب تقييماً</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rating">التقييم</Label>
              <select
                id="rating"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} نجمة{rating !== 1 && "ات"}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">الاسم</Label>
              <Input
                id="name"
                placeholder="اسمك"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">التقييم</Label>
              <Textarea
                id="content"
                placeholder="اكتب تقييمك هنا..."
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                required
                className="min-h-[100px]"
              />
            </div>
            <Button type="submit">إرسال التقييم</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export { Reviews1 };
