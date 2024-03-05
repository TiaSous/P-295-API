import express from "express";
import { success } from "./helper.mjs";
import { Commentaire } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const getCommentaire = express();
// Récupère toutes les commentaires
getCommentaire.get("/", auth, (req, res) => {
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