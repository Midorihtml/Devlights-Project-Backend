import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import { connectDB } from "@src/database/mongo";
import { authRouter } from "@src/routes/authRouter";
import { handleErrors } from "@src/middlewares/handleErrors";
import { extractJWT } from "./middlewares/validateJWT";

const app = express();

dotenv.config();

const URI = process.env["MONGO_CONNECTION_URI"] || "";

await connectDB(URI);

app.use(express.json());
app.use(morgan("tiny"));
app.use(extractJWT);

app.get("/", (_req, res) => {
  res.send("Hola");
});
app.use("/auth", authRouter);

app.use(handleErrors);

export { app };
