import { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import slugify from "slugify";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const user = new User(req.body);
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      const error = new Error("This user already exists");
      return res.status(409).json({ error: error.message });
    }
    const handle = slugify(req.body.handle, "");
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
      const error = new Error("This handle is already taken");
      return res.status(409).json({ error: error.message });
    }

    try {
      user.password = await hashPassword(password);
      user.handle = handle;
      await user.save();
      res.send("Usuario creado correctamente");
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      const error = new Error("This user does not exist");
      return res.status(404).json({ error: error.message });
    }
    const isPasswordCorrect = await checkPassword(password, userExist.password);
    if (!isPasswordCorrect) {
      const error = new Error("The password is incorrect");
      return res.status(401).json({ error: error.message });
    }

    res.send("Login succesfully");
  }
}
