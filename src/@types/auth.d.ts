import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface IAccessToken extends Request {
  email: string | JwtPayload;
}

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
}

export interface IJwtPayload extends jwt.JwtPayload {
  email: string;
}
