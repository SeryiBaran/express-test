const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let api_data;

async function fetchData() {
    try {
        await axios
            .get("https://disease.sh/v3/covid-19/countries?sort=cases")
            .then((res) => {
                api_data = res.data;
            });
    } catch (e) {
        console.log(e);
    }
}

fetchData();

app.get("/api", async (req, res) => {
    await fetchData();
    res.send(api_data);
});

app.get("/", async (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/void", async (req, res) => {
    res.sendFile(`${__dirname}/public/void.html`);
});

app.post("/ascii", async (req, res) => {
    if (req.body.lol) {
        let data = await fs.readFileSync("ascii.txt", "utf8");
        res.send(data.toString());
    }
});

app.post("/test", async (req, res) => {
    console.log(req.body)
});

app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}!`);
});
