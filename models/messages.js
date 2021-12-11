const conexao = require("../infraestrutura/conexao");

class Messages {
  messages = [];
  conversas = [];

  buscarConversasNumero(numero) {
    const sql = `SELECT * FROM chat WHERE to_number = ${numero} ORDER BY id ASC`;

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        console.log(erro + "deu erro");
      }
      var mensagens = JSON.parse(JSON.stringify(resultados));
      console.log(mensagens);
      this.conversas = mensagens;
    });
  }

  buscarMessages(destino, conectado) {
    const sql = `SELECT * FROM chat WHERE from_number = ${destino} and to_number = ${conectado} or  from_number = ${conectado} and to_number = ${destino} ORDER BY id ASC`;

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        console.log(erro + "deu erro");
      }
      var mensagens = JSON.parse(JSON.stringify(resultados));

      this.messages = mensagens;
    });
  }

  retornarDados() {
    return this.messages;
  }

  retornarConversas() {
    return this.conversas;
  }
}

module.exports = new Messages();
