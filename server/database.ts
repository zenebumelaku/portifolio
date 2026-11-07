import { neon } from "@neondatabase/serverless";

export const getDatabase = () => {
  const connectionString =
    process.env.POSTGRES_URL || process.env.DATABASE_URL || "";
  if (!connectionString) {
    throw new Error(
      "Connect a Postgres database to Vercel and set POSTGRES_URL.",
    );
  }
  return neon(connectionString);
};
