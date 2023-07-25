import express, { Express } from "express";
import cors from "cors";
import { savingsRoute } from "./routes";

const port = 3000;
const app: Express = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use("/", savingsRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
