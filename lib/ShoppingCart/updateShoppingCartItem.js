const db = require("../db");
const validator = require("validator");

const shoppingCartHandler = (req, res, next) => {
	if(isNaN(req.params.productId) || isNaN(req.body.quantity)){
		return res.status(400).send("Invalid Id");
	}

	if(!req.session.shoppingCart){
		req.session.shoppingCart = [];
	}

	let product = req.session.shoppingCart.find((product) => {
		return product.productId == req.params.productId;
	});

	if(!product){
		return res.status(404).send("This item is not in the shopping cart");
	}

	req.session.shoppingCart.map((product) => {
		if(product.productId == req.params.productId){
			product.quantity = req.body.quantity;
		}
	});

	return res.status(204).send("Shopping cart updated");
}

module.exports = shoppingCartHandler;