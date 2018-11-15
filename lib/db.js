"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema({
	productId: { type: Number, unique: true },
	quantity: Number
}, {versionKey: false});

const Order = new Schema({
  id: { type: Number, unique: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  products: Array
}, { versionKey: false });


const Product = new Schema({
  id: { type: Number, unique: true },
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String,
  features: Array
}, { versionKey: false });

var modelOrder = mongoose.model("Order", Order);
var modelProduct = mongoose.model("Product", Product);
var modelCart = mongoose.model("Cart", Cart);

mongoose.Promise = global.Promise;

// TODO: Initialiser la connexion avec le "connect string" de votre base de données.
mongoose.connect("mongodb://log4420user:log4420@ds155203.mlab.com:55203/log4420-online-shop", { useMongoClient: true });

module.exports = {
  mongoose: mongoose,
  modelOrder: modelOrder,
  modelProduct: modelProduct,
  modelCart: modelCart
};