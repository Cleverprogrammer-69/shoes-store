import { getBannerData } from "@/lib/getData";
import React from "react";
import { Container } from "../container/Container";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Banner = async () => {
  const banners = await getBannerData();
  const singleBanner = banners[Math.floor(Math.random()*3)];

  return (
    <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-6 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
              {singleBanner?.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto lg:mx-0">
              {singleBanner?.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-lg px-8">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
            <Image
              src={urlFor(singleBanner?.image).url()}
              alt={singleBanner?.title || "Banner Image"}
              width={500}
              height={500}
              className="relative z-10 rounded-lg shadow-2xl"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
