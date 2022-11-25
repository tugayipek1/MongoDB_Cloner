const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    at: { type: Date, required: true },
    end: { type: Date, required: false },
    status: {
      type: String,
      enum: ["running", "done"],
      required: true,
      default: "running",
    },
    anyError: {
      type: Boolean,
      required: true,
      default: false,
    },

    sourceEnvironment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Environment",
      autopopulate: true,
    },
    targetEnvironment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Environment",
      autopopulate: true,
    },
  },
  { versionKey: false }
);
schema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Job", schema);
