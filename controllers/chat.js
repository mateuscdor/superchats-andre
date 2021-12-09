const Chat = require("../models/chat");
const functions = require("../functions/functions");
const Messages = require("../models/messages");
const { retornarConversas } = require("../models/messages");
const { Atendente } = require("../models/atendente");
require("dotenv").config();

module.exports = (app) => {
  app.get("/chat", function (req, res) {
    let numeroAtendente = process.env.NUMERO_ATENDENTE;
    let canal = process.env.CANAL;
    let protocolo = process.env.PROTOCOLO;
    let conectado = process.env.TEL_FONE_CONECTADO;
    let destino = process.env.TEL_FONE;
    let ip_servidor = process.env.IP_SERVIDOR;

    //Atendente.buscarAtendente(idUsuario);
    //let atendente = atendenteAtendente.retornarAtendente();

    res.render("pages/chat/index", {
      canal: canal,
      protocolo: protocolo,
      numeroAtendente: numeroAtendente,
      conectado: conectado,
      destino: destino,
      ip_servidor: ip_servidor,
    });
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
