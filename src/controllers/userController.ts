import { Request, Response } from "express";
import User from "../models/User";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const user = new User(req.body);

    try {
      await user.save();
      res.send("Usuario creado correctamente");
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }
}
