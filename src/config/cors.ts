import { CorsOptions } from "cors";

export const corsconfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
    }

    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por cors"));
    }
  },
};
