create database todoApp;

create table todos(
    todo_id serial primary key,
    description varchar(255) not null,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE
);

create table users(
    user_id serial primary key,
    name varchar(100) not null,
    email varchar(255) unique not null,
    password varchar(255) not null
);