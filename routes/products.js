const router = require("./index");
const Products = require("../lib/products");

router.get("/api/products", (req, res) => {
  Products.getProducts(req.query).then((productsList) => {
  	res.json(productsList);
  }).catch((e)=>{
  	res.status(400);
  	res.send(e);
  });
});

router.get("/api/products/:id", (req, res) => {
  let productID = req.params.id;
  Products.getProduct(productID).then((product) => {
  	res.json(product);
  }).catch((e)=>{
  	res.status(404);
  	res.send(e);
  });
});

router.post("/api/products", (req, res) => {
  Products.createProduct().then((response) => {
  	res.json(response);
  }).catch((e)=>{
  	res.status(400);
  	res.send(e);
  });
});

module.exports = router;