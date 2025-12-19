import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./database/mongo.js";

import { authRouter } from "./routes/authRouter.js";
import { pacienteRouter } from "./routes/pacienteRouter.js";
import { visitaRouter } from "./routes/visitaRouter.js";
import { turnoRouter } from "./routes/turnoRouter";
import { rolRouter } from "./routes/rolRouter.js";
import { handleErrors } from "./middlewares/handleErrors";
import { extractJWT } from "./middlewares/validateJWT.js";
import { addUserToReq } from "./middlewares/addUserToReq";

const app = express();

const URI = process.env["MONGO_CONNECTION_URI"] || "";

await connectDB(URI);

app.use(cors({ origin: true, credentials: true })); // Enable CORS with credentials support
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
