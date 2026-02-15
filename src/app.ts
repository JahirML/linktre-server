import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hola mundo express");
});
app.get("/ecommerce", (req, res) => {
  res.send("Este es el ecommerce");
});
app.get("/log", (req, res) => {
  res.send("Este es el blog");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Servidor funcionando", port);
});
