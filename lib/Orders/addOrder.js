const db = require("../db");
const validator = require("validator");

const ordersHandler = async (req, res, next) => {
	let body = req.body;

	if(isNaN(body.id) || validator.isEmpty(body.firstName) || validator.isEmpty(body.lastName)){return res.status(400).send("Parameter(s) error(s)");}
	if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email) == false) {return res.status(400).send("Invalid email");}
	if(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(body.phone) == false) {return res.status(400).send("Invalid phone number");}

	for(let i=0; i< body.products.length; i++){
		if(isNaN(body.products[i].id)){
			return res.status(400).send("Invalid product(s)!");
		}
		else{
			let product = await db.modelProduct.find({id: body.products[i].id});
			if(product.length == 0){
				return res.status(400).send("Product ID doesnt exist in database");
			}
		}
	}


	let searchOrder = await db.modelOrder.find(body.id ? {id: body.id} : {});
	let orderToAdd;
	if(searchOrder.length == 0){
		orderToAdd = [{
	    id: body.id,
	    firstName: body.firstName,
	    lastName: body.lastName,
	    email: body.email,
	    phone: body.phone,
	    products: body.products
	}];
	}
	else {
		return res.status(400).send("Order ID already in use");
	}


	let response = await db.modelOrder.insertMany(orderToAdd);
	return res.status(201).send(response);
}

module.exports = ordersHandler;