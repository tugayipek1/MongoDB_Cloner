const BaseRepository = require("../../Repository");
const Model = require("../model/Job");

class Repository extends BaseRepository {
  constructor() {
    super(Model);
  }
}

module.exports = new Repository();
