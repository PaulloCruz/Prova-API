import { response } from "express";
import conn from "../config/conn.js";

export const getParticipantes = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM participantes`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar participantes" });
      return;
    }
    const participantes = data;
    response.status(200).json(participantes);
  });
};

export const postParticipantes = (request, response) => {
  const { nome, email } = request.body;

  if (!nome) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
    return;
  }
  if (!email) {
    response.status(400).json({ message: "A email é um campo obrigatório" });
    return;
  }
  const insertSQL = /*sql*/ ` INSERT INTO participantes (??,?? )
    VALUES
    (?,?)`;
  const insertData = ["nome", "email", nome, email];

  conn.query(insertSQL, insertData, (err) => {
    if (err) {
      console.error(err);
      response.status(500).json({ message: "erro ao Cadastrar participante" });
      return;
    }
    response
      .status(201)
      .json({ message: "participante cadastrado com sucesso" });
  });
};
