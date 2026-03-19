import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import { Categorie, Livre } from "../db/sequelize";
import { CreateCategorieDto } from "../models/dto/categorie.dto";

// GET /categories - Get all categories
export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let pagination = res.locals.pagination || {};
    let where: any = {};

    // For exact match search using "nomprecis" query param
    if (req.query.nomprecis && typeof req.query.nomprecis === "string") {
      const categories = await Categorie.findAll({
        where: { catNom: req.query.nomprecis },
      });
      return res.status(200).json({ success: true, data: categories });
    }

    // For partial match search using "nom" query param
    if (req.query.nom && typeof req.query.nom === "string") {
      if (req.query.nom.length < 2) {
        return res.status(400).json({
          success: false,
          message:
            "Le terme de la recherche doit contenir au moins 2 caractères",
        });
      }
      pagination.limit = Math.min(
        100,
        parseInt(req.query.limit as string) || 3,
      );
      where = { catNom: { [Op.like]: `%${req.query.nom}%` } };
    }

    const options: any = { where };

    if (pagination.limit) {
      options.limit = pagination.limit;
      options.offset = pagination.offset;
    }

    const { count, rows } = await Categorie.findAndCountAll(options);

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: pagination.page,
        limit: pagination.limit,
        pages: Math.ceil(count / pagination.limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /categories/:id - Get a category by ID
export const getCategorieById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);

    const categorie = await Categorie.findByPk(id);

    if (!categorie) {
      return res
        .status(404)
        .json({ success: false, message: "Catégorie non trouvée" });
    }

    res.status(200).json({ success: true, data: categorie });
  } catch (error) {
    next(error);
  }
};

// GET /categories/:id/livres - Get all books in a category
export const getLivresByCategorie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);

    const categorie = await Categorie.findByPk(id);
    if (!categorie) {
      return res
        .status(404)
        .json({ success: false, message: "Catégorie non trouvée" });
    }

    const livres = await Livre.findAll({
      where: { fk_categorie: id },
    });

    res.status(200).json({ success: true, data: livres });
  } catch (error) {
    next(error);
  }
};

// POST /categories - Create a new category
export const createCategorie = async (
  req: Request<{}, {}, CreateCategorieDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { catNom } = req.body;

    if (!catNom) {
      return res.status(400).json({
        success: false,
        message: "Le nom de la catégorie est requis",
      });
    }

    const categorie = await Categorie.create({ catNom });

    res.status(201).json({ success: true, data: categorie });
  } catch (error) {
    next(error);
  }
};
