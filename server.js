const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const superchats = require("superchats");
const functions = require("./functions/functions");

const app = express();

//utilizado para liberar acesso ao servidor
app.use((req, res, next) => {
  //res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
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
  cors: { origin: "*" },
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

//novas mudanças inseridas
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("pages/login");
});

app.post("/", function (req, res) {
  console.log(req.body);
  //res.redirect("/home");
  let email = req.body.email;
  let password = req.body.password;

  if (email.length && password.length) {
    if (email == "andre@andre" && password == "123") {
      res.redirect("/home");
    } else {
      res.redirect("/?erro=" + "nao foi possivel altenticar");
    }
  } else {
    res.redirect("/?erro=" + "preencha todos os campos");
  }
});

app.get("/home", function (req, res) {
  res.render("pages/section");
});

app.get("/logout", function (req, res) {
  functions.logout();
  res.redirect("/");
});

app.get("/chat", function (req, res) {
  res.render("pages/chat");
});

app.post("/conectar", function (req, res) {
  //console.log(req.query);

  functions.conectar();

  res.redirect("/home");
});

app.post("/enviar", function (req, res) {
  functions.enviarMensagem(req.query);
  console.log(req.query);
});

app.post("/sendmessagebutton", function (req, res) {
  functions.sendmessagebutton();
  res.status(200).json("ok");
});

let messages = [];
// server-side
io.on("connection", (socket) => {
  console.log(`Socket contectado: ${socket.id}`);

  socket.emit("previousMessages", messages);

  socket.on("sendMessage", (data) => {
    console.log(data);
    messages.push(data);
    socket.broadcast.emit("receivedMessage", data);
  });
});

httpServer.listen(3000);
