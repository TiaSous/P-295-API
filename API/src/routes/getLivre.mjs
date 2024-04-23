import express from "express";
import { success } from "./helper.mjs";
import { Livre } from "../db/sequelize.mjs";
// op = opérateur
import { Op } from "sequelize";

const getLivre = express();

getLivre.use(express.json());
/**
 * @swagger
 * /api/livres/:
 *   get:
 *     tags: [Livres]
 *     security:
 *       - bearerAuth: []
 *     summary: Récupère tous les livres.
 *     description: Récupère tous les livres. Peut être utilisé pour remplir un select HTML.
 *     responses:
 *       200:
 *         description: Tous les livres.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_ouvrage:
 *                       type: integer
 *                       description: L'identifiant unique du livre.
 *                       example: 1
 *                     ouvTitre:
 *                       type: string
 *                       description: Le titre du livre.
 *                       example: "L'ordre du Jour"
 *                     ouvNbPage:
 *                       type: integer
 *                       description: Le nombre de pages du livre.
 *                       example: 328
 *                     ouvResume:
 *                       type: string
 *                       description: Le résumé du livre.
 *                       example: "L'ordre du jour est un livre parlant de la 2nd guerre mondial."
 *                     ouvAnneeEdition:
 *                       type: string
 *                       format: date
 *                       description: L'année d'édition du livre.
 *                       example: "2016-06-08"
 *                     ouvCouverture:
 *                       type: string
 *                       description: Le lien vers la couverture du livre.
 *                       example: "https://example.com/couverture.jpg"
 *                     ouvExtrait:
 *                       type: string
 *                       description: Un extrait du livre.
 *                       example: "Ce n'était pas l'ordre du jour"
 *                     ouvMoyenneAppreciation:
 *                       type: integer
 *                       description: La moyenne d'appréciation du livre.
 *                       example: 4
 *                     fk_utilisateur:
 *                       type: integer
 *                       description: L'identifiant de l'utilisateur qui a ajouté le livre.
 *                       example: 1
 *                     fk_categorie:
 *                       type: integer
 *                       description: L'identifiant de la catégorie du livre.
 *                       example: 4
 *                     fk_ecrivain:
 *                       type: integer
 *                       description: L'identifiant de l'écrivain du livre.
 *                       example: 7
 *                     fk_editeur:
 *                       type: integer
 *                       description: L'identifiant de l'éditeur du livre.
 *                       example: 1
 */

// Récupère les livres
getLivre.get("/",(req, res) => {
  // s'il y un titre
  if (req.query.titre) {
    if (req.query.titre.length < 2) {
      const message = `Le terme de la recherche doit contenir au moins 2 caractères`;
      return res.status(400).json({ message });
    }
    let limit = 3;
    // s'il y a une limite
    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }
    // va trier par les paramètres mis
    return Livre.findAndCountAll({
      where: { ouvTitre: { [Op.like]: `%${req.query.titre}%` } },
      limit: limit,
    }).then((livres) => {
      const message = `Il y a ${livres.count} livres qui correspondent au terme de la recherche`;
      res.json(success(message, livres));
    });
  }
  // order par la date
  else if (req.query.order) {
    let limit = 3;
    // s'il y a une limite
    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }
    // va trier par les paramètres mis
    return Livre.findAndCountAll({
      limit: limit,
      order: [['ouvAnneeEdition', 'DESC']]
    }).then((livres) => {
      const message = `La liste de livres qui correspondent au terme de la recherche a été récupérer`;
      res.json(success(message, livres));
    });
  }
  // pour si il y a une limite
  else if(req.query.limit)
  {
    let limit = 3;
    limit = parseInt(req.query.limit);
    // va trier par les paramètres mis
    return Livre.findAndCountAll({
      limit: limit,
    }).then((livres) => {
      const message = `La liste de livres qui correspondent au terme de la recherche a été récupérer`;
      res.json(success(message, livres));
    });
  }
  // va afficher tout les livres
  Livre.findAll()
    .then((livres) => {
      // si réussie
      const message = "La liste des livres a bien été récupérée.";
      res.status(200).json(success(message, livres));
    })
    .catch((error) => {
      // si échoue
      const message =
        "La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { getLivre };
/*
exemple de uri: http://localhost:3000/api/livres

exemple de uri avec recherche: http://localhost:3000/api/livres?titre=ha&limit=1
*/