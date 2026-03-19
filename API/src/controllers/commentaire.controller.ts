import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { Commentaire, Utilisateur, Livre } from "../db/sequelize";
import {
  CreateCommentaireDto,
  UpdateCommentaireDto,
} from "../models/dto/commentaire.dto";

// GET /commentaires - Get all comments
export const getAllCommentaires = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pagination = res.locals.pagination || {};

    const options: any = {
      include: [
        {
          model: Utilisateur,
          attributes: ["id_utilisateur", "utiPseudo"],
          as: "Utilisateur",
        },
        { model: Livre, attributes: ["id_ouvrage", "ouvTitre"], as: "Livre" },
      ],
    };

    if (pagination.limit) {
      options.limit = pagination.limit;
      options.offset = pagination.offset;
    }

    const { count, rows } = await Commentaire.findAndCountAll(options);

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

// POST /commentaires - Create new comments
export const createCommentaire = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Valider le DTO
    const dto = plainToInstance(CreateCommentaireDto, req.body);
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

    // Récupérer l'ID utilisateur depuis req.user
    const fk_utilisateur = (req as any).user?.id_utilisateur;
    if (!fk_utilisateur) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non authentifié",
      });
    }

    const livre = await Livre.findByPk(dto.fk_ouvrage);
    if (!livre) {
      return res
        .status(404)
        .json({ success: false, message: "Livre non trouvé" });
    }

    const utilisateur = await Utilisateur.findByPk(fk_utilisateur);
    if (!utilisateur) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }

    const commentaire = await Commentaire.create({
      comAppreciation: dto.comAppreciation,
      comCommentaire: dto.comCommentaire,
      fk_ouvrage: dto.fk_ouvrage,
      fk_utilisateur,
    });

    const commentaireWithRelations = await Commentaire.findByPk(
      commentaire.id_commentaire,
      {
        include: [
          {
            model: Utilisateur,
            attributes: ["id_utilisateur", "utiPseudo"],
            as: "Utilisateur",
          },
          { model: Livre, attributes: ["id_ouvrage", "ouvTitre"], as: "Livre" },
        ],
      },
    );

    res.status(201).json({ success: true, data: commentaireWithRelations });
  } catch (error) {
    next(error);
  }
};
