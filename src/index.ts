import express, { Express } from "express";
import { savingsRoute } from "./routes";

const port = 3000;
const app: Express = express();

app.use(express.json());
app.use("/", savingsRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
