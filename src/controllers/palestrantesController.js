import { response } from "express";
import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";
// criar, listar, atualizar, listar por id

export const getPalestrantes = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM palestrantes`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar palestrantes" });
      return;
    }
    const palestrantes = data;
    response.status(200).json(palestrantes);
  });
};

export const postPalestrantes = (request, response) => {
  const { nome, expertise } = request.body;

  if (!nome) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
    return;
  }
  if (!expertise) {
    response.status(400).json({ message: "A expertise é um campo obrigatório" });
    return;
  }
    const id = uuidv4();
    const insertSQL = /*sql*/ ` INSERT INTO palestrantes (??,??,?? )
    VALUES
    (?,?,?)`;
    const insertData = [
      "palestrante_id",
      "nome",
      "expertise",
      id,
      nome,
      expertise,
    ];

    conn.query(insertSQL, insertData, (err) => {
      if (err) {
        console.error(err);
        response.status(500).json({ message: "erro ao Cadastrar palestrante" });
        return;
      }
      response.status(201).json({ message: "palestrante cadastrado com sucesso" });
    })
}