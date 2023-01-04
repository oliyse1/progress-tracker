const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const algoSchema = new Schema(
  {
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Algo = mongoose.model("Algo", algoSchema);

module.exports = Algo;
