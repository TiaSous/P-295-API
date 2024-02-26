import express from "express";
import { success } from "./helper.mjs";
import { Livre } from "../db/sequelize.mjs";

const addLivre = express();

// si le livre existe déjà (même titre) alors impossible de post
addLivre.post("/", (req, res) => {
    const infoLivre = {...req.body};
    Livre.create(infoLivre).then((livre) => {
        const message = `Le livre ${livre.titre} a bien été créé !`;
        res.json(success(message, livre));
    }).catch((error) => {
        const message = "Le livre n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
    });
});

export {addLivre};