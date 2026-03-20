import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";

// Middleware pour ajouter les paramètres de recherche standardisés
export const searchMiddleware = (searchFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.query.search && typeof req.query.search === "string") {
      const searchTerm = req.query.search.trim();
      const whereConditions = searchFields.map((field) => ({
        [field]: {
          [Op.like]: `%${searchTerm}%`,
        },
      }));
      res.locals.searchConditions = {
        [Op.or]: whereConditions,
      };
    } else {
      res.locals.searchConditions = {};
    }
    next();
  };
};

// Middleware pour la pagination
export const paginationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(100, parseInt(req.query.limit as string) || 10);
  const offset = (page - 1) * limit;

  res.locals.pagination = {
    limit,
    offset,
    page,
  };
  next();
};

// Helper pour construire les options de query Sequelize
export const buildQueryOptions = (
  searchConditions: any = {},
  pagination: any = {},
  include: any[] = [],
  order: any[] = [],
) => {
  const options: any = {
    where: searchConditions,
  };

  if (include.length > 0) {
    options.include = include;
  }

  if (order.length > 0) {
    options.order = order;
  }

  if (pagination.limit) {
    options.limit = pagination.limit;
    options.offset = pagination.offset;
  }

  return options;
};
