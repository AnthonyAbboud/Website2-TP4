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

router.get("/", (req, res) => {
  res.render("index", { title: "Accueil", cart: {count: updateCartNumber(req)}});
});

router.get("/index.html", (req, res) => {
  res.render("index", { title: "Accueil", cart: {count: updateCartNumber(req)}});
});

router.get("/products.html", (req, res) => {
  let category = req.query.category;
  let criteria = req.query.criteria;
  let productsList = getProducts(category, criteria);
  res.render("products", { title: "Produits", products: getProducts, cart: {count: updateCartNumber(req)}});
});

router.get("/products.html/:id", (req, res) => {
  res.render("product", { title: "Produit", product: getProduct, cart: {count: updateCartNumber(req)}});
});

router.get("/contact.html", (req, res) => {
  res.render("contact", { title: "Contact", cart: {count: updateCartNumber(req)}});
});

router.get("/shopping-cart.html", (req, res) => {
  res.render("shopping-cart", { title: "Panier", cart: {count: updateCartNumber(req)}});
});

router.get("/order.html", (req, res) => {
  res.render("order", { title: "Commande", cart: {count: updateCartNumber(req)}});
});

router.get("/confirmation.html", (req, res) => {
  res.render("confirmation", { title: "Confirmation", cart: {count: updateCartNumber(req)}});
});

module.exports = router;