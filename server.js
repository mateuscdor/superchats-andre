const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const functions = require("./functions/functions");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/tabelas");
const consign = require("consign");

const app = express();

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("Banco de dados conectado com sucesso");
    Tabelas.init(conexao);
  }
});

//utilizado para liberar acesso ao servidor
app.use((req, res, next) => {
  //res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,HEAD,DELETE,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "content-Type,x-requested-with");
  app.use(cors());
  next();
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
  //cors: { origin: "*" },
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
  },
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

//novas mudanças inseridas
app.set("view engine", "ejs");

consign().include("controllers").into(app);

// server-side
io.on("connection", (socket) => {
  functions.consoleConectado(socket, io);

  socket.on("sendMessage", (data) => {
    console.log(data);
    socket.broadcast.emit("receivedMessage", data);
  });
});

httpServer.listen(3000);
