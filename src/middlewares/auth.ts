import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    const error = new Error("No autorizado");
    return res.status(401).json({ error: error.message });
  }

  const [_, token] = bearer.split(" ");
  if (!token) {
    const error = new Error("No autorizado");
    return res.status(401).json({ error: error.message });
  }
  try {
    const secretKey = process.env.JWT_SECRET || "";
    const result = jwt.verify(token, secretKey);
    if (typeof result === "object" && result.id) {
      const user = await User.findById(result.id).select("-password");
      if (!user) {
        const error = new Error("El usuario no Existe");
        return res.status(401).json({ error: error.message });
      }
      //
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
