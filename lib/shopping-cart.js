/**
 * 
 */

'use strict';

const db = require("./db");
const validator = require("validator");
 
const ShoppingCart = {
		
		addToCart: async (body) => {
			if(validator.isEmpty(body.productId) || validator.isInt(body.productId) || validator.isEmpty(body.quantity) || validator.isInt(body.quantity) || body.quantity > 0) { throw("Invalid input"); }
			return await db.modelCart.insertMany([{
		      productId: body.id,
		      quantity: body.quantity
		    }]);
		},

		clearCart: async () => {
			return await db.modelCart.deleteMany({});
		},

		deleteItemFromCart: async (productID) => {
			if(validator.isInt(productID)){
      			return await db.modelCart.deleteOne({productId: productID});
    		}
    		else{
      			throw("Invalid ID");
    		}
		},

		getCart: async (query) => {
			return query.cart.items;
		},
		
		getProductFromCart: async (productID) => {
			if(validator.isInt(productID)){
				let product = await db.modelCart.find(productID ? {productId: productID} : {});
				if(product.length == 0){
      				throw("Product not in cart (invalid ID)");
    			}
    			else{
					return product[0];
				}
			}
			else {
				throw("Invalid ID");
			}
		},

		updateCartItem: async (productInfo) => {
			if(validator.isEmpty(productInfo.productId) || validator.isEmpty(productInfo.quantity) || validator.isInt(productInfo.productId) || validator.isInt(productInfo.quantity) || productInfo.quantity > 0){ throw("Invalid input"); }
			else{
				return await db.modelCart.updateOne({"productId": productInfo.productId},{$set: {"quantity": productInfo.quantity}});
			}
		}
};

module.exports = ShoppingCart;