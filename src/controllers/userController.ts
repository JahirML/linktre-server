import { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import slugify from "slugify";
import { generateJWT } from "../utils/jwt";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const user = new User(req.body);
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      const error = new Error("Este usuario ya esta registrado");
      return res.status(409).json({ error: error.message });
    }
    const handle = slugify(req.body.handle, "");
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
      const error = new Error("Este handle ya esta en uso");
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

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("El usuario no existe");
      return res.status(404).json({ error: error.message });
    }
    const isPasswordCorrect = await checkPassword(password, user.password);
    if (!isPasswordCorrect) {
      const error = new Error("Contraseña incorrecta");
      return res.status(401).json({ error: error.message });
    }

    const token = generateJWT({ id: user._id });
    res.send(token);
  }

  static async getUser(req: Request, res: Response) {
    const user = req.user;
    res.status(200).json(user);
  }
}
