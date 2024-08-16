import { Router } from "express";
import {
  getEventos,
  getEventosAgenda,
  postEventos,
  getEventosPopular,
  getMeusEventos,
  deletEventos
} from "../controllers/eventosController.js";

const router = Router();

router.get("/criar", getEventos);
router.post("/criar", postEventos);
router.get("/agenda", getEventosAgenda);
router.get("/mais-popular", getEventosPopular);
router.get("/meus-eventos/:participanteId", getMeusEventos);
router.delete("/cancelar", deletEventos);

export default router;
