import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { IAccessToken } from "../@types/auth";

export const verifyJWT = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers["authorization"];
  if (!authHeader) {
    return response.status(401).send({
      status: "error",
      message: "Authentication failed.",
      error: "unauthorized",
    });
  }

  // "Bearer {token}" => ["Bearer", {token}]

  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (error, decoded) => {
      if (error) {
        return response.status(403).send({
          status: "error",
          message: "Unable to access resource",
          error: "forbidden",
        });
      }
      // request.email = decoded.email; // TODO: How to fix ?
      next();
    }
  );
};
