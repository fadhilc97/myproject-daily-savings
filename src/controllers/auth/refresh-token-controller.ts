import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../../config";
import { IJwtPayload, IUser } from "../../@types/auth";

const unauthorizedError = {
  status: "error",
  message: "Unauthorized",
  error: "unauthorized",
};

const forbiddenError = {
  status: "error",
  message: "Forbidden",
  error: "forbidden",
};

export const handleRefreshToken = async (
  request: Request,
  response: Response
) => {
  // cek apakah ada cookie 'jwt'
  const cookies = request.cookies;
  if (!cookies?.jwt) {
    return response.status(401).send(unauthorizedError);
  }

  // ambil refreshToken
  const refreshToken: string = cookies.jwt;

  // cari user berdasarkan refreshToken
  const result = await db.query(
    "SELECT * FROM users WHERE refresh_token = $1",
    [refreshToken]
  );
  const foundedUser: IUser = result.rows[0];
  if (result.rowCount <= 0) {
    return response.status(403).send(forbiddenError);
  }

  // verifikasi JWT refreshToken
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as IJwtPayload;
    if (foundedUser.email !== decoded.email) {
      return response.status(403).send(forbiddenError);
    }
    const accessToken = jwt.sign(
      { email: decoded.email },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "30s" }
    );
    return response.status(200).send({
      status: "ok",
      message: "Success",
      data: { accessToken },
    });
  } catch (error) {
    return response.status(403).send(forbiddenError);
  }
};
