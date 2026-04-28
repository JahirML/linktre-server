import jwt, { JwtPayload } from "jsonwebtoken";

export const generateJWT = (payload: JwtPayload) => {
  console.log(payload);
  const secretWord = process.env.JWT_SECRET;
  if (!secretWord) {
    throw new Error("JWT word is not defined");
  }
  const token = jwt.sign(payload, secretWord, {
    expiresIn: "180d",
  });

  return token;
};
