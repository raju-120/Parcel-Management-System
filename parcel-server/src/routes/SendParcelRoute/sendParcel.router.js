const express = require("express");
const { sendAllParcels } = require("./SendParcelsController/sendParcel.Controller.js");

const sendParcelsRouter = express.Router();

sendParcelsRouter.get('/send-parcels', sendAllParcels);

module.exports = sendParcelsRouter;