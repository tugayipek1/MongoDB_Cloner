const express = require("express");
const router = express.Router();

const EnvironmentService = require("../service/Job");

router.get("/", async (req, res) => {
  const results = await EnvironmentService.findAll();

  return res.json(results);
});

router.get("/:id", async (req, res) => {
  const results = await EnvironmentService.findById(req.params.id);

  return res.json(results);
});

module.exports = router;
