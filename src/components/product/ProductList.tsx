import { getProductData } from "@/lib/getData";
import { ProductData } from "@/types/types";
import React from "react";
import { ProductCard } from "./ProductCard";
import { Container } from "../container/Container";

export async function ProductList() {
  const products: ProductData[] = await getProductData();
  return (
    <section className="bg-background py-12 sm:py-16">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((item) => <ProductCard key={item?._id} item={item} />)}
        </div>
      </Container>
    </section>
  );
}
