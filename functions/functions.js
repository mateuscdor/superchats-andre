const superchats = require("superchats");
require("dotenv").config();
const Chat = require("../models/chat");
const moment = require("moment");
const { mensagem } = require("../models/chat");
const Protocolo = require("../models/protocolos");

class Funcoes {
  whatsapp = null;
  socket = null;
  io = null;

  conectar() {
    console.log("functions conectar");
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

        //let protocolo = Protocolo.buscarProtocolos(this.whatsapp);
        //console.log(protocolo);

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
    console.log("functions enviarMensagem");
    if (this.whatsapp) {
      return this.whatsapp.sendText(message.to_number, message.content);
    }
  }

  /*
  sendmessagebutton() {
    console.log("functions sendmessagebutton");
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
*/
  logout() {
    console.log("functions logout");
    if (this.whatsapp) {
      this.whatsapp.logout();
    }
  }

  consoleConectado(socket, io) {
    console.log("functions consoleConectado");
    this.socket = socket;
    this.io = io;
    console.log(`Socket contectado: ${socket.id}`);
  }

  mensagensAnteriores(messages) {
    return new Promise((resolve, reject) => {
      try {
        console.log("functions mensagensAnteriores");
        let socketAtual = this.socket;
        let mensagem = [];

        messages.forEach(function (message, i) {
          mensagem.push({
            author: message.from_number,
            message: message.content,
          });

          console.log(mensagem[i]);
        });

        resolve(resolve);

        socketAtual.emit("previousMessages", mensagem);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Funcoes();
