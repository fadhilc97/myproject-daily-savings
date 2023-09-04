import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { savingsRoute, authRoute } from "./routes";
import { verifyJWT } from "./middleware/verifyJWT";

const port = 3000;
const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/v1/auth", authRoute);

app.use(verifyJWT);
app.use("/api/v1/savings", savingsRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
