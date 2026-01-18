const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


// app.use('/api/v1',);

app.get("/", (req, res) => {
  res.send(`🚀 Parcel Server is running `);
});

module.exports = app;