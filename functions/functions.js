const superchats = require("superchats");
require("dotenv").config();
const Chat = require("../models/chat");
const moment = require("moment");
const { mensagem } = require("../models/chat");

class Funcoes {
  whatsapp = null;
  socket = null;
  io = null;

  conectar() {
    new superchats.create("Marketing", {
      license: process.env.SUPER_TOKEN,
    }).then(async (client) => {
      this.whatsapp = client;

      await client.onMessage((event) => {
        console.log(event);

        const mensagem = {
          session: event.session,
          from_number: event.from,
          to_number: event.device,
          content: event.content,
          type: event.type,
          created_at: moment
            .unix(event.timestamp)
            .format("YYYY-MM-DD HH:mm:ss"),
        };

        Chat.mensagem(mensagem);
        this.io.sockets.emit("wppMessage", {
          author: event.from,
          message: event.content,
        });

        console.log(mensagem);
      });

      await client.onAck((event) => {
        console.log(event);
      });

      await client.onPresence((event) => {
        console.log(event);
      });

      await client.onDelete((event) => {
        console.log(event);
      });

      await client.forceStatusOn();
    });
  }

  enviarMensagem(message) {
    if (this.whatsapp) {
      return this.whatsapp.sendText(process.env.TEL_FONE, message.content);
    }
  }

  sendmessagebutton() {
    const buttons = [
      { buttonId: "id1", buttonText: { displayText: "Button 1" }, type: 1 },
      { buttonId: "id2", buttonText: { displayText: "Button 2" }, type: 1 },
    ];

    if (this.whatsapp) {
      this.whatsapp.sendButtons(
        process.env.TEL_FONE,
        "title of message",
        buttons,
        "Description optional"
      );
    }
  }

  logout() {
    if (this.whatsapp) {
      this.whatsapp.logout();
    }
  }

  consoleConectado(socket, io) {
    this.socket = socket;
    this.io = io;
    console.log(`Socket contectado: ${socket.id}`);
  }

  mensagensAnteriores(messages) {
    let socketAtual = this.socket;
    let mensagem = [];
    let ioAtual = this.io;

    messages.forEach(function (message, i) {
      mensagem.push({
        author: message.from_number,
        message: message.content,
      });

      //ioAtual.sockets.emit("previousMessages", mensagem[i]);
      console.log(mensagem[i]);
    });
    socketAtual.emit("previousMessages", mensagem);
  }
}

module.exports = new Funcoes();
