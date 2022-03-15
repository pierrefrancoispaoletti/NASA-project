if (process.env.NODE_ENV !== "production") require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("MongoDb connection opened");
});

mongoose.connection.on("error", (err) => {
  console.log(`error: ${err}`);
});

function mongoConnect() {
  mongoose.connect(process.env.MONGODB_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}
module.exports = {
  mongoConnect,
  mongoDisconnect,
};
