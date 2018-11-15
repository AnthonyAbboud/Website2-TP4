"use strict";

const db = require("./db");
const validator = require("validator");

const Products = {

  clearProducts: async () => {
    return await db.modelProduct.deleteMany({});
  },

  createProduct: async (body) => {
    if(validator.isEmpty(body.name) || validator.isEmpty(body.image) || validator.isEmpty(body.description)){throw("Empty string error!");}
    let possibleCategories = ['cameras', 'computers', 'consoles', 'screens'];
    if(possibleCategories.indexOf(body.category) === -1){throw("Invalid category!");}
    for(let i=0; i< body.features.length; i++){
      if(validator.isEmpty(body.features[i])){throw("Invalid characteristics!");}
    }
    return await db.modelProduct.insertMany([{
      id: body.id,
      name: body.name,
      price: body.price,
      image: body.image,
      category: body.category,
      description: body.description,
      features: body.features
    }]);
  },

  deleteProduct: async (query) => {
    if(validator.isInt(query)){
      return await db.modelProduct.deleteOne({id: query});
    }
    else{
      throw("Invalid ID");
    }
  },

  getProducts: async (query) => {
    let sortingType = {};
    // Verifies first if query has a category attribute, and then verifies if this category only has Ascii characters
    if(query.category && validator.isAscii(query.category)) {
      let categories = ['cameras', 'computers', 'consoles', 'screens'];
      if(categories.indexOf(query.category) === -1) {
        throw("Invalid category");
      }
      // Creating a category attribute for sortingType
      sortingType.category = query.category;
    }

    // Verifies if query has a criteria attribute.
    if(query.criteria) {
      let criterias = ['alpha-asc', 'alpha-dsc', 'price-asc', 'price-dsc'];
      if(criterias.indexOf(query.criteria) == -1) {
        throw("Invalid criteria");
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

    return productsList;
  },

  getProduct: async (query) => {
    let product = await db.modelProduct.find(query ? {id: query} : {});
    if(product.length == 0){
      throw("Invalid ID");
    }
    else{
      return product[0];
    }
  }
};

module.exports = Products;