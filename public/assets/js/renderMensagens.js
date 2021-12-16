import { executarAudioRecebimento } from "./executarAudioRecebimento.js";

export function renderMessage(message, origem) {
  //fazer o template da mensagem

  let templateYou = `
    <div class='d-flex flex-column align-items-end m-3'>
        <div class="me-3 ms-3 text-light">      ${message.author}</div>
        <div class='d-flex flex-row-reverse align-items-start justify-content-start opcoes-conversa'>
            <div class='fundo-text text-wrap'>
                ${message.message}
            </div>
            <div class='botoes'>
                <div class='dropdown'>
                    <i class='fas fa-ellipsis-v dropdown-toggle ms-2 me-2 text-light'
                        data-bs-toggle='dropdown' id='dropdownMenuButton1' aria-expanded='false'></i>

                    <ul class='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                        <li class="copiar_message"><i class='fas fa-copy ms-3'></i> Copiar</li>
                        <li class="responser_message"><i class='fas fa-reply ms-3'></i> Responder</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class='me-3 ms-3' style='max-width: 50%;'>
            <span class='text-light' style='margin-top:-10px'>$hora <i
                class='fas fa-check  '></i></span>
        </div>
    </div>
`;

  let templeteOther = `
            <div class='d-flex flex-column align-items-start m-3'>
                <div class="me-3 ms-3 text-light">${message.author}</div>
                <div class='d-flex align-items-start justify-content-start opcoes-conversa'>
                    <div class='fundo-text'>
                        ${message.message}
                    </div>
                    <div class='botoes'>

                        <div class='dropdown'>
                            <i class='fas fa-ellipsis-v dropdown-toggle ms-2 me-2 text-light'
                                data-bs-toggle='dropdown' id='dropdownMenuButton1' aria-expanded='false'></i>

                            <ul class='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                <li class="copiar_message link-bg"><i class='fas fa-copy ms-3'></i> Copiar</li>
                                <li class="responser_message link-bg"><i class='fas fa-reply ms-3'></i> Responder</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class='me-3 ms-3' style='max-width: 50%;'>
                    <span class='text-light' style='margin-top:-10px'>$hora <i class='fas fa-check'></i></span>
                </div>
            </div>
`;

  if (message.author == conectado) {
    $(".mensagens-chat").append(templateYou);
  } else {
    $(".mensagens-chat").append(templeteOther);
  }

  var objDiv = document.getElementById("back-chat");
  objDiv.scrollTop = objDiv.scrollHeight;

  if (origem == "wppMessage") {
    executarAudioRecebimento();
  }
}
