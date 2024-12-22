const mysql = require("mysql2");
// Database connection configuration
const dbConnection = mysql.createPool({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

// SQL for creating the `users` table
const user = `CREATE TABLE if not exists users (
    userId INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(20) NOT NULL,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    RegisteredTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LastLogin TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(userId)
) ENGINE=InnoDB`; 

// SQL for creating the `questions` table
const question = `CREATE TABLE if not exists questions (
    questionId INT NOT NULL AUTO_INCREMENT, 
    userId INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    tag VARCHAR(20),
    image VARCHAR(255),
    audio VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(questionId),
    FOREIGN KEY(userId) REFERENCES users(userId)
) ENGINE=InnoDB`;  

// SQL for creating the `answers` table
const answer = `CREATE TABLE if not exists answers (
    answerId INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    questionId INT NOT NULL,  
    answer VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image VARCHAR(255),
    audio VARCHAR(255),
    PRIMARY KEY(answerId),
    FOREIGN KEY(userId) REFERENCES users(userId),
    FOREIGN KEY(questionId) REFERENCES questions(questionId)
) ENGINE=InnoDB`; 

// Query to create `users` table
dbConnection.query(user, (err, results) => {
  if (err) {
    console.error("Error creating users table:", err);
    return;
  }
  console.log("Users table created");
});

// Query to create `questions` table
dbConnection.query(question, (err, results) => {
  if (err) {
    console.error("Error creating questions table:", err);
    return;
  }
  console.log("Questions table created");
});

// Query to create `answers` table
dbConnection.query(answer, (err, results) => {
  if (err) {
    console.error("Error creating answers table:", err);
    return;
  }
  console.log("Answers table created");
});

// Exporting db connection as a promise-based object
module.exports = dbConnection.promise();
