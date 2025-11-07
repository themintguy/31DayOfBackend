import { Pool } from "pg";

// testing
console.log(" DB password loaded?", process.env.DB_PASSWORD ? "yes" : "no");


export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .connect()
  .then(() => console.log(" Connected to PostgreSQL"))
  .catch((err) => console.error("Database connection error:", err));