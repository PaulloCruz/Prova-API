import { response } from "express";
import conn from "../config/conn.js";
// criar, listar, atualizar, listar por id

export const getEventos = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM eventos`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar eventos" });
      return;
    }
    const eventos = data;
    response.status(200).json(eventos);
  });
};
export const postEventos = (request, response) => {
  const { titulo, data, palestrantesId } = request.body;

  console.log(palestrantesId);

  if (!titulo) {
    response.status(400).json({ message: "O titulo é um campo obrigatório" });
    return;
  }
  if (!data) {
    response.status(400).json({ message: "A data é um campo obrigatório" });
    return;
  }
  if (!palestrantesId) {
    response
      .status(400)
      .json({ message: "o palestrante é um campo obrigatório" });
    return;
  }
  const insertSQL = /*sql*/ ` INSERT INTO eventos (??,??,?? )
    VALUES
    (?,?,?)`;
  const insertData = [
    "titulo",
    "data",
    "palestrante_id",
    titulo,
    data,
    palestrantesId,
  ];

  conn.query(insertSQL, insertData, (err) => {
    if (err) {
      console.error(err);
      response.status(500).json({ message: "erro ao Cadastrar evento" });
      return;
    }
    response.status(201).json({ message: "evento cadastrado com sucesso" });
  });
};
export const getEventosAgenda = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM eventos`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar eventos" });
      return;
    }
    const eventos = data;
    const palestrantes_id = data[1].palestrante_id.split(",");

    // console.log(palestrantes_id[0]);
  
    const linha_id = palestrantes_id[0];
    const sql = /*sql*/ `select * from palestrantes where ?? = ?`;
    const sqlData = ["palestrante_id", linha_id];

    conn.query(sql, sqlData, (err, data) => {
      if (err) {
        response.status(500).json({ message: "Erro ao buscar palestrante" });
        return console.log(err);
      }

      if (data.length === 0) {
        response.status(404).json({ message: "palestrante não encontrado" });
        return console.log(linha_id);
      }

      const eventos2 = data[0];
      response.status(200).json(eventos2);
    });
  });
};
// faltou apenas as funções para percorrer tudo e listar tudo, porem a logica de buscar pelo id e etc ta pegando, mais 30 minutos e conseguia eu acho