var inquirer = require('inquirer');
var universal = require('./bamazonuniversal.js');

var connection = universal.connect;

//Run Code
supervisorprompt();

function supervisorprompt() {

	inquirer.prompt([
	{
		name: 'action',
		type: 'list',
		message: 'What would you like to do, supervisor?',
		choices: ['View Product Sales by Department','Create New Department','Quit']
	}
	]).then(function(response) {

		var actions = {
			'View Product Sales by Department': showsales,
			'Create New Department': newdepartment,
			'Quit': quit
		}

		actions[response.action]();

	})
}

function newdepartment () {

	inquirer.prompt([
	{
		name: 'name',
		message: 'What is the name of the new department?'
	},
	{
		name: 'overhead',
		message: 'What are the department\'s overhead costs?'
	}
	]).then(function(response) {

		connection.query('INSERT INTO departments SET ?',
		{
			department_name: response.name,
			over_head_costs: parseInt(response.overhead)
		},
		function(err, results) {
				
			    if (err) {
			    	console.log(err + ' Error');
			    	throw err;
			    }
			    else {
			    	console.log(results.affectedRows + " department inserted!\n");
			    	supervisorprompt();
			    }

		});

	})


}

function showsales() {
	connection.query(
		'SELECT departments.department_id AS Id,' +
		'departments.department_name AS Department,' +
		'departments.over_head_costs AS Overhead,' +
		'COALESCE(SUM(products.product_sales),0) AS "Total Sales",' +
		'COALESCE(SUM(products.product_sales),0) - departments.over_head_costs AS Profit ' +
		'FROM departments LEFT JOIN products ' +
		'ON departments.department_name = products.department_name ' +
		'GROUP BY departments.department_name ' +
		'ORDER BY departments.department_id',
		
		function(err, results) {
				
			    if (err) {
			    	console.log(err + ' Error');
			    	throw err;
			    }
			    else {
			    	universal.createtable(results);
    				supervisorprompt();
			    }

		});
}

function quit() {
	connection.end();
}

