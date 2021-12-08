const Chat = require("../models/chat");
const functions = require("../functions/functions");
const Messages = require("../models/messages");
const { retornarConversas } = require("../models/messages");
const { Atendente } = require("../models/atendente");
require("dotenv").config();

module.exports = (app) => {
  app.get("/chat", function (req, res) {
    idUsuario = process.env.ID_USUARIO;
    Atendente.buscarAtendente(idUsuario);
    let atendente = atendenteAtendente.retornarAtendente();

    res.render("pages/chat", { teste: idUsuario });
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

  app.post("/recuperarMensagens", function (req, res) {
    Messages.buscarMessages(
      process.env.TEL_FONE,
      process.env.TEL_FONE_CONECTADO
    );
    let mensagens = Messages.retornarDados();
    functions.mensagensAnteriores(mensagens);
    res.status(200).json(mensagens);
  });

  app.post("/carregarConversas", function (req, res) {
    Messages.buscarConversasNumero(process.env.TEL_FONE_CONECTADO);
    let conversas = Messages.retornarConversas();
    res.status(200).json(conversas);
  });

  app.post("/carregarAtendente", function (req, res) {
    Atendente.buscarAtendente(req.query);
    let atendente = atendenteAtendente.retornarAtendente();
    res.status(200).json(atendente);
  });
};
