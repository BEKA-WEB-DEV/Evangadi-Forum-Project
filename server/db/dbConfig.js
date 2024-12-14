const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const e = require("express");

const dbConnection = mysql.createPool({
  user: "evangadi-admin",
  password: "bktessema",
  database: "evangadi-db",
  connectionLimit: 10,
});

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
