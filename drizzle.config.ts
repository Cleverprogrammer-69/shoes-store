import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: [
    "./src/db/schema/users.ts",
    "./src/db/schema/carts.ts",
    "./src/db/schema/orders.ts",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.AUTH_DRIZZLE_URL as string,
  },
});
