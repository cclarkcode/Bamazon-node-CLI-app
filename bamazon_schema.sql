DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50),
department_name VARCHAR(50),
price DECIMAL(10,4) NOT NULL,
in_stock INTEGER(10),
PRIMARY KEY (item_id)
);