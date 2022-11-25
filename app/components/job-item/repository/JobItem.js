const BaseRepository = require("../../Repository");
const Model = require("../model/JobItem");

class Repository extends BaseRepository {
  constructor() {
    super(Model);
  }
}

module.exports = new Repository();
