import express from "express";
import { success } from "./helper.mjs";
import { Categorie } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const getCategorieId = express();

// Récupère un livre
getCategorieId.get("/:id", auth, (req, res) => {
  // cherche une catégorie selon l'id mis
  Categorie.findByPk(req.params.id)
    .then((categorie) => {
      // si le livre n'existe pas
      if (categorie === null) {
        const message =
          "La catégorie demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      // si réussie
      const message = `Le catégorie dont l'id vau ${categorie.id_categorie} a bien été récupéré.`;
      res.json(success(message, categorie));
    })
    .catch((error) => {
      // si échoue
      const message =
        "La catégorie n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { getCategorieId };

// exemple de uri: http://localhost:3000/api/categorie/1