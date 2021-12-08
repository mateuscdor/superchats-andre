export default class Conversas {
  conversas = null;

  procurarConversas() {
    let resposta;

    var settings = {
      url: "http://localhost:3000/carregarConversas",
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      resposta = response;
      //Conversas.conversas = response;
    });

    this.conversas = resposta;
  }

  ultimaConversaFunction() {}

  renderConversas(conversas) {
    let ultimaConversa = [];
    let numerosUnicos = [];

    conversas.forEach((element) => {
      if (numerosUnicos.includes(element.from_number)) {
        for (let index = 0; index < ultimaConversa.length; index++) {
          if (
            ultimaConversa[index].id < element.id &&
            ultimaConversa[index].from_number == element.from_number
          ) {
            ultimaConversa[index].content = element.content;
          }
        }
      } else {
        numerosUnicos.push(element.from_number);
        ultimaConversa.push({
          id: element.id,
          from_number: element.from_number,
          content: element.content,
          created_at: element.created_at,
        });
      }
    });

    ultimaConversa.forEach((element) => {
      let templateConversa = `
      <a href='atendimento.php?numeroCliente=$numero[$i]' class='card-link'>
      <div class='d-flex pop-chat mb-1'>
          <div class='d-flex justify-content-center align-items-center flex-grow-1'>
              <img src='assets/img/transferir.png' class='img-chat m-2'>
          </div>
       
          <div class='w-100 m-2'>
              <div class='d-flex justify-content-between data-hora'>
                  <p> ${element.from_number} </p>
                  <p> ${element.created_at} </p>
              </div>
    
              <div class='mensagem'>
    
                  <p> ${element.content} </p>
              </div>
    
          </div>
      </div>
    </a>
      `;

      $(".conversas-chat").append(templateConversa);
    });

    /*
    conversas.forEach((element) => {
      let templateConversa = `
      <a href='atendimento.php?numeroCliente=$numero[$i]' class='card-link'>
      <div class='d-flex pop-chat mb-1'>
          <div class='d-flex justify-content-center align-items-center flex-grow-1'>
              <img src='assets/img/transferir.png' class='img-chat m-2'>
          </div>
    
          <div class='w-100 m-2'>
              <div class='d-flex justify-content-between data-hora'>
                  <p> ${element.from_number} </p>
                  <p> ${element.created_at} </p>
              </div>
    
              <div class='mensagem'>
    
                  <p> ${element.content} </p>
              </div>
    
          </div>
      </div>
    </a>
      `;

      $(".conversas-chat").append(templateConversa);
    });
    */
  }

  retornarValor() {
    return this.conversas;
  }
}
