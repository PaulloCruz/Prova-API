import { Router } from "express";
import {
  getInscricoes,
  postInscricoes,
} from "../controllers/inscricoesController.js";

const router = Router();

router.get("/inscrever", getInscricoes);
router.post("/inscrever", postInscricoes);

export default router;
