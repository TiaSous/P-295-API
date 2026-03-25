import { Request, Response, NextFunction } from "express";

// Interface pour les erreurs personnalisées
interface AppError extends Error {
  status?: number;
}

// Middleware de gestion des erreurs globales
export const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.status || 500;
  const message = err.message || "Une erreur serveur est survenue";

  console.error(`[Error ${status}] ${message}`, err);

  res.status(status).json({
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? err : undefined,
  });
};
