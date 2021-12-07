const conexao = require("../infraestrutura/conexao");

class Messages {
  messages = [];

  buscarMessages(destino, conectado) {
    const sql = `SELECT * FROM chat WHERE from_number = ${destino} and to_number = ${conectado} or  from_number = ${conectado} and to_number = ${destino}`;

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        console.log(erro + "deu erro");
      }
      var mensagens = JSON.parse(JSON.stringify(resultados));
      mensagens.forEach((element) => {
        this.messages.push(element);
      });
    });
  }

  retornarDados() {
    return this.messages;
  }
}

module.exports = new Messages();
