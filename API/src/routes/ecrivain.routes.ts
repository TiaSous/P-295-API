import { Router } from "express";
import {
  getAllEcrivains,
  getEcrivainById,
  createEcrivain,
  updateEcrivain,
  deleteEcrivain,
} from "../controllers/ecrivain.controller";
import { paginationMiddleware } from "../middleware/queryMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";

const ecrivainRouter = Router();

// Appliquer le middleware de pagination sur tous les GET
ecrivainRouter.use(paginationMiddleware);

ecrivainRouter.get("/", getAllEcrivains);
ecrivainRouter.get("/:id", getEcrivainById);

// Routes protégées (POST, PUT, DELETE) - nécessite authentification
ecrivainRouter.post("/", authMiddleware, createEcrivain);
ecrivainRouter.put("/:id", authMiddleware, updateEcrivain);
ecrivainRouter.delete("/:id", authMiddleware, deleteEcrivain);

export default ecrivainRouter;
