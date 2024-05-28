import express from "express";
import { success } from "./helper.mjs";
import { Editeur } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const getEditeur = express();

getEditeur.get("/", auth,(req, res) => {
    Editeur.findAll()
      .then((editeurs) => {
        // si réussie
        const message = "La liste des editeurs a bien été récupérée.";
        res.json(success(message, editeurs));
      })
      .catch((error) => {
        // si échoue
        const message =
          "La liste des editeurs n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
  
  export { getEditeur };