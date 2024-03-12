import express from "express";
import { success } from "./helper.mjs";
import { Categorie } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const addCategorie = express();

/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     summary: Ajoute une nouvelle catégorie.
 *     description: Permet d'ajouter une nouvelle catégorie à la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catNom:
 *                 type: string
 *                 description: Le nom de la catégorie à ajouter.
 *                 example: "Horreur"
 *     responses:
 *       200:
 *         description: Catégorie ajoutée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation.
 *                   example: "La catégorie avec l'ID {id} a bien été créée !"
 */


// ajouter une catégorie
addCategorie.post("/",auth, (req, res) => {
    // récupere  l'information du json données (exemple en bas minimum)
    const infoCategorie = {...req.body};

    // Créer la catégorie
    Categorie.create(infoCategorie).then((categorie) => {
        // si réussie
        const message = `La catégorie avec l'ID ${categorie.id_categorie} a bien été créée !`;
        res.json(success(message, categorie));
    }).catch((error) => {
        // si échoue
        const message = "La catégorie n'a pas pu être ajoutée. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
    });
});

export { addCategorie };                        

/*
exemple de uri: http://localhost:3000/api/categories

exemple json (info minimum)
{	
	"id_categorie": 7,
	"catNom": "Horreur"
}
*/