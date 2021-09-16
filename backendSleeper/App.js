const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const csvGenerator = require("./csvGenerator");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

const csv = new csvGenerator();

app.get("/prepareFile", (req, res) => {
  csv.generateFile(req.query.leagueId).then(() => {
    res.send({ status: "Ready" });
  });
});

app.get("/getFile", (req, res) => {
  res.sendFile(__dirname + `/processedFiles/${req.query.leagueId}`);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
