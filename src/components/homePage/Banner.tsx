import { getBannerData } from "@/lib/getData";
import React from "react";
import { Container } from "../container/Container";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FormatedPrice } from "../helperComponents/FormatedPrice";

export const Banner = async () => {
  const banners = await getBannerData();
  const singleBanner = banners[Math.floor(Math.random() * 3)];

  return (
    <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-8 sm:py-12 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="flex-1 text-center lg:text-left">
            <Badge variant="secondary" className="mb-4 text-xl font-extrabold px-3 py-1">
              {singleBanner?.subtitle || "Featured Product"}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-2">
              {singleBanner?.title}
            </h1>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <Tag className="h-5 w-5 text-primary" />
              <FormatedPrice amount={singleBanner?.price} />
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto lg:mx-0">
              {singleBanner?.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="text-lg px-8 bg-primary hover:bg-primary/90"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <Image
                src={urlFor(singleBanner?.image).url()}
                alt={singleBanner?.title || "Banner Image"}
                width={500}
                height={500}
                className="rounded-lg shadow-2xl"
                priority
              />
              {/* <div className="absolute -bottom-4 -right-4 bg-background rounded-full p-4 shadow-lg">
                <span className="text-2xl font-bold text-primary">
                  ₹{singleBanner?.price || "N/A"}
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
