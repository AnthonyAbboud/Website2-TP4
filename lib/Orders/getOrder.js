const db = require("../db");
const validator = require("validator");

const ordersHandler = async (req, res, next) => {
	let orderID = req.params.id;
	let order = await db.modelOrder.find(orderID ? {id: orderID} : {});
	if(order.length == 0){
		return res.status(404).send("Invalid ID");
	}
	else{
		return res.status(200).send(order[0]);
	}
}

module.exports = ordersHandler;