import express from "express";
import { success } from "./helper.mjs";
import { Categorie } from "../db/sequelize.mjs";
import { Op } from "sequelize";
import { auth } from "../auth/auth.mjs";

const getCategorie = express();

// Récupère une catégorie
getCategorie.get("/", auth, (req, res) => {
  // Ajout de la recherche par nom de catégorie
  if (req.query.nom) {
    if (req.query.nom.length < 2) {
      const message = `Le terme de la recherche doit contenir au moins 2 caractères`;
      return res.status(400).json({ message });
    }
    // Limit le nombre de résultats
    let limit = 3;
    console.log(req.query.limit)
    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }

    // retourne les catégories correspondant aux critères
    return Categorie.findAndCountAll({
      where: { catNom: { [Op.like]: `%${req.query.nom}%` } },
      limit: limit,
    }).then((categories) => {
      const message = `Il y a ${categories.count} catégories qui correspondent au terme de la recherche`;
      res.json(success(message, categories));
    });
  }
  // Affiche toutes les catégories si aucune recherche spécifique n'est effectuée
  Categorie.findAll()
    .then((categories) => {
      // si réussie
      const message = "La liste des catégories a bien été récupérée.";
      res.json(success(message, categories));
    })
    .catch((error) => {
      // si échoue
      const message =
        "La liste des catégories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { getCategorie };

/*
exemple de uri: http://localhost:3000/api/categories

exemple de uri avec recherche: http://localhost:3000/api/categories?nom=or&limit=2
*/