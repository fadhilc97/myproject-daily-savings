import dotenv from "dotenv";
dotenv.config();

export { default as db } from "./db-config";
export { default as corsOptions } from "./cors-options";
export { default as allowedOrigins } from "./allowed-origins";
