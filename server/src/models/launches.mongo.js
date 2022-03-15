const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LaunchSchema = new Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
  },
  customers: [String],
  upcoming: { type: Boolean, default: true },
  success: { type: Boolean, default: true },
});

const Launch = mongoose.model("Launch", LaunchSchema);

module.exports = Launch;
