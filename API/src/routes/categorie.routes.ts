import { Router } from "express";
import {
  getAllCategories,
  getCategorieById,
  getLivresByCategorie,
  createCategorie,
} from "../controllers/categorie.controller";
import { paginationMiddleware } from "../middleware/query.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateBodyMiddleware } from "../middleware/validate.middleware";
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
