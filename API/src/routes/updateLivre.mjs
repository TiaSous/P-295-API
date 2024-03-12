import express from "express";
import { Livre } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { auth } from "../auth/auth.mjs";

const updateLivre = express();

/**
 * @swagger
 * /api/livres/{id}:
 *   put:
 *     tags: [Livres]
 *     security:
 *       - bearerAuth: []
 *     summary: Met à jour un livre existant.
 *     description: Permet de mettre à jour les informations d'un livre existant dans la base de données.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant du livre à mettre à jour.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ouvTitre:
 *                 type: string
 *                 description: Le nouveau titre du livre.
 *                 example: "L'ordre du jour"
 *               ouvNbPage:
 *                 type: integer
 *                 description: Le nouveau nombre de pages du livre.
 *                 example: 400
 *               ouvResume:
 *                 type: string
 *                 description: Le nouveau résumé du livre.
 *                 example: "Un nouveau résumé captivant..."
 *               ouvAnneeEdition:
 *                 type: string
 *                 format: date
 *                 description: La nouvelle année d'édition du livre.
 *                 example: "2024-01-01"
 *               ouvCouverture:
 *                 type: string
 *                 description: Le nouveau lien vers la couverture du livre.
 *                 example: "https://example.com/nouvelle-couverture.jpg"
 *               ouvExtrait:
 *                 type: string
 *                 description: Le nouveau extrait du livre.
 *                 example: "C'était une journée ensoleillée..."
 *               ouvMoyenneAppreciation:
 *                 type: integer
 *                 description: La nouvelle moyenne d'appréciation du livre.
 *                 example: 2
 *               fk_utilisateur:
 *                 type: integer
 *                 description: Le nouvel identifiant de l'utilisateur associé au livre.
 *                 example: 2
 *               fk_categorie:
 *                 type: integer
 *                 description: Le nouvel identifiant de la catégorie du livre.
 *                 example: 1
 *               fk_ecrivain:
 *                 type: integer
 *                 description: Le nouvel identifiant de l'écrivain du livre.
 *                 example: 1
 *               fk_editeur:
 *                 type: integer
 *                 description: Le nouvel identifiant de l'éditeur du livre.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Livre mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation.
 *                   example: "Le livre dont l'id vaut {id} a été mis à jour avec succès"
 */

// met à jour un livre
updateLivre.put("/:id", auth,(req, res) => {
  // récupère l'id
  const idLivre = req.params.id;
  Livre.update(req.body, { where: { id_ouvrage: idLivre } })
    .then((_) => {
      // va chercher le livre
      Livre.findByPk(idLivre).then((updatedLivre) => {
        if (updatedLivre === null) {
          const message =
            "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
          return res.status(404).json({ message });
        }
        // si réussie
        const message = `Le livre ${updatedLivre.ouvTitre} dont l'id vaut ${updatedLivre.id_ouvrage} a été mis à jour avec succès`;
        res.json(success(message, updatedLivre));
      });
    })
    .catch((error) => {
      //si échoue
      const message =
        "Le livre n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { updateLivre };

/*
exemple de uri: http://localhost:3000/api/livres/1

exemple de json : 
{
	"ouvTitre": "Le TÔNE DE CUIVRE"
}

*/