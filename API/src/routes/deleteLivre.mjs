import express from "express";
import { success } from "./helper.mjs";
import { Livre } from "../db/sequelize.mjs";
import { Commentaire } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const deleteLivre = express();

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
      // détruit les commentaires
      // Commentaire.destroy({
      //   where: {fk_ouvrage: deletedLivre.id_ouvrage}
      // }).then((_) => {
      // });
      // détruit le livre
      Livre.destroy({
        where: { id_ouvrage: deletedLivre.id_ouvrage },
      }).then((_) => {
        const message = `Le livre ${deletedLivre.ouvTitre} et tout ses commentaires a bien été supprimé !`;
        res.json(success(message, deletedLivre));
      });
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { deleteLivre };
