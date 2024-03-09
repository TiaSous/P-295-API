import express from "express";
import { success } from "./helper.mjs";
import { Livre } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const getLivreId = express();

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