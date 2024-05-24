import express from "express";
import { success } from "./helper.mjs";
import { Ecrivain } from "../db/sequelize.mjs";

const getEcrivain = express();

getEcrivain.get("/", (req, res) => {
    Ecrivain.findAll()
      .then((ecrivains) => {
        // si réussie
        const message = "La liste des ecrivains a bien été récupérée.";
        res.json(success(message, ecrivains));
      })
      .catch((error) => {
        // si échoue
        const message =
          "La liste des ecrivains n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
  
  export { getEcrivain };