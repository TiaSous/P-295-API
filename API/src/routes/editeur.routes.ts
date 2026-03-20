import { Router } from "express";
import {
  getAllEditeurs,
  getEditeurById,
  createEditeur,
  updateEditeur,
  deleteEditeur,
} from "../controllers/editeur.controller";
import { paginationMiddleware } from "../middleware/query.middleware";
import { authMiddleware } from "../middleware/auth.middleware";

const editeurRouter = Router();

// Appliquer le middleware de pagination sur tous les GET
editeurRouter.use(paginationMiddleware);

editeurRouter.get("/", getAllEditeurs);
editeurRouter.get("/:id", getEditeurById);

// Routes protégées (POST, PUT, DELETE) - nécessite authentification
editeurRouter.post("/", authMiddleware, createEditeur);
editeurRouter.put("/:id", authMiddleware, updateEditeur);
editeurRouter.delete("/:id", authMiddleware, deleteEditeur);

export default editeurRouter;
