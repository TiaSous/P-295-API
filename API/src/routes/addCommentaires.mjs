import express from "express";
import { success } from "./helper.mjs";
import { Commentaire } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const addCommentaire = express();

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
        // si échoue
        const message = "La commentaire n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
    });
});

export {addCommentaire};

/*
exemple json (info minimum)
{
	"id_commentaire":5,
	"comCommentaire": "Incroyable !",
	"fk_ouvrage": 1,
	"fk_utilisateur": 1
}
*/