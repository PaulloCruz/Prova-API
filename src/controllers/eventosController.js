import { request, response } from "express";
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
  const checkSql = /*sql*/ `
  select * from eventos
  where ?? = ? and
  ?? = ? 
  `;

  const checkSqlData = ["titulo", titulo, "data", data];

  conn.query(checkSql, checkSqlData, (err, date) => {
    if (date.length > 0) {
      response.status(409).json({ message: "Evento já existente" });
      return;
    }
    const insertSQL = /*sql*/ ` INSERT INTO eventos (??,??,??)
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
export const getEventosPopular = (request, response) => {
  const sql = /*sql*/ `select eventoId, count(*) from inscricoes group by eventoId order by count(*) desc limit 1;`;

  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar eventos" });
      return;
    }
    const Id_Do_evento_Popular = data[0].eventoId;
    const Quantidade_de_inscricoes = data[0].count;
    response.status(200).json({ Id_Do_evento_Popular });
  });
};
export const getMeusEventos = (request, response) => {
  const { participanteId } = request.params;
  const sql = /*sql*/ `select * from inscricoes where ?? = ?;`;
  const insertData = ["participanteId", participanteId];

  conn.query(sql, insertData, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar evento" });
      return;
    }
    const meuEvento = data;
    response.status(200).json({ meuEvento });
  });
};
export const deletEventos = (request, response) => {
  const { eventoId } = request.body;
  const Eventoid = eventoId

  const sql = /*sql*/ `delete from eventos where ?? = ?;`;
  const insertData = ["id", Eventoid];

  conn.query(sql, insertData, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar evento" });
      return;
    }
    response.status(200).json({message:"evento deletado com sucesso!" });
  });
};

// faltou apenas as funções para percorrer tudo e listar tudo, porem a logica de buscar pelo id e etc ta pegando, mais 30 minutos e conseguia eu acho
