const shoppingCartHandler = (req, res, next) => {
	if(!req.session.shoppingCart) {
		req.session.shoppingCart = [];
	}
	return res.status(200).send(req.session.shoppingCart);
}

module.exports = shoppingCartHandler;