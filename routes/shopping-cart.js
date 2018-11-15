/**
 * 
 */

const router = require("./index");
const ShoppingCart = require("../lib/shopping-cart.js");

router.get("/api/shopping-cart", (req, res) => {
	ShoppingCart.getCart().then((response) => {
		res.json(response);
	});
});

router.get("/api/shopping-cart/:productId", (req, res) => {
	let productID = req.params.productId;
	ShoppingCart.getProductFromCart(productID).then((response) => {
		res.json(response);
	}).catch((e)=>{
		res.status(404);
		res.send(e);
	});
});

router.post("/api/shopping-cart/", (req, res) => {
	ShoppingCart.addToCart(req.body).then((response) => {
	    res.status(201);
	    res.send();
	}).catch((e)=>{
		res.status(400);
		res.send(e);
	});
}); 

router.put("/api/shopping-cart/:productId", (req, res) => {
	let productID = req.params.productId;
	let productInfo = {productId: productID, productQuantity: req.body.quantity};
	ShoppingCart.updateCartItem(productInfo).then((response) => {
	    res.status(204);
	    res.send();
	}).catch((e)=>{
		res.status(400);
		res.send(e);
	});
});

router.delete("/api/shopping-cart/:productId", (req, res) => {
	let productID = req.params.productId;
	ShoppingCart.deleteItemFromCart(productID).then((response) => {
	    res.status(204);
	    res.send();
	}).catch((e)=>{
		res.status(400);
		res.send(e);
	});
}); 	

router.delete("/api/shopping-cart/", (req, res) => {
	ShoppingCart.clearCart().then((response) => {
	    res.status(204);
	    res.send();
	});
});


module.exports = router;
/*
router.get("/api/shopping-cart/:id", (req, res) => {
	  let cartProductID = req.params.id;
	  ShoppingCart.getCartItem(cartProductID).then((cartItem) => {
	  	res.json(cartItem);
	  }).catch((e)=>{
	  	res.status(404);
	  	res.send(e);
	  });
});*/

/*router.post("/api/shopping-cart", (req, res) => {
	  Cart.addCartItem().then((response) => {
		  res.status(201);
	  	res.json(response);
	  }).catch((e)=>{
	  	res.status(400);
	  	res.send(e);
	  });
});

router.put("/api/shopping-cart/:id", (req, res) => {
	Cart.putCartItem().then( () =>{
		
	})
});*/

