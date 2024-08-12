// id,nome, email, senha, imagem(imagem do google)
// criar, listar, atualizar, listar por id
import conn from "../config/conn.js";

const tablePalestrante = /*sql*/ `
    CREATE TABLE IF NOT EXISTS palestrantes(
        palestrante_id  VARCHAR(60) PRIMARY KEY ,
        nome VARCHAR(255) NOT NULL,
        expertise VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
`;

conn.query(tablePalestrante, (err, result, field) => {
  if (err) {
    console.error("Error ao criar a tabela" + err.stack);
    return;
  }
  //   console.log(result);
  // console.log(field);
  console.log("Tabela [palestrantes] criada com sucesso");
});
