const conexao = require("../infraestrutura/conexao");

class Chat {
  mensagem(mensagem) {
    const sql = "INSERT INTO chat SET ?";

    conexao.query(sql, mensagem, (erro, resultados) => {
      if (erro) {
        console.log(erro);
      }
      console.log(resultados);
    });
  }
}

module.exports = new Chat();
