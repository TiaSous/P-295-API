import { Router } from "express";
import {
  getAllLivres,
  getLivreById,
  getCommentairesByLivre,
  createLivre,
  updateLivre,
  deleteLivre,
} from "../controllers/livre.controller";
import {
  paginationMiddleware,
  searchMiddleware,
} from "../middleware/query.middleware";
import { authMiddleware } from "../middleware/auth.middleware";

const livreRouter = Router();

// Appliquer les middlewares de pagination et recherche
livreRouter.use(paginationMiddleware);
livreRouter.use(searchMiddleware(["ouvTitre", "ouvResume"]));

livreRouter.get("/", getAllLivres);
livreRouter.get("/:id", getLivreById);
livreRouter.get("/:id/commentaires", getCommentairesByLivre);
livreRouter.post("/", authMiddleware, createLivre);
livreRouter.put("/:id", authMiddleware, updateLivre);
livreRouter.delete("/:id", authMiddleware, deleteLivre);

export default livreRouter;
