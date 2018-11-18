const db = require("../db");
const validator = require("validator");

const productsHandler = async (req, res, next) => {
  let body = req.body;

  if(isNaN(body.id) || isNaN(body.price) || validator.isEmpty(body.name) || validator.isEmpty(body.image) || validator.isEmpty(body.description)){return res.status(400).send("Empty string error!");}
  
  let possibleCategories = ['cameras', 'computers', 'consoles', 'screens'];
  if(possibleCategories.indexOf(body.category) === -1){return res.status(400).send("Invalid category!");}
  
  for(let i=0; i< body.features.length; i++){
    if(validator.isEmpty(body.features[i])){return res.status(400).send("Invalid characteristics!");}
  }

  let searchProduct = await db.modelProduct.find(body.id ? {id: body.id} : {});
  let productToAdd;
  if(searchProduct.length == 0){
    productToAdd = [{
      id: body.id,
      name: body.name,
      price: body.price,
      image: body.image,
      category: body.category,
      description: body.description,
      features: body.features
    }];
  }
  else {
    return res.status(400).send("ID already in use");
  }

  let response = await db.modelProduct.insertMany(productToAdd);
  return res.status(201).send(response);
}

module.exports = productsHandler;