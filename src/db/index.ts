import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.AUTH_DRIZZLE_URL;

if (!process.env.AUTH_DRIZZLE_URL) {
  throw new Error("DATABASE_URL is not defined");
}
// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString as string, { prepare: false });
export const db = drizzle(client);
