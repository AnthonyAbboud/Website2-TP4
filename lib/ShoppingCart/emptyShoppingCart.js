const db = require("../db");
const validator = require("validator");

const shoppingCartHandler = (req, res, next) => {
	req.session.shoppingCart = [];
	res.status(204).send("Shopping cart emptied");
}

module.exports = shoppingCartHandler;