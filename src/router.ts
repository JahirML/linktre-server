import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "./controllers/userController";

const router = Router();

// auth
router.get("/", (req, res) => {
  res.send("Hola mundo express");
});

// AUTH and register
router.post(
  "/auth/register",
  body("name").notEmpty().withMessage("El nombre es requerido"),
  UserController.createUser,
);

router.get("/blog", (req, res) => {
  res.send("Hola blog");
});
export default router;
