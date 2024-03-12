import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Utilisateur } from "../db/sequelize.mjs";
import { privateKey } from "../auth/private_key.mjs";

const loginRouter = express();

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Authentification]
 *     summary: Génère un token d'authentification.
 *     description: Permet à un utilisateur de s'authentifier et de générer un token d'accès.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Le nom d'utilisateur de l'utilisateur.
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur.
 *                 example: "motdepasse123"
 *     responses:
 *       200:
 *         description: Token généré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token d'accès généré.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 */

// route pour se loger et générer un token
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