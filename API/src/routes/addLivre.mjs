import express from "express";
import { success } from "./helper.mjs";
import { Livre } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const addLivre = express();

/**
 * @swagger
 * /api/livres:
 *   post:
 *     tags: [Livres]
 *     security:
 *       - bearerAuth: []
 *     summary: Ajoute un nouveau livre.
 *     description: Permet d'ajouter un nouveau livre à la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ouvTitre:
 *                 type: string
 *                 description: Le titre du livre à ajouter.
 *                 example: "L'ordre du jour"
 *               ouvNbPage:
 *                 type: integer
 *                 description: Le nombre de pages du livre à ajouter.
 *                 example: 300
 *               ouvResume:
 *                 type: string
 *                 description: Le résumé du livre à ajouter.
 *                 example: "Un livre captivant qui parle de..."
 *               ouvAnneeEdition:
 *                 type: string
 *                 format: date
 *                 description: L'année d'édition du livre à ajouter.
 *                 example: "2023-01-01"
 *               ouvCouverture:
 *                 type: string
 *                 description: Le lien vers la couverture du livre à ajouter.
 *                 example: "https://example.com/couverture.jpg"
 *               ouvExtrait:
 *                 type: string
 *                 description: Un extrait du livre à ajouter.
 *                 example: "C'était une journée ensoleillée..."
 *               ouvMoyenneAppreciation:
 *                 type: integer
 *                 description: La moyenne d'appréciation du livre à ajouter.
 *                 example: 4
 *               fk_utilisateur:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur qui ajoute le livre.
 *                 example: 1
 *               fk_categorie:
 *                 type: integer
 *                 description: L'identifiant de la catégorie du livre à ajouter.
 *                 example: 2
 *               fk_ecrivain:
 *                 type: integer
 *                 description: L'identifiant de l'écrivain du livre à ajouter.
 *                 example: 2
 *               fk_editeur:
 *                 type: integer
 *                 description: L'identifiant de l'éditeur du livre à ajouter.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Livre ajouté avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation.
 *                   example: "Le livre a bien été créé !"
 */

// Ajouter un livre
addLivre.post("/", auth, (req, res) => {
  // récupère les informations dans le json fournit par le user
  const infoLivre = { ...req.body };
  // Créer le livre
  Livre.create(infoLivre)
    .then((livre) => {
      // si réussie
      const message = `Le livre ${livre.ouvTitre} a bien été créé !`;
      res.json(success(message, livre));
    })
    .catch((error) => {
      // si échoue
      const message =
        "Le livre n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { addLivre };

/*
exemple de uri: http://localhost:3000/api/livres

exemple json (info minimum)
{
	"ouvTitre": "Alabama 1963",
	"fk_utilisateur": 1,
	"fk_categorie": 1,
	"fk_ecrivain": 1,
	"fk_editeur": 1
}
*/
