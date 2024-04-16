import express from "express";
import { success } from "./helper.mjs";
import { Commentaire } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";
import { ValidationError } from "sequelize";

const addCommentaire = express();

/**
 * @swagger
 * /api/commentaires:
 *   post:
 *     tags: [Commentaires]
 *     security:
 *       - bearerAuth: []
 *     summary: Ajoute un nouveau commentaire.
 *     description: Permet d'ajouter un nouveau commentaire à la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comAppreciation:
 *                 type: integer
 *                 description: L'appréciation associée au commentaire.
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               comCommentaire:
 *                 type: string
 *                 description: Le commentaire à ajouter.
 *                 example: "Très bon livre, je le recommande !"
 *               fk_ouvrage:
 *                 type: integer
 *                 description: L'identifiant de l'ouvrage associé.
 *                 example: 1
 *               fk_utilisateur:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur associé.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Commentaire ajouté avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation.
 *                   example: "Le commentaire a bien été créé."
 */

// ajouter un commentaire
addCommentaire.post("/",auth, (req, res) => {
    // récupère les informations json mis par l'utilisateur (exemple en bas)
    const infoCommentaire = {...req.body};

    // Créer le commentaire
    Commentaire.create(infoCommentaire).then((commentaires) => {
        // si réussie
        const message = `Le commentaire a bien été créé !`;
        res.json(success(message, commentaires));
    }).catch((error) => {
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error });
          }
        // si échoue
        const message = "La commentaire n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
    });
});

export {addCommentaire};

/*
exemple de uri: http://localhost:3000/api/commentaires

exemple json (info minimum)
{
	"comCommentaire": "Incroyable !",
	"comAppreciation": 5,
	"fk_ouvrage": 1,
	"fk_utilisateur": 1
}
*/