import { Banner } from "@/components/banner/Banner";
import { Container } from "@/components/container/Container";
import Image from "next/image";

export default function Home() {
  return (
   <Container className="py-10">
    <Banner />
   </Container>
  );
}
