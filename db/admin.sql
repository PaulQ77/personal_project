
drop table if exists admin;

create table if not exists admin (
    admin_id serial primary key,
    auth0_id text,
    name text,
    user_id serial,
    foreign key (user_id) references users(id)
);