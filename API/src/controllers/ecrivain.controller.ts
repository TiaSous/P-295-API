import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { Ecrivain } from "../db/sequelize";
import { CreateEcrivainDto, UpdateEcrivainDto } from "../models/dto/author.dto";

// GET /ecrivains - Get all authors
export const getAllEcrivains = async (
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

    const { count, rows } = await Ecrivain.findAndCountAll(options);

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

// GET /ecrivains/:id - Get an author by ID
export const getEcrivainById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);

    const ecrivain = await Ecrivain.findByPk(id);

    if (!ecrivain) {
      return res
        .status(404)
        .json({ success: false, message: "Écrivain non trouvé" });
    }

    res.status(200).json({ success: true, data: ecrivain });
  } catch (error) {
    next(error);
  }
};

// POST /ecrivains - Create a new author
export const createEcrivain = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate the DTO
    const dto = plainToInstance(CreateEcrivainDto, req.body);
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

    const ecrivain = await Ecrivain.create({
      ecrNom: dto.ecrNom,
      ecrPrenom: dto.ecrPrenom,
    });

    res.status(201).json({ success: true, data: ecrivain });
  } catch (error) {
    next(error);
  }
};

// PUT /ecrivains/:id - Update an author
export const updateEcrivain = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);

    // Validate the DTO
    const dto = plainToInstance(UpdateEcrivainDto, req.body);
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

    const ecrivain = await Ecrivain.findByPk(id);
    if (!ecrivain) {
      return res
        .status(404)
        .json({ success: false, message: "Écrivain non trouvé" });
    }

    const updates: any = {};
    if (dto.ecrNom !== undefined) updates.ecrNom = dto.ecrNom;
    if (dto.ecrPrenom !== undefined) updates.ecrPrenom = dto.ecrPrenom;

    await ecrivain.update(updates);

    res.status(200).json({ success: true, data: ecrivain });
  } catch (error) {
    next(error);
  }
};

// DELETE /ecrivains/:id - Delete an author
export const deleteEcrivain = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);

    const ecrivain = await Ecrivain.findByPk(id);
    if (!ecrivain) {
      return res
        .status(404)
        .json({ success: false, message: "Écrivain non trouvé" });
    }

    await ecrivain.destroy();

    res
      .status(200)
      .json({ success: true, message: "Écrivain supprimé avec succès" });
  } catch (error) {
    next(error);
  }
};
