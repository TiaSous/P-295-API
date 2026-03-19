import { Request, Response, NextFunction } from "express";
import { Utilisateur, Livre, Commentaire, Ecrivain } from "../db/sequelize";

// GET /user/:id/livres - Récupérer les livres d'un utilisateur
export const getLivresByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);

    // Vérifier que l'utilisateur existe
    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }

    const livres = await Livre.findAndCountAll({
      where: { fk_utilisateur: id },
      include: [
        {
          model: Ecrivain,
          attributes: ["id_ecrivain", "ecrNom", "ecrPrenom"],
          as: "Ecrivain",
        },
        {
          model: Utilisateur,
          attributes: ["id_utilisateur", "utiPseudo"],
          as: "Utilisateur",
        },
      ],
    });

    if (livres.count === 0) {
      return res.status(200).json({
        success: true,
        message: "Cet utilisateur n'a pas proposé de livre.",
        data: [],
      });
    }

    res.status(200).json({ success: true, data: livres });
  } catch (error) {
    next(error);
  }
};

// GET /user/:id/commentaires - Récupérer les commentaires d'un utilisateur
export const getCommentairesByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);

    // Vérifier que l'utilisateur existe
    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }

    const commentaires = await Commentaire.findAll({
      where: { fk_utilisateur: id },
      include: [
        { model: Livre, attributes: ["id_ouvrage", "ouvTitre"], as: "Livre" },
      ],
    });

    res.status(200).json({ success: true, data: commentaires });
  } catch (error) {
    next(error);
  }
};
