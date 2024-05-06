import express from "express";
import { success } from "./helper.mjs";
import { Livre } from "../db/sequelize.mjs";
import { Utilisateur, Ecrivain } from "../db/sequelize.mjs";
import { Op } from "sequelize";

const getAllLivreUser = express();

// Récupère tous les livres d'une catégorie
getAllLivreUser.get("/:id/livres", (req, res) => {
  // cheche la catégorie via l'id
  
  Utilisateur.findByPk(req.params.id).then((user) => {
    if (user === null) {
      const message =
        "L'utilisateur demandée n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ message });
    }
    // retourne les livres
    return Livre.findAndCountAll({ where: { fk_utilisateur: req.params.id },
        include: [{
            model: Ecrivain,
            require: true,
            attributes: ["id_ecrivain", "ecrNom", "ecrPrenom"]
          },
          {
            model: Utilisateur,
            require: true,
            attributes: ["id_utilisateur", "utiPseudo"],
            
          }]
    })
      .then((livres) => {
        // si aucun livre
        if (livres.count == 0) {
          const message =
            "Cet utilisateur n'a pas proposé au livre.";
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
});

export { getAllLivreUser };

