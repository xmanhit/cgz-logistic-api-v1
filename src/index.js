import express from "express";
import userRouter from "./routers/user.router.js";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cors from "cors";
import userController from "./controllers/user.controller.js";
import authorization from "./middlewares/authorization.middleware.js";

configDotenv();

mongoose.connect(process.env.DB_CONNECTION_STRING);

const db = mongoose.connection;
db.once("open", () => console.log("Connected successfully!"));

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);

app.post("/api/login", userController.login);
app.post("/api/register", userController.register);
app.post("/api/validate-token", userController.validateToken);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
