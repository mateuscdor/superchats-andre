import { renderMessage } from "./renderMensagens.js";

export function enviarMensagem(
  conectado,
  numberDestino,
  ipSocket,
  ip_servidor
) {
  $("#chat").submit(function (event) {
    event.preventDefault();

    console.log(numberDestino.retornarNumero());

    var author = conectado;
    var message = $("input[name=texto]").val();
    var to_number = numberDestino.retornarNumero();
    var session = "Marketing";
    var type = "chat";
    var created_at = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");

    if (message.length) {
      var messageObject = {
        author: conectado,
        message: message,
      };

      renderMessage(messageObject);
      ipSocket.emit("sendMessage", messageObject);
    }

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open(
      "POST",
      `${ip_servidor}/enviar?session=${session}&from_number=${author}&to_number=${to_number}&content=${message}&type=${type}&created_at=${created_at}`
    );

    xhr.send();
    document.getElementById("buscar").value = "";

    let audio = new Audio("assets/audios/envio.mp3");

    audio.play();
  });
}
