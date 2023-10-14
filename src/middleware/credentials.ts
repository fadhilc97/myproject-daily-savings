import { Request, Response, NextFunction } from "express";
import { allowedOrigins } from "../config/";

export const credentials = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const origin = request.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    response.header("Access-Control-Allow-Credentials", "true");
  }
  next();
};
