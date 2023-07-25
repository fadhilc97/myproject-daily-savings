import { Request, Response } from "express";
import { db } from "../../config";

interface ISaving {
  date: Date;
  amount: number;
}

export const getSavings = async (request: Request, response: Response) => {
  const result = await db.query(
    "SELECT id, date, amount AS amount FROM savings ORDER BY date"
  );
  response.status(200).send({
    status: "ok",
    data: result.rows,
  });
};

export const getSavingsTotal = async (request: Request, response: Response) => {
  const result = await db.query("SELECT SUM(amount) AS total FROM savings");
  response.status(200).send({
    status: "ok",
    data: { total: parseInt(result.rows[0].total) },
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
