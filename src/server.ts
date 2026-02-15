import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hola mundo express");
});

export default app;
