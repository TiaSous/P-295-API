import express from "express";
import { success } from "./helper.mjs";
import { Livre } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const getAllLivresCategorie = express();

// Récupère tous les livres d'une catégorie
getAllLivresCategorie.get("/:id/livres", auth, (req, res) => {
  // met dans une variable l'id de la catégorie
  const idCategorie = req.params.id;

  // récupère tout les livresqui sont de la catégorie
  Livre.findAll({ where: { fk_categorie: idCategorie } })
    .then((livres) => {
      // si aucun livre
      if (livres.length == 0) {
        const message =
          "Aucun livres de cette catégorie n'existe. Merci de réessayer avec un autre identifiant.";
        return res.status(200).json({ message });
      }
      // si réussie
      const message = "La liste des livres a bien été récupérée.";
      res.json(success(message, livres));
    })
    .catch((error) => {
      // si échoue
      const message =
        "La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { getAllLivresCategorie };

// http://localhost:3000/api/categories/1/livres
