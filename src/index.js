const express  = require("express");
const fs = require('fs');

const { client, cache } = require("./database");
const { CreateCacheExist, GetDatasCache } = require("./utils/Cache");

const app = express();

app.get("/", async (request, response) => {
    let datas = await GetDatasCache("quotes");

    if(!datas) {
        datas = await (await client.query("SELECT * FROM quotes")).rows;
    }

    return response.json(datas);
});

app.get("/create-quotes", async (request, response) => {
    const file = await fs.promises.readFile(__dirname + "/database/sqls/quotes.sql", {
        encoding: "utf-8"
    });

    const result = await client.query(file);

    return response.json({
        success: !!result.rowCount
    });
});

app.get("/create-cache", async(request, response) => {
    const quotes = await client.query(
        `
            SELECT * FROM quotes LIMIT 10
        `
    );

    await CreateCacheExist("quotes", quotes.rows);

    return response.json({ message: "Create success" });
});

app.listen(3333, "0.0.0.0");