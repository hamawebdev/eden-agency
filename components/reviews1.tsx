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
    content:
      "I was a bit skeptical at first, but this product really delivered. The quality is outstanding and it arrived faster than expected. Would definitely recommend to anyone on the fence.",
    author: {
      name: "Sarah M.",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    },
    date: "Dec 10, 2024",
    verified: true,
  },
  {
    id: "2",
    rating: 4,
    content:
      "Solid product overall. Does exactly what it's supposed to do. Took off one star because the packaging could be better, but the product itself is great.",
    author: {
      name: "James R.",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    },
    date: "Dec 8, 2024",
    verified: true,
  },
  {
    id: "3",
    rating: 5,
    content:
      "I've been using this daily for a month now and it still looks and works like new. The build quality is impressive at this price point. Already bought one for my sister.",
    author: {
      name: "Emily K.",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    },
    date: "Dec 5, 2024",
    verified: true,
  },
  {
    id: "4",
    rating: 4,
    content:
      "The product is nice and works well. My only minor complaint is that the color is slightly different from the photos, but it's still a great purchase overall.",
    author: {
      name: "Michael T.",
    },
    date: "Dec 2, 2024",
    verified: false,
  },
  {
    id: "5",
    rating: 5,
    content:
      "Absolutely love it! The attention to detail is remarkable. Customer service was also very helpful when I had questions. Five stars all around.",
    author: {
      name: "Lisa P.",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    },
    date: "Nov 28, 2024",
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
  title = "Customer Reviews",
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
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
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
              {averageRating.toFixed(1)} out of 5 · {currentReviews.length} reviews
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
                        <span className="text-xs">Verified Purchase</span>
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
          <h3 className="mb-4 text-xl font-semibold">Write a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <select
                id="rating"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating !== 1 && "s"}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Review</Label>
              <Textarea
                id="content"
                placeholder="Write your review here..."
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                required
                className="min-h-[100px]"
              />
            </div>
            <Button type="submit">Submit Review</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export { Reviews1 };

