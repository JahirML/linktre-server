import express, { Router } from "express";
import router from "./router";
import "dotenv/config";
import { connectDB } from "./config/db";
import cors from "cors";
import { corsconfig } from "./config/cors";

const app = express();

connectDB();

app.use(cors(corsconfig));

// Leer datos
app.use(express.json());

app.use("/", router);

export default app;
