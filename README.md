# Chris Clark's Bamazon CLI app

Instructions/Walkthrough

1. Clone repo into folder and run npm i to install necessary packages (packages listed as dependencies in package.json)

2. Run bamazon_schema.sql and bamazon_table_populate.sql scripts in your SQL environment to create some data to work with

3. Update the SQL authorization information to work in your SQL environment 
	--You will only need to update this information in bamazonuniversal.js

4. Run bamazoncustomer.js in node to observe first level functionality
	--App should show which products are available, prompt you to select one to buy and how much you want, confirm there is enough inventory to complete transaction, and then provide your final cost and update total sales for the product
	--App immediately quits upon completion (or failure) of transation

5. Run bamazonManager.js in node to observe second level functionality
	--App should provide user with 4 options (plus quit). 
		-View products available
		-View all products with inventory less than 5
		-Add inventory to any already existing product
		-Add a new product (prompt requires you to add product to an existing department in departments table)
	--App will return to the prompt menu after each action, until user quits

6. Run bamazonSupervisor.js in node to observe third level functionality
	--App should provide user with 2 options (plus quit)
		-View sales report (combination of data from both tables)
		-Add new department

7. There is also a full video walkthrough of the app in the repo



