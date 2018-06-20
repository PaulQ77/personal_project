
drop table if exists admin;

create table if not exists admin (
    adminid SERIAL,
    auth0_id VARCHAR NOT NULL,
    name TEXT NOT NULL,
    userid serial,
    primary key (adminid),
    foreign key (userid) REFERENCES users(id)
);