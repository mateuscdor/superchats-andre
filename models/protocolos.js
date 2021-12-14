const conexao = require("../infraestrutura/conexao");

class Protocolo {
  criarProtocolo(protocolo) {
    const sql = "INSERT INTO protocolo SET ?";

    conexao.query(sql, protocolo, (erro, resultados) => {
      if (erro) {
        console.log(erro);
      }
      console.log(resultados);
    });
  }

  buscarProtocolos(contato) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM protocolo WHERE contato=${contato}`;

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          console.log(resultados);
        });
        var protocolo = JSON.parse(JSON.stringify(resultados));

        resolve(protocolo);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Protocolo();
