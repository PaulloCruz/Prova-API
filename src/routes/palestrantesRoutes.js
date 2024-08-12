import { Router } from "express";
import {
  getPalestrantes,
  postPalestrantes,
} from "../controllers/palestrantesController.js";

const router = Router();

router.get("/palestrantes", getPalestrantes);
router.post("/palestrantes", postPalestrantes);

export default router;
