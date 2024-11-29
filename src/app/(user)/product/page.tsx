import { Container } from "@/components/container/Container";
import { ProductList } from "@/components/product/ProductList";
import React from "react";

export default function Page() {
  return (
    <Container>
      <h2 className="text-3xl font-bold text-center mb-8 pt-10">Our Products</h2>
      <ProductList />
    </Container>
  );
}
