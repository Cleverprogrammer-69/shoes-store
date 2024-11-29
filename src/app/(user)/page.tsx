import { Banner } from "@/components/homePage/Banner";
import { Facilities } from "@/components/homePage/Facilities";
import { Container } from "@/components/container/Container";
import Image from "next/image";
import { ProductList } from "@/components/product/ProductList";

export default function Home() {
  return (
    <Container className="py-10">
      <Banner />
      <Facilities />

      <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
      <ProductList />
    </Container>
  );
}
