"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
// import { useAppDispatch } from "@/lib/redux/store";
// import {
//   removeProductFromCart,
//   increaseQuantity,
//   decreaseQuantity,
// } from "@/lib/redux/features/shoes/shoesSlice";
import { QuantityHandlerCell } from "@/components/cart/QuantityHandlerCell";
import { RemoveHandlerCell } from "@/components/cart/RemoveHandlerCell";

export type CartItemRow = {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
};
export const columns: ColumnDef<CartItemRow>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        {" "}
        {/* Added spacing */}
        <RemoveHandlerCell productId={row.original._id} />
        <Image
          src={row.original.image}
          alt={row.original.name}
          className="h-12 w-12 object-cover"
          width={100}
          height={100}
        />
        <div>
          <span className="block font-bold">{row.original.name}</span>
          <div className="lg:hidden text-sm mt-1">
            {" "}
            {/* Added margin */}
            Price: Rs{row.original.price} | Subtotal: Rs
            {(row.original.price * row.original.quantity)}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => <span className="ml-10">Quantity</span>,
    cell: ({ row }) => (
      <div className="mt-4 ml-10">
        {" "}
        {/* Added margin to separate from product column */}
        <QuantityHandlerCell productId={row.original._id} />
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <span className="hidden lg:block">Price</span>,
    cell: ({ row }) => (
      <span className="hidden lg:block">Rs{" "}{row.original.price.toFixed(2)}</span>
    ),
  },
  {
    accessorKey: "subtotal",
    header: () => <span className="hidden lg:block">Subtotal</span>,
    cell: ({ row }) => {
      const { price, quantity } = row.original;
      return (
        <span className="hidden lg:block">
          Rs{" "}{(price * quantity)}
        </span>
      );
    },
  },
];

