import "dotenv/config";
import express from "express";

//* conexão com banco de dados

//* Importação dos modulos e criação das tabelas
import "./models/palestrantesModel.js";

//* Importação das ROTAS
import palestranteRoutes from "./routes/palestrantesRoutes.js";

const PORT = process.env.PORT;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//* Utilização das ROTAS

app.use("/eventos", palestranteRoutes);

app.listen(PORT, () => {
  console.log("serv on port", PORT);
});
