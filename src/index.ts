import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import morgan from "morgan";
import { authRouter } from "./routes/authRouter.ts";
import { connectDB } from "./database/mongo.ts";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const PROTOCOL = process.env.NODE_ENV === "production" ? "https" : "http";
const URI = process.env.MONGO_CONNECTION_URI || "";

await connectDB(URI);

app.use(express.json());
app.use(morgan("tiny"));

app.use("/auth", authRouter);

app.use(
  (
    { message, context }: { message: string; context: object },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(message, "\n");
    console.table(context);
    console.log("-".repeat(20), "\n");
    next();
  }
);

app.listen(PORT, () => {
  console.log(`🚀 Server listening: ${PROTOCOL}://${HOST}:${PORT}`);
});
