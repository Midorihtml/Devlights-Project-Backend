import "dotenv/config";
import app from "./app";

if (process.env["NODE_ENV"] === "development") {
  const PORT = process.env["PORT"] || 3000;
  const HOST = process.env["HOST"] || "localhost";
  const PROTOCOL = "http";

  app.listen(PORT, () => {
    console.log(`🚀 Server listening: ${PROTOCOL}://${HOST}:${PORT}`);
  });
}

export default app;
