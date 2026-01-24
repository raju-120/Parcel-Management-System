const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: ".env.local" });

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

const server = http.createServer(app);

async function startServer() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
}

startServer();
