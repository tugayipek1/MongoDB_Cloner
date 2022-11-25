const repo = require("../repository/Environment");
class Service {
  constructor() {}

  async findAll() {
    return repo.findAll();
  }
  async create(entity) {
    return repo.create(entity);
  }
  async deleteById(id) {
    return repo.deleteById(id);
  }
  async update(entity) {
    return repo.update(entity);
  }
}

module.exports = new Service();
