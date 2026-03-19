import { Router } from "express";
import livreRouter from "./livre.routes";
import commentaireRouter from "./commentaire.routes";
import categorieRouter from "./categorie.routes";
import editeurRouter from "./editeur.routes";
import ecrivainRouter from "./ecrivain.routes";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";

const router = Router();

router.use("/livres", livreRouter);
router.use("/commentaires", commentaireRouter);
router.use("/categories", categorieRouter);
router.use("/editeurs", editeurRouter);
router.use("/ecrivains", ecrivainRouter);
router.use("/user", userRouter);
router.use("/", authRouter);

export default router;
