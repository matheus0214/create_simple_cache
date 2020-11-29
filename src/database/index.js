const { Client } = require("pg");
const Redis = require("ioredis");

/** Postgress */
const client = new Client({
  host: "db",
  port: 5432,
  user: "root",
  password: "passw",
  database: "my_app"
});

/** Redis */
const cache = new Redis({
    port: 6379,
    host: "cache"
});

client.connect()
.then(response => {
    console.log('\x1b[41m%s\x1b[0m', "Connected Database Postgress");
    client.query(
        `
            CREATE TABLE IF NOT EXISTS quotes(
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                quote TEXT NOT NULL
            )
        `
    );
})
.catch(err => {
    console.log(err);
});

module.exports = { client, cache };