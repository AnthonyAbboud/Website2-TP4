const db = require("../db");
const validator = require("validator");

const productsHandler = async (req, res, next) => {
  query = req.query;
  let sortingType = {};
  // Verifies first if query has a category attribute, and then verifies if this category only has Ascii characters
  if(query.category && validator.isAscii(query.category)) {
    let categories = ['cameras', 'computers', 'consoles', 'screens'];
    if(categories.indexOf(query.category) === -1) {
      return res.status(400).send("Category error");

    }
    // Creating a category attribute for sortingType
    sortingType.category = query.category;
  }

  // Verifies if query has a criteria attribute.
  if(query.criteria) {
    let criterias = ['alpha-asc', 'alpha-dsc', 'price-asc', 'price-dsc'];
    if(criterias.indexOf(query.criteria) == -1) {
      return res.status(400).send("Criteria error");

    }
    else{
      // Create a criteria attribute for sortingType
      sortingType.criteria = query.criteria;
    }
  }
  else {
    // Default criteria if none specified
    sortingType.criteria = 'price-asc';
  }

  // Returns all or some products depending on the category attribute (if none specified, returns all the products)
  let productsList = await db.modelProduct.find(sortingType.category ? {category: sortingType.category} : {});

  productsList.sort((itemA, itemB) => {
    switch(sortingType.criteria){
      case 'alpha-asc':
        if(itemA.name.toLowerCase() < itemB.name.toLowerCase()){return -1;}
        if(itemA.name.toLowerCase() > itemB.name.toLowerCase()){return 1;}
        return 0;
        break;
      case 'alpha-dsc':
        if(itemA.name.toLowerCase() < itemB.name.toLowerCase()){return 1;}
        if(itemA.name.toLowerCase() > itemB.name.toLowerCase()){return -1;}
        return 0;
        break;
      case 'price-asc':
        return (itemA.price - itemB.price);
        break;
      case 'price-dsc':
        return (itemB.price - itemA.price);
        break;
      default:
        return (itemA.price - itemB.price);
    }
  });

  return res.status(200).send(productsList);
}

module.exports = productsHandler;