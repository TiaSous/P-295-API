import express from "express";
import { success } from "./helper.mjs";
import { Livre } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const deleteLivre = express();

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