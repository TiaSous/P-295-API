import express from "express";
import { success } from "./helper.mjs";
import { Livre } from "../db/sequelize.mjs";

const getLivreId = express();

getLivreId.get("/:id", (req, res) => {
  Livre.findByPk(req.params.id)
    .then((livre) => {
      //vérifie si le livre avec existe
      if (livre === null) {
        const message =
          "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      const message = `Le livre dont l'id vau ${livre.id_ouvrage} a bien été récupéré.`;
      res.json(success(message, livre));
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { getLivreId };
