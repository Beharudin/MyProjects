const dotenv=require('dotenv')

// for using .env
// dotenv.config();

// for using .env.development
dotenv.config({path: `${__dirname}/.env.${process.env.NODE_ENV}`});

console.log("Name: ", process.env.MY_NAME)
console.log("Course: ", process.env.MY_TUTORIAL)
console.log("From: ", process.env.FROM)