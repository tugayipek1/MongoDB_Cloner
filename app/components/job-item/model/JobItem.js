const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    collectionName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      enum: ["info", "error"],
      default: "info",
      required: true,
    },
    job: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Job",
      autopopulate: false,
    },
  },
  { versionKey: false }
);
schema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("JobItem", schema);
