import { Router } from "express";
import {
  getAllCommentaires,
  createCommentaire,
} from "../controllers/commentaire.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateBodyMiddleware } from "../middleware/validate.middleware";
import { CreateCommentaireDto } from "../models/dto/commentaire.dto";

const commentaireRouter = Router();

commentaireRouter.get("/:id", getAllCommentaires);
commentaireRouter.post(
  "/",
  authMiddleware,
  validateBodyMiddleware(CreateCommentaireDto),
  createCommentaire,
);

export default commentaireRouter;
