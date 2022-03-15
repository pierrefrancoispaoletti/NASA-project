require("dotenv").config();
const http = require("http");
const app = require("./app");
const { mongoConnect } = require("../database/database");
const { loadPlanetData } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const startServer = async () => {
  mongoConnect();
  await loadPlanetData();
  await loadLaunchData();
  server.listen(PORT, () => console.log(`server running on port ${PORT}`));
};

startServer();
