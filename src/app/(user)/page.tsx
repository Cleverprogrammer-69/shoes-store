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
    <ProductList />
   </Container>
  );
}
