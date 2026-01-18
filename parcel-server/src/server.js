const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env.local")
});

const app = require('./app');

// console.log("PORT NO: ", process.env.PORT)
const PORT = process.env.PORT ||5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});