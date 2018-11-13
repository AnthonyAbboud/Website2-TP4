/**
 * 
 */

const router = require("./index");
const Cart = require("../lib/shopping-cart.js");

router.get("/api/shopping-cart", (req, res) => {
	  Cart.getCart(req.query).then((CartList) => {
		  	res.json(CartList);
	  }).catch((e)=>{
	  	res.status(400);
	  	res.send(e);
	  });
});

router.get("/api/shopping-cart/:id", (req, res) => {
	  let cartProductID = req.params.id;
	  Cart.getCartItem(cartProductID).then((cartItem) => {
	  	res.json(cartItem);
	  }).catch((e)=>{
	  	res.status(404);
	  	res.send(e);
	  });
});

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

