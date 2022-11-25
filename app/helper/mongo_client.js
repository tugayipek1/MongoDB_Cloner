const { DB_CONNECTION } = require("../config/index");
const mongoose = require("mongoose");
console.log(DB_CONNECTION);
module.exports = () => {
  mongoose.connect(DB_CONNECTION);

  mongoose.connection.on("open", () => {
    console.log("MongoDB: Connected");
  });
  mongoose.connection.on("error", (err) => {
    console.log("MongoDB: Error", err);
  });

  mongoose.Promise = global.Promise;
};
