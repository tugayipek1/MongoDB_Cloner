const express = require("express");
const router = express.Router();

const ClonerService = require("../service/Cloner");
const JobItemService = require("../../job-item/service/JobItem");

router.post("/", async (req, res) => {
  const cloner = await ClonerService.save(req.body);

  return res.json(cloner);
});

router.get("/get/:jobId", async (req, res) => {
  const cloner = await ClonerService.get(req.params.jobId);

  return res.json(cloner);
});

const EnvironmentService = require("../../environment/service/Environment");

router.get("/environment", (req, res) => {
  const results = EnvironmentService.findAll();

  return res.json(results);
});

router.get("/item/:jobId", (req, res) => {
  const results = JobItemService.get(req.params.jobId);
  return res.json(results);
});

module.exports = router;
