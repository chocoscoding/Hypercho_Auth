import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/Mongodb";
import logg from "./Logs/Customlog";
import SignupRouter from "./Routes/SignupRouter";
import LoginRouter from "./Routes/LoginRouter";
import ResetRouter from "./Routes/ResetRouter";

dotenv.config();
let rabbitconn = 4;
const PORT: number | string = process.env.PORT || 9980;
const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/signup", SignupRouter);
app.use("/login", LoginRouter);
app.use("/reset", ResetRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Welcome to the auth service</h1>");
});

const start = async () => {
  const MONGO_URI: any = process.env.MONGO_URI;
  try {
    await connectDB(MONGO_URI);
    rabbitconn = 1;
    app.listen(PORT, () => logg.info(`Running on http://localhost:${PORT} ⚡`));
  } catch (error) {
    logg.fatal(error);
  }
};

start();
