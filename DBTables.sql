create database if not exists Project4;
use Project4;

create table if not exists user_details(
email varchar(100),
fname varchar(100),
lname varchar(100),
address varchar(500),
city varchar(100),
state varchar(10),
zip varchar(100),
uname varchar(100) primary key,
pwd varchar(100),
role varchar(100)
);

insert into user_details values ("hsmith@gmail.com", "Henry", "Smith", "sample", "Pitt", "AL", "15206", "hsmith", "smith", "normal");
insert into user_details values ("tbucktoo@gmail.com", "Tim", "Bucktoo", "sample", "Pitt", "PA", "15206", "tbucktoo", "bucktoo", "normal");
insert into user_details values ("jadmin@gmail.com", "Jenny", "Admin", "sample", "Pitt", "PA", "15206", "jadmin", "admin", "admin");

create table if not exists product_details(
description text,   
id varchar(100) primary key,
ASIN varchar(100),
title text,
groups varchar(50),
categories text
);



