import mongoose from "mongoose";

export const connectDB = async (URI: string) => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB conectado ✅");
  } catch (error) {
    console.error("Error de conexión:", error, " ❌");
    process.exit(1);
  }
};
