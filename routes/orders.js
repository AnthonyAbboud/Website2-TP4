const router = require("./index");

const getOrders = require("../lib/Orders/getOrders");
const getOrder = require("../lib/Orders/getOrder");
const addOrder = require("../lib/Orders/addOrder");
const deleteOrder = require("../lib/Orders/deleteOrder");
const deleteOrders = require("../lib/Orders/deleteOrders");

router.get("/api/orders", getOrders);
router.get("/api/orders/:id", getOrder);
router.post("/api/orders/", addOrder);
router.delete("/api/orders/:id", deleteOrder);
router.delete("/api/orders/", deleteOrders);

module.exports = router;