import express from "express";
import { Livre } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { auth } from "../auth/auth.mjs";

const updateLivre = express();

updateLivre.put("/:id", (req, res) => {
  const idLivre = req.params.id;

  Livre.update(req.body,auth, { where: { id_ouvrage: idLivre } })
    .then((_) => {
      Livre.findByPk(idLivre).then((updatedLivre) => {
        if (updatedLivre === null) {
          const message =
            "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
          return res.status(404).json({ message });
        }

        const message = `Le livre ${updatedLivre.ouvTitre} dont l'id vaut ${updatedLivre.id_ouvrage} a été mis à jour avec succès`;
        res.json(success(message, updatedLivre));
      });
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { updateLivre };
