import express from "express";
import { success } from "./helper.mjs";
import { Categorie } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const addCategorie = express();

addCategorie.post("/",auth, (req, res) => {
    const infoCategorie = {...req.body};
    Categorie.create(infoCategorie).then((categorie) => {
        const message = `La catégorie avec l'ID ${categorie.id_categorie} a bien été créée !`;
        res.json(success(message, categorie));
    }).catch((error) => {
        const message = "La catégorie n'a pas pu être ajoutée. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
    });
});

export { addCategorie };                        
