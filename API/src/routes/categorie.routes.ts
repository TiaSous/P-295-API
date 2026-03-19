import { Router } from "express";
import {
  getAllCategories,
  getCategorieById,
  getLivresByCategorie,
  createCategorie,
} from "../controllers/categorie.controller";
import { paginationMiddleware } from "../middleware/queryMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateBodyMiddleware } from "../middleware/validateMiddleware";
import { CreateCategorieDto } from "../models/dto/categorie.dto";

const categorieRouter = Router();

// Appliquer le middleware de pagination sur tous les GET
categorieRouter.use(paginationMiddleware);

categorieRouter.get("/", getAllCategories);
categorieRouter.get("/:id", getCategorieById);
categorieRouter.get("/:id/livres", getLivresByCategorie);
categorieRouter.post(
  "/",
  authMiddleware,
  validateBodyMiddleware(CreateCategorieDto),
  createCategorie,
);

export default categorieRouter;
