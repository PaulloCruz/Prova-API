
import conn from "../config/conn.js";

const tableParticipante = /*sql*/ `
    CREATE TABLE IF NOT EXISTS participantes(
        participantes_id int auto_increment PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
`;

conn.query(tableParticipante, (err, result, field) => {
  if (err) {
    console.error("Error ao criar a tabela" + err.stack);
    return;
  }
  //   console.log(result);
  // console.log(field);
  console.log("Tabela [participantes] criada com sucesso");
});
