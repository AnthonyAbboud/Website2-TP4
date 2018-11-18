const db = require("../db");
const validator = require("validator");

const productsHandler = async (req, res, next) => {
  let productID = req.params.id;

  if(validator.isInt(productID)){
    let response = await db.modelProduct.deleteOne({id: productID});
    if(response.deletedCount === 1){
      res.status(204).send(response);
    }
    else {
      res.status(404).send("ID doesn't exist in Database");
    }
  }
  else{
    res.status(404).send("Invalid ID");
  }
}

module.exports = productsHandler;