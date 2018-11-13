"use strict";

const db = require("./db");
const validator = require("validator");

const Products = {
  createProduct: async (query) => {
    
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