const mysql = require("mysql2");
// const app = express();

// Database connection configuration
const dbConnection = mysql.createPool({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});
// console.log(da);

// // Create tables in database

const user = `CREATE TABLE if not exists users(
        userId INT(20) NOT NULL AUTO_INCREMENT,
        userName VARCHAR(20) NOT NUll,
        firstName VARCHAR(20) NOT NULL,
        lastName VARCHAR(20) NOT NULL,
        email VARCHAR(40) NOT NULL,
        password VARCHAR(100) NOT NULL,
        RegisteredTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        LastLogin TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(userId)
    )`;

const question = `CREATE TABLE if not exists questions(
        id INT(20) NOT NULL AUTO_INCREMENT,
        questionId VARCHAR(100) NOT NUll UNIQUE,
        userId INT(20) NOT NULL,
        title VARCHAR(50) NOT NULL,
        description VARCHAR(200) NOT NULL,
        tag VARCHAR(20),
        image VARCHAR(255),
        audio VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id, questionId),
        FOREIGN KEY(userId) REFERENCES users(userId)
    )`;

const answer = `CREATE TABLE if not exists answers(
        answerId INT(20) NOT NULL AUTO_INCREMENT,
        userId INT(20) NOT NULL,
        questionId VARCHAR(100) NOT NUll,
        answer VARCHAR(200) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        image VARCHAR(255),
        audio VARCHAR(255),
        PRIMARY KEY(answerId),
        FOREIGN KEY(questionId) REFERENCES questions(questionId),
        FOREIGN KEY(userId) REFERENCES users(userId)
    )`;

// Qyery
dbConnection.query(user, (err, results) => {
  if (err) throw err;
  console.log("user table created");
});

dbConnection.query(question, (err, results) => {
  if (err) throw err;
  console.log("question table created");
});
dbConnection.query(answer, (err, results) => {
  if (err) throw err;
  console.log("answer table created");
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
