// id,nome, email, senha, imagem(imagem do google)
// criar, listar, atualizar, listar por id
import conn from "../config/conn.js";

const tableInscricoes = /*sql*/ `
    CREATE TABLE IF NOT EXISTS inscricoes(
        inscricao_id int auto_increment PRIMARY KEY,
        participanteId INT NOT NULL,
        eventoId INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        FOREIGN KEY (participanteId) REFERENCES participantes(participantes_id),
        FOREIGN KEY (eventoId) REFERENCES eventos(evento_id)
        )
`;
conn.query(tableInscricoes, (err) => {
  if (err) {
    console.error("Error ao criar a tabela" + err.stack);
    return;
  }
  console.log("Tabela [inscricoes] criada com sucesso");
});
