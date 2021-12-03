/*
var auto_refresh = setInterval(function () {
  endereco = window.location.href;
  $("#mensagens-chat").load(`${endereco} #mensagens-chat`);
}, 30000);

var auto_refreshClientes = setInterval(function () {
  $("#clienteMensagens").load(`${endereco} #clienteMensagens`);
}, 30000);
*/

$("#buscar").on("blur", function (e) {
  verify(e);
});
$("#buscar").on("keypress", function (e) {
  if (e.keyCode == 13) {
    verify(e);
  }
});

function verify(e) {
  if (!/\w/.test($("#buscar").val())) {
    e.preventDefault();
    //$('p').html('Preencha algo!');
  } else {
    //$('p').html('');
  }
}
