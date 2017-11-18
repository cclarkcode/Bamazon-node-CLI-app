DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50),
department_name VARCHAR(50),
price DECIMAL(10,4) NOT NULL,
in_stock INTEGER(10),
product_sales INTEGER(10) NOT NULL DEFAULT 0,
PRIMARY KEY (item_id)
);

CREATE TABLE departments (
department_id INT AUTO_INCREMENT NOT NULL,
department_name VARCHAR(50),
over_head_costs INT(10),
PRIMARY KEY (department_id)
);