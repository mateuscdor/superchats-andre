$(document).ready(function () {
  $(window).keydown(function (event) {
    if (event.keyCode == 116) {
      event.preventDefault();

      console.log("deu f5");

      //var corpo = document.getElementById("corpo");
      //document.getElementById("element");
      //corpo.style.webkitFilter = "blur(12px)";

      //
      let windowLoad =
        '<div class="" style="width:100%; height:100%; filter: blur(50px);opacity; 0.9px;filter: contrast(10); position:absolute; top:0;left:0; background:rgba(255,255,255,0.8);" id="fundo-branco">.</div>';

      let spinner =
        '<img src="assets/img/ajax-loader.gif" style="position: absolute; top:50%; left:50%;margin-top:-9.5px;margin-left:-110px" id="spinner">';

      $("#corpo").append(windowLoad);
      $("#corpo").append(spinner);

      atualizarTela();

      async function atualizarTela() {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            console.log(this.responseText);
          }
        });

        xhr.open("POST", `${ip_servidor}/recuperarMensagens`);

        xhr.send();

        setTimeout(function () {
          removerCarregamento();
        }, 2000);
      }

      async function removerCarregamento() {
        //const div = $("#mensagens-chat");
        //div.empty();
        document.getElementById("fundo-branco").remove();
        document.getElementById("spinner").remove();
        document.location.reload(true);
      }

      //document.getElementById("fundo-branco").remove();
      //document.getElementById("spinner").remove();
    }
  });
});
