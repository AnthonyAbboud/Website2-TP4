const db = require("../db");
const validator = require("validator");

const shoppingCartHandler = (req, res, next) => {
	if(!req.session.shoppingCart){
		req.session.shoppingCart = [];
	}

	let index = req.session.shoppingCart.findIndex((product) =>{
		return product.productId == req.params.productId;
	});

	if(!index && index !== 0){
		return res.status(404).send("Item is not in shopping cart");
	}

	req.session.shoppingCart.splice(index, 1);
	return res.status(204).send("Item removed from shopping cart");

}

module.exports = shoppingCartHandler;