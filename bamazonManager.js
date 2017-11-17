var mysql = require('mysql');
var inquirer = require('inquirer');
var createtable = require('./bamazonuniversal.js');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

//Run code
managerprompt();

function showproducts(callback) {
	connection.query(
		"SELECT * FROM products",
		 function(err, results) {
	    if (err) throw err;
	    else {
	    		console.log('\nProducts available for sale.\n\n');
	    		createtable(results);
	    			
	    	}

	      	 managerprompt();

	});
}

function managerprompt() {
	console.log('----------------------------');
	inquirer.prompt([
	{
		name: 'choice',
		message: 'What would you like to do?',
		type: 'list',
		choices: ['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product','Quit']
	}
	]).then(function(response) {

		console.log('----------------------------');
		
		//Define function object
		var actions = {
			'View Products for Sale': showproducts,
			'View Low Inventory': lowinventory,
			'Add to Inventory': addinventory,
			'Add New Product': addproduct,
			'Quit': quit
		}

		actions[response.choice]();
	})
}

function lowinventory() {
	connection.query('SELECT * FROM products WHERE in_stock <=5',
		function(err, results) {
	    if (err) {
	    	console.log(err + ' Error');
	    	throw err;
	    }
	    else {
	    	
	    	//Check to see if low inventory query returned any results
	    	if (results.length === 0) {
	    		console.log('There are no items with low inventory.');
	    	}
	    	else {

	    		console.log('\nItems with low inventory\n');
	    		createtable(results);	       	
	    	}
	    	
	    }
	    

	    managerprompt();
	    });
}

function addinventory() {
	inquirer.prompt([
	{
		name: 'id',
		message: 'To which product would you like to add inventory? (Use item_id)'
	},
	{
		name: 'add',
		message: 'How much addtional inventory would you like to add?'
	}
	]).then(function(inqresponse){

		
		//Find current quantity
		connection.query('SELECT in_stock FROM products where ?',
			{item_id: parseInt(inqresponse.id)},
			function(err, results) {
				
			    if (err) {
			    	console.log(err + ' Error');
			    	throw err;
			    }
			    else {
			    	
			    	//Add new quantity to current quantity and update DB
			    	connection.query('UPDATE products SET ? WHERE ?',
			    	[{
			    		in_stock: results[0].in_stock + parseInt(inqresponse.add)
			    	},
			    	{
			    		item_id: parseInt(inqresponse.id)
			    	}],
			    	function(err, results) {
					    if (err) {
					    	console.log(err + ' Error');
					    	// throw err;
					    }
					    else {
					    	console.log(results.affectedRows + " products updated!\n");
					    	managerprompt();
					    }
					});
			    }
			});
	});
}

function addproduct() {

	//Find out valid department choices (because departments need to match up to supervisor department table)
	connection.query ('SELECT department_name FROM departments',
		function(err, res) {

				if (err) throw err;
				else {
					//String array to serve as department choices for add product prompt
					var departments = [];
					
					for (var i = 0; i < res.length; i++) {
						departments[i] = res[i].department_name;
					}
			      
			    }
			
				inquirer.prompt([
				{
					name: 'name',
					message: 'What is the product name?'
				},
				{
					name: 'department',
					type: 'list',
					message: 'What department does the product belong in?',
					choices: departments
				},
				{
					name: 'price',
					message: 'How much does the product cost?'
				},
				{
					name: 'quantity',
					message: 'How much of the product do you have in stock?'
				}
				]).then(function(response) {
		
					connection.query(
						'INSERT INTO products SET ?', 
						{
							product_name: response.name,
							department_name: response.department,
							price: response.price,
							in_stock: response.quantity
						},
						function(err, res) {

							if (err) throw err;
							else {
						      console.log(res.affectedRows + " product inserted!\n");
						      // Call updateProduct AFTER the INSERT completes
						      managerprompt();
						    }
			    	});
	});

});

	
}

function quit() {
	connection.end();
}

