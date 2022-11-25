module.exports = {
  DB_CONNECTION: process.env.DB_CONNECTION,
  PAGINATION_LIMIT: parseInt(process.env.PAGINATION_LIMIT || 1000),
};
