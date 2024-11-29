import {
  pgTable,
  text,
  timestamp,
  jsonb,
  serial,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const carts = pgTable("cart", {
  id: serial("id").primaryKey().notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  items: jsonb("items").notNull().default([]),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

export type CartItem = {
  productId: string;
  quantity: number;
};
