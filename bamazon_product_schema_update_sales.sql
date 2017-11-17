USE bamazon;

ALTER TABLE products
ADD product_sales INT(10); 

UPDATE products SET product_sales = 0 WHERE item_id < 12;