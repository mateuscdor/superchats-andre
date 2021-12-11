const Chat = require("../models/chat");
const functions = require("../functions/functions");
const Messages = require("../models/messages");
const Atendente = require("../models/atendente");
require("dotenv").config();

module.exports = (app) => {
  // Rota de carregar o chat
  app.get("/chat", function (req, res) {
    console.log("api /chat");
    // informações básicas para carregar o topo da aplicação vindas do dotenv
    let numeroAtendente = process.env.NUMERO_ATENDENTE;
    let canal = process.env.CANAL;
    let protocolo = process.env.PROTOCOLO;
    let conectado = process.env.TEL_FONE_CONECTADO;
    let destino = process.env.TEL_FONE;
    let ip_servidor = process.env.IP_SERVIDOR;

    Atendente.buscarAtendente(process.env.ID_USUARIO);
    let atendente = Atendente.retornarAtendente();

    // passando as informações para o front
    // rederizando o front pelo ejs
    res.render("pages/chat/index", {
      canal: canal,
      protocolo: protocolo,
      numeroAtendente: numeroAtendente,
      conectado: conectado,
      destino: destino,
      ip_servidor: ip_servidor,
    });
  });

  // Rota para enviar mensagens do front
  app.post("/enviar", function (req, res) {
    console.log("api /enviar");
    functions.enviarMensagem(req.query);
    const mensagem = req.query;
    Chat.mensagem(mensagem);
    console.log(req.query);
    res.status(200).json("mensagem enviada");
  });

  /*
  app.post("/sendmessagebutton", function (req, res) {
    functions.sendmessagebutton();

    res.status(200).json("ok");
  });
*/

  // Faz a busca das mensagens no chat
  app.post("/recuperarMensagens", function (req, res) {
    console.log("api /recuperarMensagens");
    Messages.buscarMessages(req.query.toNumber, process.env.TEL_FONE_CONECTADO);
    let mensagens = Messages.retornarDados();

    // faz o envio das mensagens para o front
    functions.mensagensAnteriores(mensagens);
    res.status(200).json(mensagens);
  });

  //
  app.post("/carregarConversas", function (req, res) {
    console.log("api /carregarConversas");
    Messages.buscarConversasNumero(process.env.TEL_FONE_CONECTADO);
    let conversas = Messages.retornarConversas();
    res.status(200).json(conversas);
  });

  /*
  app.post("/carregarAtendente", function (req, res) {
    Atendente.buscarAtendente(req.query);
    let atendente = Atendente.retornarAtendente();
    res.status(200).json(atendente);
  });
  */
};
