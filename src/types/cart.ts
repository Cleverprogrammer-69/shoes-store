import { CartItem } from "./types";

export interface Cart {
  id: number;
  userId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}
