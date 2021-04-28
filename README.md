# ITI-Cafeteria


 **ITI-Cafetria** is a simple application that allows ITI students to order availavle products from cafetria, and allows cafetria owner to respond to thier orders and control products. The project is developed using  **Laravel**,  **Vue.js** frameworks and  **MySQL** database.

---

## Deployment

---

## Table of Contents

---

<!-- TOC -->

- [Features](#features)
- [Getting Started](#getting-started)
  - [Setup Your Environment](#setup-your-environment)
- [Configurations](#configurations)
- [Dependencies](#dependencies)
- [Possible Improvements](#possible-improvements)
- [About Us](#about-us)
  <!-- /TOC -->

  ## Features

---

- Sign in with your Google / Facebook accounts
- Create an order
- View orders
- Cancel orders with processing status
- Admin create an order for a user 
- Admin can view all products and add remove them
- Admin can view the users and edit, delete them
- Admin can add products
- Admin can check all the checks he has
- Admin can check the current orders he has to finish 

## Getting Started

---

To use and run this project you need to:

#### Setup Your Environment

Before executing the following commands, please install **Laravel 8.37.0** and **Vue 3.0.11** as stated in the following setup:

- Download Laravel part here:
    - https://github.com/AyaHamedd/Cafeteria-Laravel
- Run Backend using the following command:
```bash
composer install

php artisan serve
```
- Run Frontend using the following command:
```bash
npm install

npm run serve
```
- Paste this URL to your browser:
 **http://localhost:8080**


 ##### Note:

Make sure that your database is up and configured properly for the application to work

---

## Configurations

---

Write your database credentials in the .env file inside Laravel Part then:

- Create database named Cafetria

As for the Facebook and Google API's configurations you will need to:

- write the Google and Facebook APIs' keys in .env file
- Save then close the file

## Dependencies

---

- [Node 14.16.1](https://nodejs.org/en/download/)

- [PHP 7.4.3](https://www.php.net/downloads.php)


## Possible Improvements

---

- Allow payment system

---

## About Us

We are a team of software engineering students at ITI intake 41, Smart Village branch, Open-source application track.

- Ahmed Atef
- Aya Hamed
- Heba Mostafa
- Eman Reda
- Hosam Ali