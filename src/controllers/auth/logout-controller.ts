import { Request, Response } from "express";
import { db } from "../../config";
import { IUser } from "../../@types/auth";

export const handleLogout = async (request: Request, response: Response) => {
  // cek apakah refresh token ada di cookie
  const cookies = request.cookies;
  if (!cookies?.jwt) {
    return response.sendStatus(204);
  }
  const refreshToken = cookies.jwt;

  // cek apakah refresh token ada di DB
  const result = await db.query(
    "SELECT id FROM users WHERE refresh_token = $1 LIMIT 1",
    [refreshToken]
  );
  if (result.rowCount <= 0) {
    response.clearCookie("jwt", {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return response.sendStatus(204);
  }

  // hapus token di database
  try {
    const foundedUser: IUser = result.rows[0];
    await db.query("UPDATE users SET refresh_token = null WHERE id = $1", [
      foundedUser.id,
    ]);
  } catch (error) {
    return response.status(500).send({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }

  // hapus token di cookie
  response.clearCookie("jwt", {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  return response.sendStatus(204);
};
