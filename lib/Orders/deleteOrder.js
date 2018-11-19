const db = require("../db");
const validator = require("validator");

const ordersHandler = async (req, res, next) => {
	let orderID = req.params.id;

	if(!isNaN(orderID)){
		if(validator.isInt(orderID)){
			let response = await db.modelOrder.deleteOne({id: orderID});
			if(response.deletedCount === 1){
			  return res.status(204).send(response);
			}
			else {
			  return res.status(404).send("ID doesn't exist in Database");
			}
		} else {
			return res.status(404).send("ID isnt a whole number");
		}
	}
	else{
		return res.status(404).send("Invalid ID");
	}
}

module.exports = ordersHandler;