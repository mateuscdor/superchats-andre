import { renderMessage } from "./renderMensagens.js";

export default class Socket {
  socket = null;

  conectarSocketIo(ip_servidor, conversas) {
    //função para conectar com o socket.io
    this.socket = io(ip_servidor); //colocar o ip do servidor na porta 3000

    this.socket.on("previousMessages", function (messages) {
      const div = $("#mensagens-chat");
      div.empty();

      for (let index = 0; index < messages.length; index++) {
        renderMessage(messages[index]);
      }

      document.querySelectorAll(".opcoes-conversa").forEach((item) => {
        item.addEventListener("mouseover", function () {
          if (this.children[0].className == "botoes") {
            this.children[0].style.visibility = "visible";
          } else {
            this.children[1].style.visibility = "visible";
          }
        });
      });
      document.querySelectorAll(".opcoes-conversa").forEach((item) => {
        item.addEventListener("mouseout", function () {
          if (this.children[0].className == "botoes") {
            this.children[0].style.visibility = "hidden";
          } else {
            this.children[1].style.visibility = "hidden";
          }
        });
      });
    });

    this.socket.on("receivedMessage", function (message) {
      renderMessage(message);
    });

    this.socket.on("wppMessage", function (message) {
      renderMessage(message);

      const div = $("#conversas-chat");
      div.empty();

      conversas.procurarConversas(ip_servidor);
      let chatConversas = conversas.retornarValor();
      console.log(chatConversas);
      conversas.renderConversas(chatConversas);
    });
  }

  retornarSocket() {
    return this.socket;
  }
}
