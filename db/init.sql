
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

insert into products(item_name, price, photo)
VALUES
('DM Waterbottle', 10.00, 'http://res.cloudinary.com/paulq/image/upload/c_thumb,g_face,w_200/v1529948938/personal%20project/dm_waterbottle.jpg'),
('DM Lanyard', 2.00, 'https://res.cloudinary.com/paulq/image/upload/c_thumb,w_200,g_face/v1529948937/personal%20project/dm_lanyard.jpg'),
('DM Hat', 14.00, 'https://res.cloudinary.com/paulq/image/upload/c_thumb,w_200,g_face/v1529948937/personal%20project/dm_hat.jpg'),
('DM Shirt', 20.00, 'https://res.cloudinary.com/paulq/image/upload/c_thumb,w_200,g_face/v1529948937/personal%20project/dm_tshirt.jpg'),
('DM Hoodie', 40.00, 'https://res.cloudinary.com/paulq/image/upload/c_thumb,w_200,g_face/v1529948937/personal%20project/dm_hoodie.jpg'),
('DM Socks', 5.00, 'https://res.cloudinary.com/paulq/image/upload/c_thumb,w_200,g_face/v1529948937/personal%20project/dm_socks.jpg')
-- ('DM Beanie', 10.00, 'https://res.cloudinary.com/paulq/image/upload/c_thumb,w_200,g_face/v1529948937/personal%20project/dm_beanie.jpg')

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

