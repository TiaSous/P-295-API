import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { privateKey } from "../auth/private_key";

// Extension of Express Request to include user information from JWT
declare global {
  namespace Express {
    interface Request {
      user?: {
        id_utilisateur: number;
        utiPseudo: string;
        utiRole: string;
      };
    }
  }
}

// Middleware d'authentification JWT
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({
        success: false,
        message:
          "Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête Authorization: Bearer <token>",
      });
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Format d'authentification invalide. Utilisez: Authorization: Bearer <token>",
      });
    }

    const decodedToken = jwt.verify(token, privateKey) as {
      id_utilisateur: number;
      utiPseudo: string;
      utiRole: string;
    };

    req.user = decodedToken;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Le token a expiré",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Le token est invalide",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Erreur d'authentification",
    });
  }
};
