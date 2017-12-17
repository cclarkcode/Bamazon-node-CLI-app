// Module export to store database connection so that only one file is required to connect to mysql

const {table} = require('table');
var mysql = require('mysql');


function createtable(data) {
		var tabledata = [];
				for (var i = 0; i < data.length; i++) {
		    		var currentrow = [];
		    		if (i === 0) {
		    			
		    			for (var key in data[i]) {
		    				currentrow.push(key);
		    			}
		    			tabledata.push(currentrow);
		    			currentrow = [];
		    			
		    		}
		    		for (var key in data[i]) {
		    			currentrow.push(data[i][key]);
		    		}
		    		tabledata.push(currentrow);
		    		
    				}

    	var output = table(tabledata);

    	console.log(output);
}

//Create database connection
var connect = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});


module.exports = {
	createtable: createtable,
	connect: connect
}