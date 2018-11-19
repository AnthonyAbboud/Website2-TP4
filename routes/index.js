const express = require("express");
const router = express.Router();
const getProducts = require("../lib/Products/getProducts");
const getProduct = require("../lib/Products/getProduct");

const updateCartNumber = (req) => {
	if(!req.session.shoppingCart){
		return 0;
	}
	let res = 0;
	for(let i = 0; i < req.session.shoppingCart.length; i++){
		res += req.session.shoppingCart[i].quantity;
	}
	return res;
}
console.log();
router.get("/", (req, res) => {
  res.render("index", { title: "Accueil", cart: {count: updateCartNumber(req)}});
});

router.get("/index", (req, res) => {
  res.render("index", { title: "Accueil", cart: {count: updateCartNumber(req)}});
});

router.get("/products.html", (req, res) => {
  res.render("products", { title: "Produits", products: getProducts, cart: {count: updateCartNumber(req)}});
});

router.get("/products/:id", (req, res) => {
  res.render("products", { title: "Produit", product: getProduct, cart: {count: updateCartNumber(req)} });
});

router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact", message: "Ça semble fonctionner!" });
});

router.get("/shopping-cart", (req, res) => {
  res.render("shopping-cart", { title: "Panier", message: "Ça semble fonctionner!" });
});

router.get("/order", (req, res) => {
  res.render("order", { title: "Commande", message: "Ça semble fonctionner!" });
});

router.get("/confirmation", (req, res) => {
  res.render("confirmation", { title: "Confirmation", message: "Ça semble fonctionner!" });
});

module.exports = router;