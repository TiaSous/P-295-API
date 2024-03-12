import { DataTypes, Sequelize } from "sequelize";
import { LivreModel } from "../models/t_ouvrage.mjs";
import { CategorieModel } from "../models/t_categorie.mjs";
import { CommentaireModel } from "../models/t_commentaire.mjs";
import { EcrivainModel } from "../models/t_ecrivain.mjs";
import { EditeurModel } from "../models/t_editeur.mjs";
import { UtilisateurModel } from "../models/t_utilisateur.mjs";

// connexion à la base de données
const sequelize = new Sequelize(
  "db_librairie", // Nom de la DB qui doit exister
  "root", // Nom de l'utilisateur
  "root", // Mot de passe de l'utilisateur
  {
    host: "localhost",
    port: 6033,
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: false, // Désactiver la création automatique des champs createdAt et updatedAt
    },
  }
);

// association des tables à des variables
const Livre = LivreModel(sequelize, DataTypes);
const Categorie = CategorieModel(sequelize, DataTypes);
const Commentaire = CommentaireModel(sequelize, DataTypes);
const Ecrivain = EcrivainModel(sequelize, DataTypes);
const Editeur = EditeurModel(sequelize, DataTypes);
const Utilisateur = UtilisateurModel(sequelize, DataTypes);

export {
  sequelize,
  Livre,
  Categorie,
  Commentaire,
  Ecrivain,
  Editeur,
  Utilisateur,
};
