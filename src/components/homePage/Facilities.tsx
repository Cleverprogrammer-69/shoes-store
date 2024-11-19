import React from "react";
import { Container } from "../container/Container";
import { Truck, RotateCcw, ShieldCheck, HeadphonesIcon } from "lucide-react";

const facilities = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders above ₹5000",
  },
  {
    icon: RotateCcw,
    title: "14-Day Return",
    description: "Easy returns & exchanges",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure transactions",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Dedicated customer service",
  },
];

export const Facilities = () => {
  return (
    <section className="bg-background py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 transition-colors duration-300 group"
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                <facility.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {facility.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
