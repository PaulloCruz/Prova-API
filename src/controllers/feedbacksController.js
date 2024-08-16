import { response } from "express";
import conn from "../config/conn.js";

export const getFeedbacks = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM feedbacks`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar feedbacks" });
      return;
    }
    const feedbacks = data;
    response.status(200).json(feedbacks);
  });
};
export const postFeedbacks = (request, response) => {
  const { participanteId, eventoId, nota, comentario } = request.body;

  //   participanteId INT NOT NULL,
  //   eventoId INT NOT NULL,
  //   nota INT NOT NULL,
  //   comentario VARCHAR(255) NOT NULL,

  if (!participanteId) {
    response
      .status(400)
      .json({ message: "O id do participante é um campo obrigatório" });
    return;
  }
  if (!eventoId) {
    response
      .status(400)
      .json({ message: "O id do evento é um campo obrigatório" });
    return;
  }
  if (!nota) {
    response.status(400).json({ message: "A nota é um campo obrigatório" });
    return;
  }
  if (!comentario) {
    response
      .status(400)
      .json({ message: "O comentario é um campo obrigatório" });
    return;
  }

  const checkSql = /*sql*/ `
  select * from feedbacks
  where ?? = ? and
  ?? = ? 
  `;

  const checkSqlData = ["participanteId", participanteId, "eventoId", eventoId];

  conn.query(checkSql, checkSqlData, (err, data) => {
    if (data.length > 0) {
      response.status(409).json({ message: "Feedback já existente" });
      return;
    }
    const insertSQL = /*sql*/ ` INSERT INTO feedbacks (??,??,??,?? )
    VALUES
    (?,?,?,?)`;
    const insertData = [
      "participanteId",
      "eventoId",
      "nota",
      "comentario",
      participanteId,
      eventoId,
      nota,
      comentario,
    ];

    conn.query(insertSQL, insertData, (err) => {
      if (err) {
        console.error(err);
        response.status(500).json({ message: "erro ao Cadastrar Feedback" });
        return;
      }
      response.status(201).json({ message: "Feedback cadastrado com sucesso" });
    });
  });
};

// SELECT column_name, COUNT(*)
// FROM participantes
// GROUP BY column_name
// ORDER BY COUNT(*) DESC;
//
