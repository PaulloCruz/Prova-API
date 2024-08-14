import { response } from "express";
import conn from "../config/conn.js";

export const getInscricoes = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM inscricoes`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar inscricoes" });
      return;
    }
    const inscricoes = data;
    response.status(200).json(inscricoes);
  });
};

export const postInscricoes = (request, response) => {
  const { participanteId, eventoId } = request.body;

  if (!participanteId) {
    response
      .status(400)
      .json({ message: "O participante Id é um campo obrigatório" });
    return;
  }
  if (!eventoId) {
    response
      .status(400)
      .json({ message: "A evento Id é um campo obrigatório" });
    return;
  }
  const insertSQL = /*sql*/ ` INSERT INTO inscricoes (??,?? )
    VALUES
    (?,?)`;
  const insertData = ["participanteId", "eventoId", participanteId, eventoId];

  conn.query(insertSQL, insertData, (err) => {
    if (err) {
      console.error(err);
      response.status(500).json({ message: "erro ao Cadastrar inscrição" });
      return;
    }
    response.status(201).json({ message: "inscrição cadastrada com sucesso" });
  });
};
