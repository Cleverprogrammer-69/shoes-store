"use client";
import { ProductData } from "@/types/types";
import React, { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return (
            <Star key={index} className="w-4 h-4 fill-primary text-primary" />
          );
        } else if (index === fullStars && hasHalfStar) {
          return (
            <StarHalf
              key={index}
              className="w-4 h-4 fill-primary text-primary"
            />
          );
        } else {
          return <Star key={index} className="w-4 h-4 text-muted-foreground" />;
        }
      })}
      <span className="ml-2 text-sm text-muted-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export function ProductCard({ item }: { item: ProductData }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative">
      {/* Show skeleton only if the image has not loaded */}
      {!imageLoaded && (
        <div className="absolute inset-0 z-10">
          <ProductCardSkeleton />
        </div>
      )}
      <Card
        className={`flex h-full flex-col justify-between overflow-hidden transition-all hover:shadow-lg ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <CardContent className="p-4 flex-grow">
          <div className="aspect-square overflow-hidden rounded-lg">
            <Link href={`/product/${item.slug.current}`}>
              <Image
                src={urlFor(item.image).url()}
                alt={item.title}
                width={300}
                height={300}
                className="h-full w-full object-cover transition-all hover:scale-105"
                onLoad={() => setImageLoaded(true)} // Triggered when the image finishes loading
              />
            </Link>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {item?.description}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                ₹{item.price}
              </span>
              <span className="text-sm text-muted-foreground">
                {item.category[0].title}
              </span>
            </div>
            <div className="mt-2">
              <RatingStars rating={item.ratings} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-auto p-4">
          <AddToCartButton />
        </CardFooter>
      </Card>
    </div>
  );
}
