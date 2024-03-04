import express from "express";
import { success } from "./helper.mjs";
import { Livre } from "../db/sequelize.mjs";

const getAllLivresCategorie = express();

getAllLivresCategorie.get("/:id/livres", (req, res) => {
    const idCategorie = req.params.id;
    Livre.findAll({where: {fk_categorie: idCategorie}})
    .then((livres) => {
        if (livres.length == 0)
        {
            const message =
            "Aucun livres de cette catégorie n'existe. Merci de réessayer avec un autre identifiant.";
            return res.status(200).json({ message });
        }
        console.log(livres);
      const message = "La liste des livres a bien été récupérée.";
      res.json(success(message, livres));
    })
    .catch((error) => {
      const message =
        "La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export {getAllLivresCategorie};
