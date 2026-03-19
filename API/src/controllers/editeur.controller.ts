import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { Editeur } from "../db/sequelize";
import { CreateEditeurDto, UpdateEditeurDto } from "../models/dto/author.dto";

// GET /editeurs - Get all publishers
export const getAllEditeurs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pagination = res.locals.pagination || {};

    const options: any = {};

    if (pagination.limit) {
      options.limit = pagination.limit;
      options.offset = pagination.offset;
    }

    const { count, rows } = await Editeur.findAndCountAll(options);

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

// GET /editeurs/:id - Get a publisher by ID
export const getEditeurById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);

    const editeur = await Editeur.findByPk(id);

    if (!editeur) {
      return res
        .status(404)
        .json({ success: false, message: "Éditeur non trouvé" });
    }

    res.status(200).json({ success: true, data: editeur });
  } catch (error) {
    next(error);
  }
};

// POST /editeurs - Create a new publisher
export const createEditeur = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate the DTO
    const dto = plainToInstance(CreateEditeurDto, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.map((e) => ({
          property: e.property,
          constraints: e.constraints,
        })),
      });
    }

    const editeur = await Editeur.create({ ediNom: dto.ediNom });

    res.status(201).json({ success: true, data: editeur });
  } catch (error) {
    next(error);
  }
};

// PUT /editeurs/:id - Update a publisher
export const updateEditeur = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);

    // Validate the DTO
    const dto = plainToInstance(UpdateEditeurDto, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.map((e) => ({
          property: e.property,
          constraints: e.constraints,
        })),
      });
    }

    const editeur = await Editeur.findByPk(id);
    if (!editeur) {
      return res
        .status(404)
        .json({ success: false, message: "Éditeur non trouvé" });
    }

    const updates: any = {};
    if (dto.ediNom !== undefined) updates.ediNom = dto.ediNom;

    await editeur.update(updates);

    res.status(200).json({ success: true, data: editeur });
  } catch (error) {
    next(error);
  }
};

// DELETE /editeurs/:id - Delete a publisher
export const deleteEditeur = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);

    const editeur = await Editeur.findByPk(id);
    if (!editeur) {
      return res
        .status(404)
        .json({ success: false, message: "Éditeur non trouvé" });
    }

    await editeur.destroy();

    res
      .status(200)
      .json({ success: true, message: "Éditeur supprimé avec succès" });
  } catch (error) {
    next(error);
  }
};
