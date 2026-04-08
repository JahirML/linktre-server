import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const user = new User(req.body);
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      const error = new Error("This user already exists");
      return res.status(409).json({ error: error.message });
    }

    try {
      user.password = await hashPassword(password);
      await user.save();
      res.send("Usuario creado correctamente");
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }
}
