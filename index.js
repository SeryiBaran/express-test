import express from "express";
import bodyParser from "body-parser";
import path from "path";
import axios from "axios";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let api_data;

const fetchData = async () => {
    try {
        await axios
            .get("https://disease.sh/v3/covid-19/countries?sort=cases")
            .then((res) => {
                api_data = res.data;
            });
    } catch (e) {
        console.log(e);
    }
};

fetchData();

app.get("/api", async ({ res }) => {
    await fetchData();
    res.send(api_data);
});

app.get("/", ({ res }) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/void", ({ res }) => {
    res.sendFile(`${__dirname}/public/void.html`);
});

app.post("/ascii", async (req, res) => {
    if (req.body.lol) {
        res.sendFile(`${__dirname}/ascii.txt`);
    }
});

app.get("/s", async (req, res) => {
    res.sendFile(`${__dirname}/ascii.txt`);
});

app.post("/test", (req, res) => {
    console.log(req.body);
    res.status(200);
    res.send("Hello!");
});

app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}!`);
});
