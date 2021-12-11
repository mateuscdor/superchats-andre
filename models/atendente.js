const conexao = require("../infraestrutura/conexao");

class Atendente {
  atendente = [];

  buscarAtendente(idAtendente) {
    const sql = `SELECT * FROM atendentes WHERE id = ${idAtendente}`;

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        console.log(erro);
      }
      var atendenteJson = JSON.parse(JSON.stringify(resultados));

      this.atendente = atendenteJson;
    });
  }

  retornarAtendente() {
    return this.atendente;
  }
}

module.exports = new Atendente();
