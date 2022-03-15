const express = require("express");
const checkError = require("../../middleware/checkError.middleware");
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require("./launches.controllers");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);

launchesRouter.post("/", checkError, httpAddNewLaunch);

launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
