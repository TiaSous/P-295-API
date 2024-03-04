import express from "express";
import { success } from "./helper.mjs";
import { Commentaire } from "../db/sequelize.mjs";

const addCommentaire = express();

// si le livre existe déjà (même titre) alors impossible de post
addCommentaire.post("/", (req, res) => {
    const infoCommentaire = {...req.body};
    Commentaire.create(infoCommentaire).then((commentaires) => {
        const message = `Lcommentaire a bien été créé !`;
        res.json(success(message, commentaires));
    }).catch((error) => {
        const message = "La commentaire n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
    });
});

export {addCommentaire};