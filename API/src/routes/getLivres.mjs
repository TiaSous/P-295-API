import express from "express";
import { success } from "./helper.mjs";
import { Livre } from "../db/sequelize.mjs";
// op = opérateur
import { Op } from "sequelize";

const getLivres = express();

getLivres.get("/", (req, res) => {
  // s'il y une recherche pas titre
  if (req.query.titre) {
    if (req.query.titre.length < 2) {
      const message = `Le terme de la recherche doit contenir au moins 2 caractères`;
      return res.status(400).json({ message });
    }
    let limit = 3;
    // s'il y a une limite
    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }
    // va trier par les paramètres mis
    return Livre.findAndCountAll({
      where: { name: { [Op.like]: `%${req.query.titre}%` } },
      limit: limit,
    }).then((livres) => {
      const message = `Il y a ${livres.count} livres qui correspondent au terme de la recherche`;
      res.json(success(message, livres));
    });
  }
  // va afficher tout les livres
  Livre.findAll( {attributes: { exclude: ['updatedAt','createdAt'] }})
    .then((livres) => {
      const lbresbycategorie=f
      const message = "La liste des livres a bien été récupérée.";
      res.json(success(message, livres));
    })
    .catch((error) => {
      const message =
        "La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { getLivres };
