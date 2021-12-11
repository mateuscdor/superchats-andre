export default class RetornarNumero {
  numero = null;

  pegarNumero(numeroFunction) {
    console.log(numeroFunction);
    this.numero = numeroFunction;
  }
  retornarNumero() {
    console.log(this.numero);
    return this.numero;
  }
}
