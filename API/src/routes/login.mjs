import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Utilisateur } from "../db/sequelize.mjs";
import { privateKey } from "../auth/private_key.mjs";

// route pour se loger et générer un token
const loginRouter = express();
loginRouter.post("/", (req, res) => {
  // va chercher l'utilisateur
  Utilisateur.findOne({ where: { utiPseudo: req.body.username } })
    .then((user) => {
      // si l'utilisateur n'existe pas
      if (!user) {
        const message = `L'utilisateur demandé n'existe pas`;
        return res.status(404).json({ message });
      }
      // va cripter le mdp pour voir si c'est le même qui est stocké
      bcrypt
        .compare(req.body.password, user.utiMotDePasse)
        .then((isPasswordValid) => {
          // si mdp invalide
          if (!isPasswordValid) {
            const message = `Le mot de passe est incorrecte.`;
            return res.status(401).json({ message });
          } else {
            // génére un token (expire 1)
            const token = jwt.sign({ userId: user.id_utilisateur }, privateKey, {
              expiresIn: "1y",
            });
            // si réussie
            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user, token });
          }
        });
    })
    .catch((error) => {
      // si échoue
      const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants`;
      return res.json({ message, data: error });
    });
});

export { loginRouter };

/*
exemple de uri: http://localhost:3000/api/login

exemple json:
{
	"username": "Tiago",
	"password": "1234"
}
*/