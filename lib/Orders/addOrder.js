"use strict";

const db = require("./db");
const validator = require("validator");

const Orders = {

  getOrder: async (orderID) => {
    return await db.modelOrder.find({id: orderID});
  },

  getOrders: async () => {
    return await db.modelOrder.find({});
  },

};

module.exports = Orders;