import { Router } from "express";
import {
  getParticipantes,
  postParticipantes,
} from "../controllers/participantesController.js";

const router = Router();

router.get("/registrar", getParticipantes);
router.post("/registrar", postParticipantes);

export default router;
