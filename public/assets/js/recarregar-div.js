export function recarregarDiv() {
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
}
