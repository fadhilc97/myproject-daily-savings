import { Request, Response } from "express";
import { db } from "../../config";

interface ISaving {
  date: Date;
  amount: number;
}

export const getSavings = async (request: Request, response: Response) => {
  const result = await db.query(
    "SELECT TO_CHAR(date, 'DD-MM-YYYY') AS date, TO_CHAR(amount, 'FM9,999,999.00') AS amount FROM savings ORDER BY date"
  );
  response.status(200).send({
    status: "ok",
    data: result.rows,
  });
};

export const getSavingsTotal = async (request: Request, response: Response) => {
  const result = await db.query(
    "SELECT TO_CHAR(SUM(amount), 'FM9,999,999.00') AS total FROM savings"
  );
  response.status(200).send({
    status: "ok",
    data: result.rows[0],
  });
};

export const createSavings = async (request: Request, response: Response) => {
  const { date, amount }: ISaving = request.body;
  const result = await db.query(
    "INSERT INTO savings (date, amount) VALUES ($1, $2)",
    [date, amount]
  );
  console.log(result);
  response.status(201).send({
    status: "created",
    message: "Savings created successful.",
  });
};
