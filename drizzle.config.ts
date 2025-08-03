import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
