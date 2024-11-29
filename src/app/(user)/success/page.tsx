"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/container/Container";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Order, PopulatedCartItem } from "@/types/types";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { clearCart } from "@/lib/redux/features/shoes/shoesSlice";
import Link from "next/link";

export default function SuccessPage() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resData, setResData] = useState<Order | null>(null);
  const populatedCart = useAppSelector((state) => state.populatedCart);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const session_id = searchParams.get("session_id");

  useEffect(() => {
    let price: number = 0;
    // dispatch(fetchPopulatedCart)
    // console.log(populatedCart)
    populatedCart.forEach((item: PopulatedCartItem) => {
      console.log(item);
      price += item.subtotal;
      return price;
    });
    setTotalAmount(price);
  }, [populatedCart]);

  const handleSaveOrder = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/saveorder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            populatedCart,
            email: session?.user.email as string,
            id: session_id,
            totalAmount,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data?.success) {
        setResData(data.order);
        await dispatch(clearCart());
        setLoading(false);
      } else {
        throw new Error(data.error || "Failed to save order");
      }
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (session?.user && populatedCart?.length > 0) {
      handleSaveOrder();
    }
  }, [session?.user, populatedCart?.length]);

  const handleContinueShopping = () => {
    router.push("/product");
  };
  if (error) {
    return (
      <Container className="py-10 flex justify-center items-center bg-destructive text-destructive-foreground">
        {/* <Loader2 className="h-8 w-8 animate-spin" /> */}
        <p className="ml-4">
          An Error Occured while processing payment. please go back to your{" "}
          <Link
            href={"/cart"}
            className="p-2 underline text-primary rounded-lg"
          >
            Cart
          </Link>
        </p>
      </Container>
    );
  }
  if (loading) {
    return (
      <Container className="py-10 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-4">
          Payment is processing... please do not leave the page and do not press
          back button.
        </p>
      </Container>
    );
  }
  console.log(resData);
  return (
    <Container className="py-16">
      <div className="max-w-md mx-auto text-center">
        <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-500" />
        <h1 className="text-3xl font-bold mb-4">
          Thank You for Your Purchase!
        </h1>
        <p className="text-xl mb-6">
          Your order valued Rs {resData?.totalAmount} has been successfully
          placed.
        </p>
        {resData?.id && (
          <p className="text-lg mb-8">
            Order Number: <span className="font-semibold">{resData?.id}</span>
          </p>
        )}
        <Button onClick={handleContinueShopping} size="lg" className="w-full">
          Continue Shopping
        </Button>
      </div>
    </Container>
  );
}
