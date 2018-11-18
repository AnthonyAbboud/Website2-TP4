const router = require("./index");

const getShoppingCart = require("../lib/ShoppingCart/getShoppingCart");
const getShoppingCartItem = require("../lib/ShoppingCart/getShoppingCartItem");
const addShoppingCartItem = require("../lib/ShoppingCart/addShoppingCartItem");
const updateShoppingCartItem = require("../lib/ShoppingCart/updateShoppingCartItem");
const deleteShoppingCartItem = require("../lib/ShoppingCart/deleteShoppingCartItem");
const emptyShoppingCart = require("../lib/ShoppingCart/emptyShoppingCart");

router.get("/api/shopping-cart", getShoppingCart);
router.get("/api/shopping-cart/:productId", getShoppingCartItem);
router.post("/api/shopping-cart", addShoppingCartItem);
router.put("/api/shopping-cart/:productId", addShoppingCartItem);
router.delete("/api/shopping-cart/:productId", deleteShoppingCartItem);
router.delete("/api/shopping-cart", emptyShoppingCart);

module.exports = router;