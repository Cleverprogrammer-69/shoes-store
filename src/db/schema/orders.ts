import {
  pgTable,
  text,
  timestamp,
  jsonb,
  serial,
  decimal,
} from "drizzle-orm/pg-core";
import { users } from "./users";


export const orders = pgTable("order", {
  id: serial("id").primaryKey().notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  sessionId: text("sessionId").notNull(),
  items: jsonb("items").notNull(),
  totalAmount: decimal("totalAmount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

export type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
  name: string;
};
