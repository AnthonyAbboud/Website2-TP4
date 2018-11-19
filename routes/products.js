const router = require("./index");

const getProducts = require("../lib/Products/getProducts");
const getProduct = require("../lib/Products/getProduct");
const addProduct = require("../lib/Products/addProduct");
const deleteProduct = require("../lib/Products/deleteProduct");
const deleteProducts = require("../lib/Products/deleteProducts");

router.get("/api/products", getProducts);
router.get("/api/products/:id", getProduct);
router.post("/api/products/", addProduct);
router.delete("/api/products/:id", deleteProduct);
router.delete("/api/products/", deleteProducts);

module.exports = router;