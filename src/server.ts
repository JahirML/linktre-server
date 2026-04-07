import express, { Router } from "express";
import router from "./router";
import "dotenv/config";
import { connectDB } from "./config/db";

const app = express();

connectDB();
// Leer datos
app.use(express.json());

app.use("/", router);

export default app;
