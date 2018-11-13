/**
 * 
 */

'use strict';

const session = require('express-session');
const db = require("./db");

 
const ShoppingCart = {
		
		getCart : async (query) => {
			let orderList = await db.modelOrder.find({}, { products: { id: 1, quantity: 1 } });
			if(orderList.length == 0){
			      throw("Invalid ID");
			    }else{
			return orderList;
			    }
		},
		
		getCartItem : async (query) => { 
			let cartItem = await db.modelOrder.find(query ? {products: {id: query} : {}});
			if(cartItem.length == 0){ 
			      throw("Invalid ID");
			    }
			    else{
			      return cartItem[0];
			    }
		};
}