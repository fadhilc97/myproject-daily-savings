import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../config";
import { IUser } from "../../@types/auth";

export const handleLogin = async (request: Request, response: Response) => {
  const { email, password }: IUser = request.body;

  const errorJson = {
    status: "error",
    message: "Login failed. Please try again.",
    error: "unauthorized",
  };

  // cari user berdasarkan email
  const result = await db.query(
    "SELECT id, email, password FROM users WHERE email = $1 LIMIT 1",
    [email]
  );

  if (result.rowCount == 0) {
    return response.status(401).send(errorJson);
  }

  // bandingkan password db dengan password dari user
  const foundedUser: IUser = result.rows[0];
  const isPasswordMatch = await bcrypt.compare(password, foundedUser.password);

  if (!isPasswordMatch) {
    return response.status(401).send(errorJson);
  }

  // buat JWT ketika pengecekan berhasil
  const jwtPayload: jwt.JwtPayload = {
    email: foundedUser.email,
    id: foundedUser.id,
  };
  const accessToken = jwt.sign(
    jwtPayload,
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "5m" }
  );

  const refreshToken = jwt.sign(
    jwtPayload,
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "10m" }
  );

  await db.query("UPDATE users SET refresh_token = $1 WHERE id = $2", [
    refreshToken,
    foundedUser.id,
  ]);

  response.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return response.status(200).send({
    status: "ok",
    message: "Login successful",
    data: { accessToken },
  });
};
