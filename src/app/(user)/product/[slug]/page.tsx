import { groq } from "next-sanity";
import { Container } from "@/components/container/Container";
import React from "react";
import { client } from "@/sanity/lib/client";
import { ProductData } from "@/types/types";
import { getBestSellersProductData } from "@/lib/getData";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { ProductList } from "@/components/product/ProductList";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { FormatedPrice } from "@/components/helperComponents/FormatedPrice";

interface Props {
  params: {
    slug: string;
  };
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

export default async function Page({ params }: Props) {
  const { slug } = await Promise.resolve(params);
  const query = groq`*[_type == 'product' && slug.current == $slug][0]{
    ...
  }`;
  const productData: ProductData = await client.fetch(query, { slug });
  const bestSellersProductData = await getBestSellersProductData();

  return (
    <Container className="py-10">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Product Images */}
        <div className="md:col-span-1 lg:col-span-2">
          <div className="aspect-square overflow-hidden rounded-lg">
            <Image
              src={urlFor(productData.image).url()}
              alt={productData.title}
              width={800}
              height={800}
              className="rounded-lg object-cover"
            />
          </div>
        
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">{productData.title}</h1>
          <RatingStars rating={productData.ratings} />
          <p className="text-2xl font-bold text-primary"><FormatedPrice amount={productData.price} /> </p>
          <p className="text-muted-foreground">{productData.description}</p>
          
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Category:</span>
            <span>{productData.category[0].title}</span>
          </div>

          <AddToCartButton item={productData} />

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm">Free Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="h-5 w-5 text-primary" />
              <span className="text-sm">14-Day Returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="text-sm">1 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <Tabs defaultValue="description" className="mt-8">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4">
          <p>{productData.description}</p>
        </TabsContent>
        <TabsContent value="specifications" className="mt-4">
          <ul className="list-disc pl-5">
            <li>Comfortable</li>
            <li>Affordable</li>
            <li>Long-term usage</li>
          </ul>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <p>A reliable product.</p>
        </TabsContent>
      </Tabs>

      {/* Best Sellers */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Best Sellers</h2>
        <ProductList items={bestSellersProductData} />
      </div>
    </Container>
  );
}