import { getProductData } from "@/lib/getData";
import { ProductData } from "@/types/types";
import React from "react";
import { ProductCard } from "./ProductCard";
import { Container } from "../container/Container";
interface Props {
  items?: ProductData[];
}
export async function ProductList({ items }: Props) {
  const products: ProductData[] = items || (await getProductData());
  return (
    <section className="bg-background py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((item) => <ProductCard key={item?._id} item={item} />)}
        </div>
      </Container>
    </section>
  );
}
