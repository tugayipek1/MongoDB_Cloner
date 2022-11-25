class Repository {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    return this.model.find();
  }

  async findById(entityId) {
    return this.model.findOne({ _id: entityId });
  }

  async findByName(name) {
    return this.findOne({ name });
  }

  async findBy(query, sort) {
    return this.model.find(query, null, sort);
  }

  async findOne(query) {
    return this.model.findOne(query);
  }

  async create(entity) {
    return this.model(entity).save();
  }

  async createMany(entities) {
    return this.model.insertMany(entities);
  }

  async update(json) {
    return await this.model.updateOne({ _id: json._id }, json);
  }

  async delete(entity) {
    return this.deleteById(entity._id);
  }

  async deleteById(entityId) {
    return this.model.deleteOne({ _id: entityId });
  }

  async deleteBy(query) {
    return this.model.deleteMany(query);
  }
}

module.exports = Repository;
