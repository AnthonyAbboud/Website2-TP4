const db = require("../db");
const validator = require("validator");

const productsHandler = async (req, res, next) => {
  let response = await db.modelProduct.deleteMany({});
  res.status(204).send(response);
}

module.exports = productsHandler;