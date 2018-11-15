const router = require("./index");
const Orders = require("../lib/orders");

router.get("/api/orders", (req, res) => {
  Orders.getOrders().then((ordersList) => {
  	res.json(ordersList);
  });
});

router.get("/api/orders/:id", (req, res) => {
  let orderID = req.params.id;
  Orders.getOrder(orderID).then((order) => {
    res.json(order);
  }).catch((e)=>{
    res.status(404);
    res.send(e);
  });
});

module.exports = router;