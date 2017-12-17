// Uses npm table package to display results cleanly
// Built as module in one place to avoid having to require the table in each individual file

const {table} = require('table');

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

module.exports = createtable;