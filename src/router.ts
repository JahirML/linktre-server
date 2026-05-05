import { authenticate } from "./middlewares/auth";
import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "./controllers/userController";
import { handleInputErrors } from "./middlewares/validation";

const router = Router();

// AUTH and register
router.post(
  "/auth/register",
  body("name").notEmpty().withMessage("Name is required"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("handle").notEmpty().withMessage("Handle is required"),
  handleInputErrors,
  UserController.createUser,
);

router.post(
  "/auth/login",
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password").notEmpty().withMessage("Password is required"),

  handleInputErrors,
  UserController.login,
);

// router.use("/:userId", authenticate);
router.get("/user", authenticate, UserController.getUser);

export default router;
