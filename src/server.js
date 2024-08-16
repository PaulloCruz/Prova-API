import "dotenv/config";
import express from "express";

//* conexão com banco de dados

//* Importação dos modulos e criação das tabelas
import "./models/palestrantesModel.js";
import "./models/eventosModel.js";
import "./models/participantesModel.js";
import "./models/incricaoModel.js";
import "./models/feedbackModel.js";

//* Importação das
import palestranteRoutes from "./routes/palestrantesRoutes.js";
import eventosRoutes from "./routes/eventosRoutes.js";
import participantesRoutes from "./routes/participantesRoutes.js";
import inscricoesRoutes from "./routes/incricoesRoutes.js";
import feedbacksRoutes from "./routes/feedbacksRoutes.js";

const PORT = process.env.PORT;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//* Utilização das ROTAS

app.use("/eventos", palestranteRoutes);
app.use("/eventos", eventosRoutes);
app.use("/eventos", participantesRoutes);
app.use("/eventos", inscricoesRoutes);
app.use("/eventos", feedbacksRoutes);

app.listen(PORT, () => {
  console.log("serv on port", PORT);
});
