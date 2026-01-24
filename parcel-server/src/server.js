const fs = require("fs");
const http = require("http");
const path = require("path");
const dotenv = require("dotenv");
const app = require("./app");

const envPath = path.resolve(__dirname, "../.env.local");

// console.log("ENV FILE EXISTS:", fs.existsSync(envPath));

dotenv.config({ path: envPath });


const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
