const express = require('express');
const sendParcelsRouter = require('./routes/SendParcelRoute/sendParcel.router.js');
const authRouter = require('./routes/Auth/auth.routes.js');
// const path = require('path')

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '..','public' )))

//Universal Testing Routes
app.get("/", (req, res) => {
  res.send(`Server is running on..`);
});

// Auth Router
app.use('/api/v1',authRouter);


app.use(sendParcelsRouter);


module.exports = app;