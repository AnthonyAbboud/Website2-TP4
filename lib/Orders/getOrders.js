const db = require("../db");
const validator = require("validator");

const ordersHandler = async (req, res, next) => {
	let ordersList = await db.modelOrder.find({});
	return res.status(200).send(ordersList);
}

module.exports = ordersHandler;