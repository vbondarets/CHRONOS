require('dotenv').config()
const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit:10,
    host:"127.0.0.1",
    password:'securepass',
    user:'idashchenk',
    database:'chronos',
}).promise()

module.exports = pool
