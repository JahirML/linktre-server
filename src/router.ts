import { Router } from "express";

const router = Router();

// auth
router.get("/", (req, res) => {
  res.send("Hola mundo express");
});

// AUTH and register
router.post("/auth/register", (req, res) => {
  res.json({ data: "huebos" });
  console.log(req.body);
});

router.get("/blog", (req, res) => {
  res.send("Hola blog");
});
export default router;
