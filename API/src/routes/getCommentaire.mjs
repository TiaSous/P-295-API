import express from "express";
import { success } from "./helper.mjs";
import { Commentaire } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const getCommentaire = express();

getCommentaire.get("/", auth, (req, res) => {
  // va afficher tout les catégories
  Commentaire.findAll()
    .then((commentaires) => {
      const message = "La liste des commentaires a bien été récupérée.";
      res.json(success(message, commentaires));
    })
    .catch((error) => {
      const message =
        "La liste des commentaires n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { getCommentaire };