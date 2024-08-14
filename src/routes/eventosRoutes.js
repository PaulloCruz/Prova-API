import { Router } from "express";
import {
  getEventos,
  getEventosAgenda,
  postEventos,
} from "../controllers/eventosController.js";

const router = Router();

router.get("/criar", getEventos);
router.post("/criar", postEventos);
router.get("/agenda", getEventosAgenda);

export default router;
