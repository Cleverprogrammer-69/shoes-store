"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/container/Container";
import { CartItemRow, columns } from "./columns";
import { DataTable } from "./data-table";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { fetchAndPopulateCart } from "@/lib/redux/features/shoes/shoesSlice";
import { Loader2, Wallet } from "lucide-react"; // For loading spinner
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ResetCartButton } from "@/components/cart/ResetCartButton";
import { useSession } from "next-auth/react";
// import { auth } from "@/auth";

export default function CartPage() {
  const session = useSession();
  const dispatch = useAppDispatch();
  const populatedCart = useAppSelector((state) => state.populatedCart);
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      await dispatch(fetchAndPopulateCart());
      setLoading(false);
    };

    fetchCart();
  }, [dispatch]);

  if (loading) {
    return (
      <Container className="py-10 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-4">Loading cart...</p>
      </Container>
    );
  }
  const handleCheckout = async () => {
    // const session = await auth();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
      method: "POST",
      body: JSON.stringify({
        items: populatedCart,
        email: session?.data?.user.email,
      }),
    });
    const {url} = await res.json()
    if(url){
      window.location.href = url;
      return;
    }
  };

  const total = populatedCart.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {populatedCart.length > 0 ? (
        <>
          <DataTable columns={columns} data={populatedCart} />
          <div className="mt-6 flex flex-col space-y-3">
            <p className="text-lg font-semibold">Total: Rs {total}</p>
            <ResetCartButton />
            <Button
              variant={"default"}
              className="rounded-lg w-[200px] flex justify-center items-center"
              onClick={handleCheckout}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wallet />
              )}
              {loading ? "Proceeding..." : "Proceed to Checkout"}
            </Button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </Container>
  );
}
