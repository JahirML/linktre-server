import colors from "colors";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
      throw new Error("DATABASE_URL no está definida");
    }
    const { connection } = await mongoose.connect(dbUrl);
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.cyan.bold(`Mongo db conectado en ${url}`));
  } catch (error) {
    if (error instanceof Error)
      console.log(colors.bgRed.white.bold(error.message));
    process.exit(1);
  }
};
