import express from "express";
import { success } from "./helper.mjs";
import { Livre } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const addLivre = express();

// Ajouter un livre
addLivre.post("/",auth, (req, res) => {
    // récupère les informations dans le json fournit par le user
    const infoLivre = {...req.body};
    // Créer le livre
    Livre.create(infoLivre).then((livre) => {
        // si réussie
        const message = `Le livre ${livre.ouvTitre} a bien été créé !`;
        res.json(success(message, livre));
    }).catch((error) => {
        // si échoue
        const message = "Le livre n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
    });
});

export {addLivre};

/*
exemple de uri: http://localhost:3000/api/livres

exemple json (info minimum)
{
	"ouvTitre": "Alabama 1963",
	"fk_utilisateur": 1
}
*/