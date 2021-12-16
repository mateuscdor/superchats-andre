import Socket from "./conectarSocketIo.js";
import Conversas from "./conversas.js";
import RetornarNumero from "./retornarNumero.js";
import { enviarMensagem } from "./enviarMensagem.js";
import { preventF5 } from "./preventF5.js";
import { recarregarDiv } from "./recarregar-div.js";
import { mensagensInternas } from "./mensagensInternas.js";
import { esconderNotificacao } from "./esconderNotificacao.js";

let socket = new Socket();
let retornar = new RetornarNumero();
let conversas = new Conversas();

//conecta ao websocket
socket.conectarSocketIo(ip_servidor, conversas, retornar);

conversas.procurarConversas(ip_servidor);
let chatConversas = conversas.retornarValor();
console.log(chatConversas);
conversas.renderConversas(chatConversas);
conversas.adicionarEventoConversa(ip_servidor, retornar);

//retorna a conexão do websocket para usar em outras funções
let ipSocket = socket.retornarSocket();

enviarMensagem(conectado, retornar, ipSocket, ip_servidor);
recarregarDiv();
mensagensInternas();
esconderNotificacao();

preventF5(ip_servidor, retornar.retornarNumero());
