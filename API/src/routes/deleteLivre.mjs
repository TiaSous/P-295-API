import express from "express";
import { success } from "./helper.mjs";
import { Livre } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const deleteLivre = express();

/**
 * @swagger
 * /api/livres/{id}:
 *   delete:
 *     tags: [Livres]
 *     security:
 *       - bearerAuth: []
 *     summary: Supprime un livre.
 *     description: Supprime un livre de la base de données en fonction de son identifiant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'identifiant du livre à supprimer.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Livre supprimé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation.
 *                   example: "Le livre et tout ses commentaires a bien été supprimé !"
 */

// Détruit le livre indiqué par l'id
deleteLivre.delete("/:id", auth, (req, res) => {
  // recherche dans les livres pour trouver le livre
  Livre.findByPk(req.params.id)
    .then((deletedLivre) => {
      // si le produit existe pas
      if (deletedLivre === null) {
        const message =
          "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      // détruit le livre et ses commentaires
      Livre.destroy({
        where: { id_ouvrage: deletedLivre.id_ouvrage },
      }).then((_) => {
        // si réussie
        const message = `Le livre ${deletedLivre.ouvTitre} et tout ses commentaires a bien été supprimé !`;
        res.json(success(message, deletedLivre));
      });
    })
    .catch((error) => {
      // si échoue
      const message =
        "Le livre n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { deleteLivre };

// exemple de uri: http://localhost:3000/api/livres/3