class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarChat();
    this.criarAtendente();
    this.criarProtocolo();
    this.criarNotificacoes();
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

  criarProtocolo() {
    const sql = `CREATE TABLE IF NOT EXISTS protocolo (
      id int NOT NULL AUTO_INCREMENT,
      nome varchar(255),
      contato varchar(255),
      email varchar(255),
      empresa varchar(255),
      protocolo varchar(255),
      PRIMARY KEY(id))`;

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela protocolo criada com sucesso");
      }
    });
  }

  criarNotificacoes() {
    const sql = `
    CREATE TABLE IF NOT EXISTS notificacoes(
      id int NOT NULL AUTO_INCREMENT,
      fone varchar(255),
      PRIMARY KEY(id)
    )
    `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela notificacoes criada com sucesso");
      }
    });
  }
}

module.exports = new Tabelas();
