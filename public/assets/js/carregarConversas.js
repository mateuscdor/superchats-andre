import Conversas from "./conversas.js";

let conversas = new Conversas();
conversas.procurarConversas();
let chatConversas = conversas.retornarValor();

console.log(chatConversas);

conversas.renderConversas(chatConversas);
