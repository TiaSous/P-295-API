import express from "express";
import { success } from "./helper.mjs";
import { Livre } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const getLivreId = express();

/**
 * @swagger
 * /api/livres/{id}:
 *   get:
 *     tags: [Livres]
 *     security:
 *       - bearerAuth: []
 *     summary: Récupère un livre par son ID.
 *     description: Récupère un livre spécifique en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du livre à récupérer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Le livre demandé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_ouvrage:
 *                   type: integer
 *                   description: L'identifiant unique du livre.
 *                   example: 1
 *                 ouvTitre:
 *                   type: string
 *                   description: Le titre du livre.
 *                   example: "L'ordre du Jour"
 *                 ouvNbPage:
 *                   type: integer
 *                   description: Le nombre de pages du livre.
 *                   example: 328
 *                 ouvResume:
 *                   type: string
 *                   description: Le résumé du livre.
 *                   example: "L'ordre du jour est un livre parlant de la 2nd guerre mondial."
 *                 ouvAnneeEdition:
 *                   type: string
 *                   format: date
 *                   description: L'année d'édition du livre.
 *                   example: "2016-06-08"
 *                 ouvCouverture:
 *                   type: string
 *                   description: Le lien vers la couverture du livre.
 *                   example: "https://example.com/couverture.jpg"
 *                 ouvExtrait:
 *                   type: string
 *                   description: Un extrait du livre.
 *                   example: "Ce n'était pas l'ordre du jour"
 *                 ouvMoyenneAppreciation:
 *                   type: integer
 *                   description: La moyenne d'appréciation du livre.
 *                   example: 4
 *                 fk_utilisateur:
 *                   type: integer
 *                   description: L'identifiant de l'utilisateur qui a ajouté le livre.
 *                   example: 1
 *                 fk_categorie:
 *                   type: integer
 *                   description: L'identifiant de la catégorie du livre.
 *                   example: 4
 *                 fk_ecrivain:
 *                   type: integer
 *                   description: L'identifiant de l'écrivain du livre.
 *                   example: 7
 *                 fk_editeur:
 *                   type: integer
 *                   description: L'identifiant de l'éditeur du livre.
 *                   example: 1
 */

// Récupère un livre
getLivreId.get("/:id", auth, (req, res) => {
  // cherche un livre selon l'id mis
  Livre.findByPk(req.params.id)
    .then((livre) => {
      // si le livre n'existe pas
      if (livre === null) {
        const message =
          "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      // si réussie
      const message = `Le livre dont l'id vau ${livre.id_ouvrage} a bien été récupéré.`;
      res.json(success(message, livre));
    })
    .catch((error) => {
      // si échoue
      const message =
        "Le livre n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { getLivreId };

// exemple de uri: http://localhost:3000/api/livres/1