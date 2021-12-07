export default class Conversas {
  conversas = null;

  retornarValor() {
    return this.conversas;
  }

  procurarConversas() {
    var settings = {
      url: "http://localhost:3000/carregarConversas",
      method: "POST",
      timeout: 0,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      this.conversas = response;
    });
  }

  renderConversas(conversas) {
    let templateConversa = `
          <a href='atendimento.php?numeroCliente=$numero[$i]' class='card-link'>
          <div class='d-flex pop-chat mb-1'>
              <div class='d-flex justify-content-center align-items-center flex-grow-1'>
                  <img src='assets/img/transferir.png' class='img-chat m-2'>
              </div>
        
              <div class='w-100 m-2'>
                  <div class='d-flex justify-content-between data-hora'>
                      <p> ${conversas.from_number} </p>
                      <p> ${conversas.created_at} </p>
                  </div>
        
                  <div class='mensagem'>
        
                      <p> texto</p>
                  </div>
        
              </div>
          </div>
        </a>
          `;

    $(".conversas-chat").append(templateConversa);
  }
}
