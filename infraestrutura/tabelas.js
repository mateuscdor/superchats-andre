class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarChat();
    this.criarAtendente();
  }

  criarChat() {
    const sql =
      "CREATE TABLE IF NOT EXISTS chat (id int NOT NULL AUTO_INCREMENT, session varchar(255), from_number varchar(45),to_number varchar(45), content varchar(255), type varchar(45) , file_name varchar(255),created_at datetime NOT NULL, PRIMARY KEY(id))";

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela chat criada com sucesso");
      }
    });
  }

  criarAtendente() {
    const sql =
      "CREATE TABLE IF NOT EXISTS atendentes (id int NOT NULL AUTO_INCREMENT, nome varchar(255),sobrenome varchar(255),email varchar(255),senha varchar(255), nivel_acesso varchar(255), status varchar(255), PRIMARY KEY(id))";

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela atendentes criada com sucesso");
      }
    });
  }
}

module.exports = new Tabelas();
