const express = require("express");
const logsRoute = express.Router();
const {
    getLogs,
    deleteOrder,
} = require("../Controllers/logsController");

logsRoute.get("/logs", getLogs);
logsRoute.delete("/logs/:id",deleteOrder);


module.exports = logsRoute;