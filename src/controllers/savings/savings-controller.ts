import { Request, Response } from "express";
import { db } from "../../config";

interface ISaving {
  date: Date;
  amount: number;
}

export const getSavings = async (request: Request, response: Response) => {
  const result = await db.query(
    "SELECT date, sum(amount) AS amount FROM savings WHERE user_id = $1 GROUP BY date ORDER BY date",
    [request.user.id]
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
  try {
    await db.query(
      "INSERT INTO savings (date, amount, user_id) VALUES ($1, $2, $3)",
      [date, amount, request.user.id]
    );
    response.status(201).send({
      status: "created",
      message: "Savings created successful.",
    });
  } catch (error) {
    response.status(500).send({
      status: "error",
      message: "Unable to create savings data",
      error,
    });
  }
};
