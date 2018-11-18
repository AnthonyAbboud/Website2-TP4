const db = require("../db");
const validator = require("validator");

const shoppingCartHandler = (req, res, next) => {
	if(!req.session.shoppingCart){
		return res.status(404).send("Nothing in shopping cart");
	}

	let product = req.session.shoppingCart.find((product) => {
		if(product.productId == req.params.productId) {
			return product;
		}
	});

	if(!product){
		return res.status(404).send("Product not found in shopping cart");
	}

	return res.status(200).send(product);
}

module.exports = shoppingCartHandler;