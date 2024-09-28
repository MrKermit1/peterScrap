const express = require("express");
const { allStatements } = require("./requests/allStatements");
const { allFiles } = require("./requests/allFiles");
const app = express();

const PORT = process.env.PORT || 4000

app.get("/", (req, res) => {
    res.send("Witaj użytkowniku");
})

app.get("/komunikaty", (req, res) => {
    allStatements(res);
})

app.get("/pliki", (req, res) => {
    allFiles(res);
})

app.listen(PORT, () => {
    console.log("aktwyny port: " + PORT)
})