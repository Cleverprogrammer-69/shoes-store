import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}
export const Container = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge("container mx-auto px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </div>
  );
};
