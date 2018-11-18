const db = require("../db");
const validator = require("validator");

const productsHandler = async (req, res, next) => {
  let productID = req.params.id;
  let product = await db.modelProduct.find(productID ? {id: productID} : {});
  if(product.length == 0){
    return res.status(404).send("Invalid ID");
  }
  else{
    return res.status(200).send(product[0]);
  }
}

module.exports = productsHandler;