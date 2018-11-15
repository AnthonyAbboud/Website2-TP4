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
  Products.createProduct(req.body).then((response) => {
    res.status(201);
    res.send();
  }).catch((e)=>{
  	res.status(400);
  	res.send(e);
  });
});

router.delete("/api/products/:id", (req, res) => {
  let productID = req.params.id;
  Products.deleteProduct(productID).then((response) => {
    if(response.deletedCount == 1){
      res.status(204);
    }
    else{
      res.status(404);
    }
    res.send();
  }).catch((e)=>{
    res.status(404);
    res.send(e);
  });
});

router.delete("/api/products", (req, res) => {
  Products.clearProducts().then((response) => {
    res.status(204);
    res.send();
  });
});

module.exports = router;