import { Router } from "express";
import {
  getFeedbacks,
  postFeedbacks,
} from "../controllers/feedbacksController.js";

const router = Router();

router.get("/feedback", getFeedbacks);
router.post("/feedback", postFeedbacks);

export default router;
