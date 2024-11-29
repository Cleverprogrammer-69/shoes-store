
'use client'
import React, { useState } from "react";
import { useAppDispatch } from "@/lib/redux/store";
import { removeFromCart } from "@/lib/redux/features/shoes/shoesSlice";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Loader2 } from "lucide-react";

type RemoveItemProps = {
  productId: string;
};

export const RemoveHandlerCell: React.FC<RemoveItemProps> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false)

  const handleRemove = async() => {
    setLoading(true);
    console.log(productId)
    await dispatch(removeFromCart(productId));
    setLoading(false);
  };

  return (
    <Button
      onClick={handleRemove}
      variant={"outline"}
      className="p-2 text-red-500 hover:text-red-700 border-destructive"
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <X className="font-extrabold text-xl text-destructive" />
      )}
    </Button>
  );
};
