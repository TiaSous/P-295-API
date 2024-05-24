import express from "express";
import { success } from "./helper.mjs";
import { Commentaire } from "../db/sequelize.mjs";

const getCommentaire = express();

/**
 * @swagger
 * /api/commentaires:
 *   get:
 *     tags: [Commentaires]
 *     security:
 *       - bearerAuth: []
 *     summary: Récupère tous les commentaires.
 *     description: Récupère tous les commentaires. Peut être utilisé pour afficher les avis sur les livres.
 *     responses:
 *       200:
 *         description: Tous les commentaires.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_commentaire:
 *                   type: integer
 *                   description: L'identifiant unique du commentaire.
 *                   example: 1
 *                 comAppreciation:
 *                   type: integer
 *                   description: L'appréciation associée au commentaire.
 *                   minimum: 1
 *                   maximum: 5
 *                   example: 4
 *                 comCommentaire:
 *                   type: string
 *                   description: Le commentaire.
 *                   example: "Très bon livre, je le recommande !"
 *                 fk_ouvrage:
 *                   type: integer
 *                   description: L'identifiant de l'ouvrage associé.
 *                   example: 1
 *                 fk_utilisateur:
 *                   type: integer
 *                   description: L'identifiant de l'utilisateur associé.
 *                   example: 4
 */

// Récupère toutes les commentaires
getCommentaire.get("/", (req, res) => {
  Commentaire.findAll()
    .then((commentaires) => {
      // si réussie
      const message = "La liste des commentaires a bien été récupérée.";
      res.json(success(message, commentaires));
    })
    .catch((error) => {
      // si échoue
      const message =
        "La liste des commentaires n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { getCommentaire };

// exemple de uri: http://localhost:3000/api/categories