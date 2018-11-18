const db = require("../db");
const validator = require("validator");

const shoppingCartHandler = async (req, res, next) => {
	const {productId, quantity} = req.body;
	if(isNaN(req.body.quantity)){
		return res.status(400).send("Invalid quantity");
	}

	let product;

	try {
		product = await ProductService.getProduct(req.body.productId);
	} catch(e) {
		next(e);
	}

	if(product){
		for(let cartItem in req.session.cart){
			if(cartItem.productId == req.body.productId){
				return res.sendStatus(400).send("Item is already in cart");
			}
		}

		req.session.cart.items.push({productId, quantity});
		return res.status(201).send("Item added to shopping cart");

	} else {
		return res.status(400).send("Product doesn't exist");
	}
}

module.exports = shoppingCartHandler;