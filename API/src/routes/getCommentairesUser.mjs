import express from "express";
import { success } from "./helper.mjs";
import { Utilisateur, Commentaire } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const getAllComentaireUser = express();


getAllComentaireUser.get("/:id/commentaires", auth,(req, res) => {
    // cheche la catégorie via l'id
    Utilisateur.findByPk(req.params.id).then((user) => {
      if (user === null) {
        const message =
          "L'utilisateur demandée n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      // retourne les commentaire
      return Commentaire.findAndCountAll({ where: { fk_utilisateur: req.params.id },
       
      })
        .then((commentaire) => {
          // si aucun livre
          if (commentaire.count == 0) {
            const message =
              "Cet utilisateur n'a mis au aucun commentaire.";
            return res.status(200).json({ message });
          }
          // si réussie
          const message = "La liste des commentaires a bien été récupérée.";
          res.json(success(message, commentaire));
        })
        .catch((error) => {
          // si échoue
          const message =
            "La liste des commentaires n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
          res.status(500).json({ message, data: error });
        });
    });
  });

export {getAllComentaireUser};