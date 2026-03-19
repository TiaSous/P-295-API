import { Router } from "express";
import {
  getCommentairesByUser,
  getLivresByUser,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/:id/commentaires", getCommentairesByUser);
userRouter.get("/:id/livres", getLivresByUser);

export default userRouter;
