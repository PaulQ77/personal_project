
-- drop table if exists admin;

-- create table if not exists admin (
--     admin_id serial primary key,
--     auth0_id text not null,
--     name text not null,
--     user_id serial,
--     foreign key (user_id) references users(id)
-- );