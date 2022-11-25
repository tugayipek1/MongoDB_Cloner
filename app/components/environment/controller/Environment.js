const express = require("express");
const router = express.Router();

const EnvironmentService = require("../service/Environment");

router.get("/", async (req, res) => {
  const results = await EnvironmentService.findAll();

  return res.json(results);
});

router.post("/", async (req, res) => {
  const results = await EnvironmentService.create(req.body);

  return res.json(results);
});

router.delete("/:id", async (req, res) => {
  const results = await EnvironmentService.deleteById(req.params.id);

  return res.json(results);
});

router.put("/", async (req, res) => {
  const results = await EnvironmentService.update(req.body);

  return res.json(results);
});

module.exports = router;
