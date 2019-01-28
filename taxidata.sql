/*SQL SCRIPT FOR DB1*/
/*VERSION 1*/
/* Delete the tables if they already exist */
drop table if exists client;
drop table if exists favorites;
drop table if exists drivers;
CREATE EXTENSION postgis;
/* Create the schema for our tables */
/*USERS*/
create table client (first_name varchar(30) NOT NULL, last_name varchar(30) NOT NULL, phone INTEGER PRIMARY KEY, password varchar(40) NOT NULL, email varchar(50) NOT NULL, credit_card INTEGER NOT NULL);
/*SEDES*/
create table favorites (favid SERIAL, phone INTEGER, title varchar(30) NOT NULL);
Select AddGeometryColumn('favorites', 'coor', 3725, 'POINT', 2);
/*DRIVERS*/
create table drivers (driver_serial SERIAL, first_name varchar(30) NOT NULL, last_name varchar(30) NOT NULL, phone INTEGER PRIMARY KEY, password varchar(40) NOT NULL);
Select AddGeometryColumn('drivers', 'coor', 3725, 'POINT', 2);

/* Inserting our data on CLIENT*/
insert into client values('charles', 'xavier', 76543, 'there', 'charles@xavier.com', 10021);
insert into client values('Luka', 'Modric', 88991, 'leon', 'luka@modric.com', 10023);

/* Inserting our data on FAVORITES*/
insert into favorites (phone, title, coor) values(76543, 'casa', ST_GeomFromText('POINT(3.4516 -76.5320)', 3725));
insert into favorites (phone, title, coor) values(76543, 'Universidad', ST_GeomFromText('POINT(3.3730 -76.5320)', 3725));
insert into favorites (phone, title, coor) values(76543, 'La casa de ella', ST_GeomFromText('POINT(3.3500 -76.5370)', 3725));

insert into favorites (phone, title, coor) values(88991, 'casa', ST_GeomFromText('POINT(3.4316 -76.5520)', 3725));
insert into favorites (phone, title, coor) values(88991, 'Universidad', ST_GeomFromText('POINT(3.3730 -76.5320)', 3725));

/*Inserting our data on DRIVERS*/
insert into drivers (first_name, last_name, phone, password, coor) values ('Quentin', 'Tarantino', 66666, 'pulp123', ST_GeomFromText('POINT(3.4456 -76.5208)', 3725));
insert into drivers (first_name, last_name, phone, password, coor) values ('Alejandro', 'González I.', 10101, '21grams', ST_GeomFromText('POINT(3.4406 -76.5208)', 3725));
insert into drivers (first_name, last_name, phone, password, coor) values ('Lars', 'Von Trier', 77711, 'dogville', ST_GeomFromText('POINT(3.4396 -76.5359)', 3725));
insert into drivers (first_name, last_name, phone, password, coor) values ('Denis', 'Villeneuve', 51615, 'incendies', ST_GeomFromText('POINT(3.4301 -76.5209)', 3725));
