import { renderMessage } from "./renderMensagens.js";
import { renderResponder } from "./renderResponder.js";

export default class Socket {
  socket = null;

  conectarSocketIo(ip_servidor, conversas, retornar) {
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

      document.querySelectorAll(".copiar_message").forEach((item) => {
        item.addEventListener("click", function () {
          let copy =
            this.parentNode.parentNode.parentNode.parentNode.children[0];

          var $temp = $("<input>");
          $("body").append($temp);
          $temp.val($(copy).text().trim()).select();
          document.execCommand("copy");
          $temp.remove();

          toastr.success("Mensagem copiada para área de tranferência");
        });
      });

      document.querySelectorAll(".responser_message").forEach((item) => {
        item.addEventListener("click", function () {
          const div = $(".responder");
          div.empty();

          renderResponder(
            $(this.parentNode.parentNode.parentNode.parentNode.children[0])
              .text()
              .trim()
          );

          let fechar = document.querySelector(".fechar-resposta");
          fechar.addEventListener("click", function () {
            const div = $(".responder");
            div.empty();
          });
        });
      });
    });

    this.socket.on("receivedMessage", function (message) {
      renderMessage(message);
    });

    this.socket.on("wppMessage", function (message) {
      console.log("socket / wppmessage");

      let numeroClicado = message.author;

      let numeroTela = retornar.retornarNumero();

      const div = $("#conversas-chat");
      div.empty();

      conversas.procurarConversas(ip_servidor);
      let chatConversas = conversas.retornarValor();
      console.log(chatConversas);
      conversas.renderConversas(chatConversas);
      conversas.adicionarEventoConversa(ip_servidor, retornar);

      // notificação
      if (numeroClicado == numeroTela) {
        renderMessage(message, "wppMessage");
      } else {
        let notificacoes = document.querySelectorAll(".clientesConversa");

        notificacoes.forEach((element) => {
          // Por padrão ele vem com o valor 1

          if (message.author == element.id) {
            let notify = `   
            <div class="notification-contact">
                <p class="bg-danger pt-1 pb-1 ps-2 pe-2"
                style="position: absolute; margin-left: -34px; margin-top: -2px; border-radius: 3px; color: white;font-size: 8pt;">
                <strong class="qtd-notification">${1}</strong>
                </p>
            </div>`;

            $(".clientesConversa").append(notify);

            /*
            if (element.children[2].style.visibility == "") {
              //console.log("é hidden");
              //element.children[2].style.visibility = "visible";
              //element.children[2].children[0].children[0].innerHTML = "1";
            } else {
              //console.log("contem valor");
              /*
              let valorDiv =
                element.children[2].children[0].children[0].textContent;
              let resultado = parseInt(valorDiv) + 1;
              element.children[2].children[0].children[0].innerHTML = resultado;
            
            }
              */
          }
        });
      }
      // notificação

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

      document.querySelectorAll(".copiar_message").forEach((item) => {
        item.addEventListener("click", function () {
          let copy =
            this.parentNode.parentNode.parentNode.parentNode.children[0];

          var $temp = $("<input>");
          $("body").append($temp);
          $temp.val($(copy).text().trim()).select();
          document.execCommand("copy");
          $temp.remove();

          toastr.success("Mensagem copiada para área de tranferência");
        });
      });

      document.querySelectorAll(".responser_message").forEach((item) => {
        item.addEventListener("click", function () {
          const div = $(".responder");
          div.empty();

          renderResponder(
            $(this.parentNode.parentNode.parentNode.parentNode.children[0])
              .text()
              .trim()
          );

          let fechar = document.querySelector(".fechar-resposta");
          fechar.addEventListener("click", function () {
            const div = $(".responder");
            div.empty();
          });
        });
      });
    });
  }

  retornarSocket() {
    return this.socket;
  }
}
