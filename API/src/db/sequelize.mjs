import { DataTypes, Sequelize } from "sequelize";
import { livres } from "./mocks-livre.mjs";
import { LivreModel } from "../models/t_ouvrages.mjs";
import { CategorieModel } from "../models/t_categories.mjs";
import { CommentaireModel } from "../models/t_commentaires.mjs";
import { EcrivainModel } from "../models/t_ecrivains.mjs";
import { EditeurModel } from "../models/t_editeurs.mjs";
import { UtilisateurModel } from "../models/t_utilisateurs.mjs";

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
  }
);

const Livre = LivreModel(sequelize, DataTypes);
const Categorie = CategorieModel(sequelize, DataTypes);
const Commentaire = CommentaireModel(sequelize, DataTypes);
const Ecrivain = EcrivainModel(sequelize, DataTypes);
const Editeur = EditeurModel(sequelize, DataTypes);
const Utilisateur = UtilisateurModel(sequelize, DataTypes);

// va syncroniser la db et le mock
let initDB = () => {
  return sequelize.sync({ force: true }).then((_) => {
    importLivres();
    console.log("La base de données db_products a bien été synchronisé");
  });
};

// pour importer le mock livre
const importLivres = () => {
  livres.map((livre) => {
    Livre.create({
      titre: livre.titre,
      categorie: livre.categorie,
      nbPages: livre.nbPages,
      resume: livre.resume
    }).then((livre) => console.log(livre.toJSON()));
  });
};

export { sequelize, initDB, Livre, Categorie, Commentaire, Ecrivain, Editeur, Utilisateur };
