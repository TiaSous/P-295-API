import express from "express";
import { success } from "./helper.mjs";
import { Livre, Utilisateur, Ecrivain } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";
import { Categorie } from "../db/sequelize.mjs";

const getAllLivresCategorie = express();

/**
 * @swagger
 * /api/categories/{id}/livres:
 *   get:
 *     tags: [Livres]
 *     security:
 *       - bearerAuth: []
 *     summary: Récupère tous les livres d'une catégorie par son ID.
 *     description: Récupère tous les livres associés à une catégorie spécifique en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la catégorie pour laquelle récupérer les livres.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tous les livres de la catégorie.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_ouvrage:
 *                     type: integer
 *                     description: L'identifiant unique du livre.
 *                     example: 1
 *                   ouvTitre:
 *                     type: string
 *                     description: Le titre du livre.
 *                     example: "L'ordre du Jour"
 *                   ouvNbPage:
 *                     type: integer
 *                     description: Le nombre de pages du livre.
 *                     example: 328
 *                   ouvResume:
 *                     type: string
 *                     description: Le résumé du livre.
 *                     example: "L'ordre du jour est un livre parlant de la 2nd guerre mondial."
 *                   ouvAnneeEdition:
 *                     type: string
 *                     format: date
 *                     description: L'année d'édition du livre.
 *                     example: "2016-06-08"
 *                   ouvCouverture:
 *                     type: string
 *                     description: Le lien vers la couverture du livre.
 *                     example: "https://example.com/couverture.jpg"
 *                   ouvExtrait:
 *                     type: string
 *                     description: Un extrait du livre.
 *                     example: "Ce n'était pas l'ordre du jour"
 *                   ouvMoyenneAppreciation:
 *                     type: integer
 *                     description: La moyenne d'appréciation du livre.
 *                     example: 4
 *                   fk_utilisateur:
 *                     type: integer
 *                     description: L'identifiant de l'utilisateur qui a ajouté le livre.
 *                     example: 1
 *                   fk_categorie:
 *                     type: integer
 *                     description: L'identifiant de la catégorie du livre.
 *                     example: 4
 *                   fk_ecrivain:
 *                     type: integer
 *                     description: L'identifiant de l'écrivain du livre.
 *                     example: 7
 *                   fk_editeur:
 *                     type: integer
 *                     description: L'identifiant de l'éditeur du livre.
 *                     example: 1
 */

// Récupère tous les livres d'une catégorie
getAllLivresCategorie.get("/:id/livres", (req, res) => {
  // cheche la catégorie via l'id
  Categorie.findByPk(req.params.id).then((category) => {
    if (category === null) {
      const message =
        "La categorie demandée n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ message });
    }
    // retourne les livres
    return Livre.findAndCountAll({ where: { fk_categorie: req.params.id }, include: [{
      model: Ecrivain,
      require: true,
      attributes: ["id_ecrivain", "ecrNom", "ecrPrenom"]
    },
    {
      model: Utilisateur,
      require: true,
      attributes: ["id_utilisateur", "utiPseudo"]
    },
    {
      model: Categorie,
      require: true,
      attributes: ["id_categorie", "catNom"]
    }
  ] })
      .then((livres) => {
        // si aucun livre
        if (livres.count == 0) {
          const message =
            "Aucun livres de cette catégorie n'existe. Merci de réessayer avec un autre identifiant.";
          return res.status(200).json({ message });
        }
        // si réussie
        const message = "La liste des livres a bien été récupérée.";
        res.json(success(message, livres));
      })
      .catch((error) => {
        // si échoue
        const message =
          "La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
});

export { getAllLivresCategorie };

// http://localhost:3000/api/categories/1/livres
