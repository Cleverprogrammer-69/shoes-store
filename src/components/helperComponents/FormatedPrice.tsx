import React from "react";
import { twMerge } from "tailwind-merge";
interface Props {
  amount: number;
  className?: string;
}
export const FormatedPrice = ({ amount, className }: Props) => {
  const formatedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PKR",
  }).format(amount);
  return (
    <span className={twMerge("text-2xl font-bold text-primary", className)}>
      {formatedAmount}
    </span>
  );
};
