import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "@src/database/mongo";

import { authRouter } from "@src/routes/authRouter";
import { pacienteRouter } from "@src/routes/pacienteRouter";
import { visitaRouter } from "@src/routes/visitaRouter";
import { turnoRouter } from "@src/routes/turnoRouter";
import { rolRouter } from "@src/routes/rolRouter";
import { handleErrors } from "@src/middlewares/handleErrors";
import { extractJWT } from "@src/middlewares/validateJWT";
import { addUserToReq } from "./middlewares/addUserToReq";

const app = express();

dotenv.config();

const URI = process.env["MONGO_CONNECTION_URI"] || "";

await connectDB(URI);

app.use(express.json());
app.use(morgan("tiny"));
app.use(extractJWT);
app.use(addUserToReq);

app.get("/", (_req, res) => {
  res.send("Hola");
});

app.use("/auth", authRouter);
app.use("/pacientes", pacienteRouter);
app.use("/visitas", visitaRouter);
app.use("/turnos", turnoRouter);
app.use("/roles", rolRouter);

app.use(handleErrors);

export default app;
