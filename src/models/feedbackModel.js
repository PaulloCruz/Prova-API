import conn from "../config/conn.js";

const tableFeedbacks = /*sql*/ `
    CREATE TABLE IF NOT EXISTS feedbacks(
        feedback_id int auto_increment PRIMARY KEY ,
        participanteId INT NOT NULL,
        eventoId INT NOT NULL,
        nota INT NOT NULL,
        comentario VARCHAR(255) NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        FOREIGN KEY (participanteId) REFERENCES participantes(participantes_id),
        FOREIGN KEY (eventoId) REFERENCES eventos(evento_id)
        )
`;

conn.query(tableFeedbacks, (err) => {
  if (err) {
    console.error("Error ao criar a tabela" + err.stack);
    return;
  }
  console.log("Tabela [feedbacks] criada com sucesso");
});
