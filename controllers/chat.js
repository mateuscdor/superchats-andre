const Chat = require("../models/chat");
const functions = require("../functions/functions");

module.exports = (app) => {
  app.get("/chat", function (req, res) {
    res.render("pages/chat");
  });

  app.post("/enviar", function (req, res) {
    functions.enviarMensagem(req.query);
    const mensagem = req.query;
    Chat.mensagem(mensagem);
    console.log(req.query);
    res.status(200).json("mensagem enviada");
  });

  app.post("/sendmessagebutton", function (req, res) {
    functions.sendmessagebutton();
    res.status(200).json("ok");
  });
};
