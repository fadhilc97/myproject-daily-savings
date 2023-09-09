import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../../config";
import { IRegister } from "../../@types/auth";

export const handleRegister = async (request: Request, response: Response) => {
  // terima data dari user berupa fullName, email dan password
  const { fullName, email, password, password2 }: IRegister = request.body;

  // cek apakah password dan konfirmasinya benar
  if (password !== password2) {
    return response.status(400).send({
      status: "error",
      message: "Password confirmation is not match.",
    });
  }

  // cek apakah user ada di database
  const result = await db.query(
    "SELECT id FROM users WHERE email = $1 LIMIT 1",
    [email]
  );

  if (result.rowCount >= 1) {
    return response.status(409).send({
      status: "error",
      message: "User already exists. Please use another email.",
    });
  }

  try {
    // enkripsi password terlebih dahulu
    const encryptedPassword = await bcrypt.hash(password, 10);

    // buat user baru jika belum pernah dibuat sebelumnya
    await db.query(
      "INSERT INTO users (fullName, email, password) VALUES ($1, $2, $3)",
      [fullName, email, encryptedPassword]
    );

    return response.status(201).send({
      status: "created",
      message: "Registration Successful",
    });
  } catch (error) {
    return response.status(500).send({
      status: "error",
      message: "Unable to register",
      error,
    });
  }
};
