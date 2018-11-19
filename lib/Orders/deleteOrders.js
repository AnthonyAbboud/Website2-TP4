const db = require("../db");
const validator = require("validator");

const ordersHandler = async (req, res, next) => {
	let response = await db.modelOrder.deleteMany({});
	res.status(204).send(response);
}

module.exports = ordersHandler;