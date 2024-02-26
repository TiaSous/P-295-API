import { DataTypes, Sequelize } from "sequelize";
import { LivreModel } from "../models/t_livres.mjs";
import { livres } from "./mocks-livre.mjs";

// connexion à la base de données
const sequelize = new Sequelize(
  "db_library", // Nom de la DB qui doit exister
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

let initDB = () => {
  return sequelize.sync({ force: true }).then((_) => {
    importLivres();
    console.log("La base de données db_products a bien été synchronisé");
  });
};

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

export { sequelize, initDB, Livre };
