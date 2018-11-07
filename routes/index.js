const express = require("express");
const router = express.Router();
const Products = require("../lib/products");

router.get("/", (req, res) => {
  res.render("index", { title: "Accueil", message: "Ça semble fonctionner!" });
});

router.get("/index.html", (req, res) => {
  res.render("index", { title: "Accueil", message: "Ça semble fonctionner!" });
});

router.get("/products.html", (req, res) => {
  res.render("products", { title: "Produits", message: "Ça semble fonctionner!" });
});

router.get("/product.html", (req, res) => {
  res.render("product", { title: "Produit", message: "Ça semble fonctionner!" });
});

router.get("/contact.html", (req, res) => {
  res.render("contact", { title: "Contact", message: "Ça semble fonctionner!" });
});

router.get("/shopping-cart.html", (req, res) => {
  res.render("shopping-cart", { title: "Panier", message: "Ça semble fonctionner!" });
});

router.get("/order.html", (req, res) => {
  res.render("order", { title: "Commande", message: "Ça semble fonctionner!" });
});

router.get("/confirmation.html", (req, res) => {
  res.render("confirmation", { title: "Confirmation", message: "Ça semble fonctionner!" });
});

router.get("/api/products", (req, res) => {
  Products.getProducts(req.query).then((productsList) => {
  	res.json(productsList);
  }).catch((e)=>{
  	res.status(400);
  	res.send(e);
  });
});

module.exports = router;