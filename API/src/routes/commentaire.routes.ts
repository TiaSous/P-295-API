import { Router } from "express";
import {
  getAllCommentaires,
  createCommentaire,
} from "../controllers/commentaire.controller";
import { paginationMiddleware } from "../middleware/queryMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";

const commentaireRouter = Router();

// Appliquer le middleware de pagination sur tous les GET
commentaireRouter.use(paginationMiddleware);

commentaireRouter.get("/", getAllCommentaires);
commentaireRouter.post("/", authMiddleware, createCommentaire);

export default commentaireRouter;
