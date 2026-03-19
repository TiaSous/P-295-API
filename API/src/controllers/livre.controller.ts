import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import {
  sequelize,
  Livre,
  Categorie,
  Ecrivain,
  Editeur,
  Utilisateur,
  Commentaire,
} from "../db/sequelize";
import { CreateLivreDto, UpdateLivreDto } from "../models/dto/livre.dto";

// GET /livres - Get all books with optional title filtering
export const getAllLivres = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let searchConditions = res.locals.searchConditions || {};
    let pagination = res.locals.pagination || {};
    let order: any = undefined;

    // Support for "titre" query param
    if (req.query.titre && typeof req.query.titre === "string") {
      if (req.query.titre.length < 2) {
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
      searchConditions = { ouvTitre: { [Op.like]: `%${req.query.titre}%` } };
    }
    // Support for "order" query param for DESC sorting
    else if (req.query.order === "true") {
      pagination.limit = Math.min(
        100,
        parseInt(req.query.limit as string) || 3,
      );
      order = [["id_ouvrage", "DESC"]];
    }
    // Support for "limit" query param alone
    else if (req.query.limit && typeof req.query.limit === "string") {
      pagination.limit = Math.min(100, parseInt(req.query.limit));
    }

    const options: any = {
      where: searchConditions,
      include: [
        {
          model: Categorie,
          attributes: ["id_categorie", "catNom"],
          as: "Categorie",
        },
        {
          model: Ecrivain,
          attributes: ["id_ecrivain", "ecrNom", "ecrPrenom"],
          as: "Ecrivain",
        },
        { model: Editeur, attributes: ["id_editeur", "ediNom"], as: "Editeur" },
        {
          model: Utilisateur,
          attributes: ["id_utilisateur", "utiPseudo"],
          as: "Utilisateur",
        },
      ],
    };

    if (order) {
      options.order = order;
    }

    if (pagination.limit) {
      options.limit = pagination.limit;
      options.offset = pagination.offset;
    }

    const { count, rows } = await Livre.findAndCountAll(options);

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

// GET /livres/:id - Get a book by ID
export const getLivreById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);

    const livre = await Livre.findByPk(id, {
      include: [
        {
          model: Categorie,
          attributes: ["id_categorie", "catNom"],
          as: "Categorie",
        },
        {
          model: Ecrivain,
          attributes: ["id_ecrivain", "ecrNom", "ecrPrenom"],
          as: "Ecrivain",
        },
        { model: Editeur, attributes: ["id_editeur", "ediNom"], as: "Editeur" },
        {
          model: Utilisateur,
          attributes: ["id_utilisateur", "utiPseudo"],
          as: "Utilisateur",
        },
      ],
    });

    if (!livre) {
      return res
        .status(404)
        .json({ success: false, message: "Livre non trouvé" });
    }

    res.status(200).json({ success: true, data: livre });
  } catch (error) {
    next(error);
  }
};

// GET /livres/:id/commentaires - Get comments for a book
export const getCommentairesByLivre = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);

    // Verify that the book exists
    const livre = await Livre.findByPk(id);
    if (!livre) {
      return res
        .status(404)
        .json({ success: false, message: "Livre non trouvé" });
    }

    const commentaires = await Commentaire.findAll({
      where: { fk_ouvrage: id },
      include: [
        {
          model: Utilisateur,
          attributes: ["id_utilisateur", "utiPseudo"],
          as: "Utilisateur",
        },
      ],
    });

    res.status(200).json({ success: true, data: commentaires });
  } catch (error) {
    next(error);
  }
};

// POST /livres - Create a new book
export const createLivre = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate the DTO
    const dto = plainToInstance(CreateLivreDto, req.body);
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

    // Get user ID from req.user (set by authMiddleware)
    const fk_utilisateur = (req as any).user?.id_utilisateur;
    if (!fk_utilisateur) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non authentifié",
      });
    }

    const livre = await Livre.create({
      ouvTitre: dto.ouvTitre,
      ouvNbPage: dto.ouvNbPage,
      ouvResume: dto.ouvResume,
      ouvAnneeEdition: dto.ouvAnneeEdition
        ? new Date(dto.ouvAnneeEdition)
        : undefined,
      ouvCouverture: dto.ouvCouverture,
      ouvExtrait: dto.ouvExtrait,
      fk_utilisateur,
      fk_categorie: dto.fk_categorie,
      fk_ecrivain: dto.fk_ecrivain,
      fk_editeur: dto.fk_editeur,
      ouvMoyenneAppreciation: 0,
    });

    const livreWithRelations = await Livre.findByPk(livre.id_ouvrage, {
      include: [
        {
          model: Categorie,
          attributes: ["id_categorie", "catNom"],
          as: "Categorie",
        },
        {
          model: Ecrivain,
          attributes: ["id_ecrivain", "ecrNom", "ecrPrenom"],
          as: "Ecrivain",
        },
        { model: Editeur, attributes: ["id_editeur", "ediNom"], as: "Editeur" },
        {
          model: Utilisateur,
          attributes: ["id_utilisateur", "utiPseudo"],
          as: "Utilisateur",
        },
      ],
    });

    res.status(201).json({ success: true, data: livreWithRelations });
  } catch (error) {
    next(error);
  }
};

// PUT /livres/:id - Update a book
export const updateLivre = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);

    // Validate the DTO
    const dto = plainToInstance(UpdateLivreDto, req.body);
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

    const livre = await Livre.findByPk(id);
    if (!livre) {
      return res
        .status(404)
        .json({ success: false, message: "Livre non trouvé" });
    }

    const updates: any = {};
    if (dto.ouvTitre !== undefined) updates.ouvTitre = dto.ouvTitre;
    if (dto.ouvNbPage !== undefined) updates.ouvNbPage = dto.ouvNbPage;
    if (dto.ouvResume !== undefined) updates.ouvResume = dto.ouvResume;
    if (dto.ouvAnneeEdition !== undefined)
      updates.ouvAnneeEdition = new Date(dto.ouvAnneeEdition);
    if (dto.ouvCouverture !== undefined)
      updates.ouvCouverture = dto.ouvCouverture;
    if (dto.ouvExtrait !== undefined) updates.ouvExtrait = dto.ouvExtrait;
    if (dto.fk_categorie !== undefined) updates.fk_categorie = dto.fk_categorie;
    if (dto.fk_ecrivain !== undefined) updates.fk_ecrivain = dto.fk_ecrivain;
    if (dto.fk_editeur !== undefined) updates.fk_editeur = dto.fk_editeur;

    await livre.update(updates);

    const updatedLivre = await Livre.findByPk(id, {
      include: [
        {
          model: Categorie,
          attributes: ["id_categorie", "catNom"],
          as: "Categorie",
        },
        {
          model: Ecrivain,
          attributes: ["id_ecrivain", "ecrNom", "ecrPrenom"],
          as: "Ecrivain",
        },
        { model: Editeur, attributes: ["id_editeur", "ediNom"], as: "Editeur" },
        {
          model: Utilisateur,
          attributes: ["id_utilisateur", "utiPseudo"],
          as: "Utilisateur",
        },
      ],
    });

    res.status(200).json({ success: true, data: updatedLivre });
  } catch (error) {
    next(error);
  }
};

// DELETE /livres/:id - Delete a book
export const deleteLivre = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);

    const livre = await Livre.findByPk(id);
    if (!livre) {
      return res
        .status(404)
        .json({ success: false, message: "Livre non trouvé" });
    }

    await livre.destroy();

    res
      .status(200)
      .json({ success: true, message: "Livre supprimé avec succès" });
  } catch (error) {
    next(error);
  }
};
