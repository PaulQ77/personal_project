
-- drop table if exists users;
-- create table if not exists users (
--     id serial primary key,
--     auth0_id text not null,
--     name text not null,
--     email text unique not null, 
--     admin text not null
-- );

-- insert into users (auth0_id, name, email, admin) 
-- values
-- ('01', 'Paul Quiroz', 'pquiroz1977@gmail.com', true),
-- ('02', 'Joe Customer', 'fake2@email.com', false),
-- ('03', 'Jenny Customer', 'fake3@email.com', false),
-- ('04', 'Bill Faker', 'fake@email.com', false);

-- select * from users;

-- select * from users where id = 1;



-- drop table if exists products;
-- create table if not exists products (
--     id serial primary key,
--     item_name text not null,
--     price decimal not null,
--     photo text
-- );

-- insert into products(item_name, price, photo)
-- VALUES
-- ('DM Waterbottle', 10.99, 'https://assets.bigcartel.com/product_images/192866332/devmtnshop_%2813_of_25%29.jpg?auto=format&fit=max&h=1000&w=1000'),
-- ('DM Hat', 14.99, 'https://assets.bigcartel.com/product_images/215232499/IMG_1964.JPG?auto=format&fit=max&h=1000&w=1000'),
-- ('DM Shirt', 19.99, 'https://assets.bigcartel.com/product_images/154156375/2015-03-10_13.57.18.jpg?auto=format&fit=max&h=1000&w=1000'),
-- ('DM Hoodie', 39.99, 'https://assets.bigcartel.com/product_images/192865687/devmtnshop_%2811_of_25%29.jpg?auto=format&fit=max&h=1000&w=1000')

-- select * from products;


-- drop table if exists orders;
-- create table if not exists orders (
--     id serial primary key,
--     users_id integer references users(id) 
-- );

-- drop table if exists order_items;
-- create table if not exists order_items (
--     id integer primary key,
--     product_id integer references products(id),
--     order_id integer references orders(id)
-- );

