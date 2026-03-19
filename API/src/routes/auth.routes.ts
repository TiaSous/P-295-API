import { Router } from "express";
import { login, register } from "../controllers/auth.controller";

const authRouter = Router();

// Routes publiques (pas d'authentification requise)
authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;
