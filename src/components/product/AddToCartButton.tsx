"use client";

import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { ProductData } from "@/types/types";
import { twMerge } from "tailwind-merge";
import { useAppDispatch } from "@/lib/redux/store";
import { addProductToCart } from "@/lib/redux/features/shoes/shoesSlice";
import { toast } from "@/components/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useSession } from "next-auth/react";
import { Container } from "../container/Container";
import Link from "next/link";

interface AddToCartButtonProps {
  title: string;
  item: ProductData;
  className?: string;
}

export function AddToCartButton({
  title,
  item,
  className,
}: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      // const res = await fetchWithAuth(
      //   `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
      //   {
      //     method: "POST",
      //     body: {
      //       productId: productId,
      //     },
      //   }
      // );
      const res= await dispatch(addProductToCart(item)).unwrap(); 
      const data = await res;

      if (data.success) {
        
        toast({
          variant: "default",
          title: `${title} added to cart`,
          description: "Your item has been successfully added to the cart.",
          action: <ToastAction altText="Open cart" asChild><Link href={'/cart'}>Open cart</Link></ToastAction>,
          duration: 3000,
        });
      } else {
        throw new Error(data.error || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to add item to cart. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, title, item]);

  return (
    <Container className="px-0 py-0">
      <Button
        className={twMerge("w-full", className)}
        onClick={handleSubmit}
        disabled={isLoading || !session}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <ShoppingCart className="mr-2 h-4 w-4" />
        )}
        {isLoading ? "Adding to Cart..." : "Add to Cart"}
      </Button>
      {!session && (
        <div className="text-destructive text-xs font-bold py-5">
          Please{" "}
          <Link
            href={"/login"}
            className="text-blue-500 text-sm font-semibold border-blue-400 border-2 p-1 rounded-lg transition ease-in-out duration-500 hover:bg-background hover:border-primary"
          >
            Sign-in
          </Link>{" "}
          to proceed{" "}
        </div>
      )}
    </Container>
  );
}
