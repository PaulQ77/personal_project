
drop table if exists admin;

create table if not exists admin (
    admin_id serial primary key,
    auth0_id text,
    name text,
    user_id serial,
    foreign key (user_id) references users(id)
);

insert into admin(auth0_id, name)
VALUES('github|25933912', 'pquiroz1977@gmail.com')