import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { savingsRoute, authRoute } from "./routes";
import { corsOptions } from "./config";
import { verifyJWT } from "./middleware/verifyJWT";
import { credentials } from "./middleware/credentials";

const port = 3000;
const app: Express = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);

app.use(verifyJWT);
app.use("/api/v1/savings", savingsRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
