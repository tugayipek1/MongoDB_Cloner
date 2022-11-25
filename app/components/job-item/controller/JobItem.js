const express = require("express");
const router = express.Router();

const service = require("../service/JobItem");

router.get("/:jobId", async (req, res) => {
  const results = await service.findByJobId(req.params.jobId);

  return res.json(results);
});

module.exports = router;
