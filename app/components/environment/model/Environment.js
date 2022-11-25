const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    connection: { type: String, required: true },
    dbName: { type: String, required: true },
    description: { type: String, required: false },
  },
  { versionKey: false }
);

schema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Environment", schema);
