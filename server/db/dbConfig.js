const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const dbConnection = mysql.createPool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
  host: process.env.HOST,
});
console.log(process.env.USER);
console.log(process.env.PASSWORD);
console.log(process.env.DATABASE);
console.log(process.env.HOST);

module.exports = dbConnection.promise();
// dbConnection.execute("SELECT 'test' ", function (error, results) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(results);
//   }
// });

// CREATE TABLE users(
// 	userid INT(20) NOT NULL AUTO_INCREMENT,
//     username VARCHAR(20) NOT NUll,
//     firestname VARCHAR(20) NOT NULL,
//     lastname VARCHAR(20) NOT NULL,
//     email VARCHAR(40) NOT NULL,
//     password VARCHAR(100) NOT NULL,
//     PRIMARY KEY (userid)
// );

// CREATE TABLE questions(
// 	id INT(20) NOT NULL AUTO_INCREMENT,
//     questionid VARCHAR(100) NOT NULL UNIQUE,
//     userid INT (20) NOT NULL,
//     title VARCHAR(50) NOT NULL,
//     description VARCHAR(200) NOT NULL,
//     tag VARCHAR(20),
//     image VARCHAR(255),
//   	audio VARCHAR(255),
//     PRIMARY KEY(id, questionid),
//     FOREIGN KEY(userid) REFERENCES users(userid)
//  );

// CREATE TABLE answers(
//     answersid INT(20) NOT NULL AUTO_INCREMENT,
//     userid INT (20) NOT NULL,
//     questionid VARCHAR(50) NOT NULL,
//     answer VARCHAR(200) NOT NULL,
//     image VARCHAR(255),
//   	audio VARCHAR(255),
//     PRIMARY KEY(answersid),
//     FOREIGN KEY(questionid) REFERENCES questions(questionid),
//     FOREIGN KEY(userid) REFERENCES users(userid)
//  );
