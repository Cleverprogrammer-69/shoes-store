"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import {
  updateCartItemQuantity,
  removeFromCart,
} from "@/lib/redux/features/shoes/shoesSlice";
import { toast } from "../hooks/use-toast";
import { Loader2 } from "lucide-react"; // Loader component

type QuantityProps = {
  productId: string;
};

export const QuantityHandlerCell: React.FC<QuantityProps> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) =>
    state.populatedCart.find((item) => item._id === productId)
  );

  const [localQuantity, setLocalQuantity] = useState(cartItem?.quantity || 0);
  const [loadingIncrease, setLoadingIncrease] = useState(false); // Loading for Increase button
  const [loadingDecrease, setLoadingDecrease] = useState(false); // Loading for Decrease button

  // Sync local quantity with the Redux state
  useEffect(() => {
    setLocalQuantity(cartItem?.quantity || 0);
  }, [cartItem?.quantity]);

  const handleQuantityChange = async (
    newQuantity: number,
    actionType: "increase" | "decrease"
  ) => {
    
    if (actionType === "increase") setLoadingIncrease(true);
    if (actionType === "decrease") setLoadingDecrease(true);

    try {
      if (newQuantity > 0) {
        await dispatch(
          updateCartItemQuantity({ productId, quantity: newQuantity })
        )
        toast({
          title: "Updated",
          duration: 700,
        });
      } else {
        await dispatch(removeFromCart(productId))
        toast({
          title: "Updated",
          duration: 700,
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Failed to update quantity",
        duration: 700,
      });
    } finally {
      setLoadingIncrease(false);
      setLoadingDecrease(false);
      setLocalQuantity(newQuantity);
    }
  };

  const handleIncrease = async() => {
    await handleQuantityChange(localQuantity + 1, "increase");
  };

  const handleDecrease = async() => {
    if(localQuantity >1){
      await handleQuantityChange(localQuantity - 1, "decrease");
    } else {
      await handleQuantityChange(0, "decrease");
    }
    
  };

  if (!cartItem) return null;

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleDecrease}
        className="px-2 py-1 border border-gray-300 rounded-md flex items-center justify-center"
        disabled={loadingDecrease || localQuantity <= 1}
      >
        {loadingDecrease ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "-"
        )}
      </button>
      <span>{localQuantity}</span>
      <button
        onClick={handleIncrease}
        className="px-2 py-1 border border-gray-300 rounded-md flex items-center justify-center"
        disabled={loadingIncrease}
      >
        {loadingIncrease ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "+"
        )}
      </button>
    </div>
  );
};
