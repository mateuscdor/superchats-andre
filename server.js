const express = require("express");
const path = require("path");
const { createServer } = require("http");
const bodyParser = require("body-parser");
const superchats = require("superchats");
const functions = require("./functions/functions");

const app = express();

app.use(bodyParser.json());
const httpServer = createServer(app);

app.use(express.static(path.join(__dirname, "public")));

//novas mudanças inseridas
app.set("view engine", "ejs");

const cliente = {};

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/conectar", function (req, res) {
  //console.log(req.query);
  functions.conectar();
  res.status(200).json(req.query);
});

app.post("/enviar", function (req, res) {
  console.log(req.query);
  functions.enviarMensagem(req.query);
  res.status(200).json("ok");
});

app.post("/sendmessagebutton", function (req, res) {
  functions.sendmessagebutton();
  res.status(200).json("ok");
});

httpServer.listen(3000);
