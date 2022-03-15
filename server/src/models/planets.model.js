const path = require("path");
const fs = require("fs");
const { parse } = require("csv-parse");

const Planet = require("./planets.mongo");

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

const kepler_data = path.join(__dirname, "..", "..", "data", "kepler_data.csv");

const loadPlanetData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(kepler_data)
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          await savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetFound = (await getAllPlanets()).length;
        console.log(`${countPlanetFound} planet(s) found`);
        resolve();
      });
  });
};

async function getAllPlanets() {
  try {
    return await Planet.find({}, { __v: 0, _id: 0 });
  } catch (error) {
    console.log(error);
    throw new Error(
      "Il y à eu un probléme lors de la recupération des planetes"
    );
  }
}

async function savePlanet(planet) {
  try {
    await Planet.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      { upsert: true }
    );
  } catch (error) {
    console.error(`Could not save planet, ${error}`);
  }
}

module.exports = {
  loadPlanetData,
  getAllPlanets,
};
