const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const actionSchema = new Schema(
  {
    username: { type: String, required: true },
    client: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, required: true },
    startdate: { type: Date, required: true },
    enddate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Action = mongoose.model("Action", actionSchema);

module.exports = Action;
