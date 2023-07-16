import express, { Express, Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const port = 3000;
const app: Express = express();

app.use(express.json());

interface ISaving {
  date: Date;
  amount: number;
}

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: 5432,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const getSavings = async (request: Request, response: Response) => {
  const result = await pool.query(
    "SELECT TO_CHAR(date, 'DD-MM-YYYY') AS date, TO_CHAR(amount, 'FM9,999,999.00') AS amount FROM savings ORDER BY date"
  );
  response.status(200).send({
    status: "ok",
    data: result.rows,
  });
};

const getSavingsTotal = async (request: Request, response: Response) => {
  const result = await pool.query(
    "SELECT TO_CHAR(SUM(amount), 'FM9,999,999.00') AS total FROM savings"
  );
  response.status(200).send({
    status: "ok",
    data: result.rows[0],
  });
};

const createSavings = async (request: Request, response: Response) => {
  const { date, amount }: ISaving = request.body;
  const result = await pool.query(
    "INSERT INTO savings (date, amount) VALUES ($1, $2)",
    [date, amount]
  );
  console.log(result);
  response.status(201).send({
    status: "created",
    message: "Savings created successful.",
  });
};

app.get("/api/v1/savings", getSavings);
app.get("/api/v1/savings/total", getSavingsTotal);
app.post("/api/v1/savings", createSavings);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
