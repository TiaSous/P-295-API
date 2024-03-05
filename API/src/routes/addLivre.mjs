import express from "express";
import { success } from "./helper.mjs";
import { Livre } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const addLivre = express();

// Ajouter un livre
addLivre.post("/",auth, (req, res) => {
    // récupère les informations dans les
    const infoLivre = {...req.body};
    Livre.create(infoLivre).then((livre) => {
        const message = `Le livre ${livre.ouvTitre} a bien été créé !`;
        res.json(success(message, livre));
    }).catch((error) => {
        const message = "Le livre n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
    });
});

export {addLivre};

/*
exemple json (info minimum)
{
	"id_ouvrage": 8,
	"ouvTitre": "Alabama 1963",
	"fk_utilisateur": 1
}
*/