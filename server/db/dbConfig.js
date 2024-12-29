const mysql = require("mysql2");
require("dotenv").config();
// Database connection configuration

// SQL for creating the `users` table
const users = `CREATE TABLE if not exists users (
    userid INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    RegisteredTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LastLogin TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(userid)
) ENGINE=InnoDB`;

// SQL for creating the `questions` table
const questions = `CREATE TABLE if not exists questions (
    questionid INT NOT NULL AUTO_INCREMENT, 
    userid INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    tag VARCHAR(20),
    image VARCHAR(255),
    audio VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(questionid),
    FOREIGN KEY(userid) REFERENCES users(userId)
) ENGINE=InnoDB`;

// SQL for creating the `answers` table
const answers = `CREATE TABLE if not exists answers (
    answerid INT NOT NULL AUTO_INCREMENT,
    userid INT NOT NULL,
    questionid INT NOT NULL,  
    answer VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image VARCHAR(255),
    audio VARCHAR(255),
    PRIMARY KEY(answerid),
    FOREIGN KEY(userId) REFERENCES users(userid),
    FOREIGN KEY(questionid) REFERENCES questions(questionid)
) ENGINE=InnoDB`;

// Query to create `users` table
dbConnection.query(users, (err, results) => {
  if (err) {
    console.error("Error creating users table:", err);
    return;
  }
  console.log("Users table created");
});

// Query to create `questions` table
dbConnection.query(questions, (err, results) => {
  if (err) {
    console.error("Error creating questions table:", err);
    return;
  }
  console.log("Questions table created");
});

// Query to create `answers` table
dbConnection.query(answers, (err, results) => {
  if (err) {
    console.error("Error creating answers table:", err);
    return;
  }
  console.log("Answers table created");
});

const dbConnection = mysql.createPool({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

// Exporting db connection as a promise-based object
module.exports = dbConnection.promise();
