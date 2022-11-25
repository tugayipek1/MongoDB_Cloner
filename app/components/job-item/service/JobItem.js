const repo = require("../repository/JobItem");

class Service {
  constructor() {}

  async findByJobId(jobId) {
    return repo.findBy({ job: jobId });
  }

  async findById(id) {
    return repo.findOne({ id });
  }
  async create(entity) {
    return repo.create(entity);
  }
}

module.exports = new Service();
