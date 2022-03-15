const express = require("express");

const launchesRouter = require("./launches/launches.router");
const planetsRouter = require("./planets/planets.router");

const apiRouter = express.Router();

apiRouter.use("/planets", planetsRouter);
apiRouter.use("/launches", launchesRouter);

module.exports = apiRouter;
