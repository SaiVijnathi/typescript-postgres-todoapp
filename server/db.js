const Pool = require("pg").Pool;

const pool = new Pool({
    user : "postgres",
    password : "Honey@2002",
    database : "todoapp",
    host : "localhost",
    port : "5432"
})

module.exports = pool;