const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

let a;

async function fetchData() {
    try {
        const [response] = await Promise.all([
            axios.get("https://disease.sh/v3/covid-19/countries?sort=cases"),
        ]);

        a = response.data;
    } catch (e) {
        console.log(e);
    }
}

fetchData();

app.get("/api", (req, res) => {
    res.send(a);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, () => {
    console.log("Application listening on port 3000!");
});
