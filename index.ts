import express, { Express, Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const port = 3000;
const app: Express = express();

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: 5432,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const getSavings = async (request: Request, response: Response) => {
  const result = await pool.query(
    "SELECT TO_CHAR(date, 'DD-MM-YYYY') as date, TO_CHAR(amount, 'FM9,999,999.00') as amount FROM savings"
  );
  response.status(200).send(result.rows);
};

app.get("/savings", getSavings);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
