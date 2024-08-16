import conn from "../config/conn.js";

const tableEventos = /*sql*/ `
    CREATE TABLE IF NOT EXISTS eventos(
        evento_id int auto_increment PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        data date NOT NULL,
        palestrante_id VARCHAR(255) NOT NULL,


        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
`;

conn.query(tableEventos, (err, result, field) => {
  if (err) {
    console.error("Error ao criar a tabela" + err.stack);
    return;
  }
  console.log("Tabela [eventos] criada com sucesso");
});
