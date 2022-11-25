require("dotenv-flow").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = express.Router();
const path = require("path");

const app = express();
const port = 8080;

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/html/index.html"));
});

app.use(express.static("html"));
app.use("/api/cloner", require("./components/cloner/controller/Cloner"));
app.use(
  "/api/environment",
  require("./components/environment/controller/Environment")
);
app.use("/api/job", require("./components/job/controller/Job"));
app.use("/api/job-item", require("./components/job-item/controller/JobItem"));
app.use("/", router);

require("./helper/mongo_client")();

app.listen(port, () => {
  console.log("Cloner run on " + port);
});
