update products set price = $2 where product_id = $1
returning *;
