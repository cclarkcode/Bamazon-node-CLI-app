var inquirer = require('inquirer');
var universal = require('./bamazonuniversal.js');

var connection = universal.connect;

//Run code

getproducts();


function getproducts() {

	connection.query(
	"SELECT * FROM products",
	 function(err, results) {
    if (err) throw err;
    else {
    	
    		console.log('\nProducts available for sale.\n\n');
    		universal.createtable(results);
    	
    	}

    customerprompt(results);

});

}

function customerprompt (query) {

	inquirer.prompt([
	{
		name: 'item_id',
		message: 'What would you like to buy? (Use item_id)'
	},
	{
		name: 'quantity',
		message: 'How many units would you like to buy?'
	}
	]).then(function(results) {

		var found = false;

		for (var i = 0; i < query.length && !found; i++) {
			if (query[i].item_id === parseInt(results.item_id)) {
				found = true;
			}
		}

		if (found) {

			checkquantity(parseInt(results.item_id),parseInt(results.quantity));

		}
		else {
			console.log('I\'m sorry, that was not a valid item_id selection.')
			connection.end();
		}

    		
    		
    	
	});
}

function checkquantity (id, quantity) {

	connection.query('SELECT * from products where?',
	[{
		item_id: id
	}],
	function(err, results) {
    if (err) throw err;
    else {
    	
    	//Check to confirm enough inventory to complete purchase
    	if(results[0].in_stock >= parseInt(quantity)) {
    		
    		//Determine cost of purchase
    		var cost = parseInt(quantity) * results[0].price;

    		//Add sales to DB
   			updatesales(results,cost);
    		console.log('The cost of your purchase is $' + cost + ' dollars.')
    		updatedb(id, quantity,results[0].in_stock);
    	}
    	else {
    		console.log('I\'m sorry, we don\'t have enough of that product to meet your request');
    		connection.end();
    	}	
    }
    })


}

function updatedb(id,requested,instock) {

	connection.query('UPDATE products SET ? WHERE ? ',
		[
			{
				in_stock: (instock-requested)
			},
			{
				item_id: id
			}
		],
		function(err, res) {
	      console.log('Request completed!');

	      connection.end();

	    })
}

//Adds cost of purchase to database sales
function updatesales(productdata,totalsales) {

	connection.query('UPDATE products SET ? WHERE ?',
		[
			{
				product_sales: productdata[0].product_sales+totalsales
			},
			{
				item_id: productdata[0].item_id
			}
		],function(err, res) {
	      console.log('Sales updated!');

	    })
		

}