import * as jwt from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    email?: string;
    id?: number;
  }
}
