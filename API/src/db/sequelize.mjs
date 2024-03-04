import { DataTypes, Sequelize } from "sequelize";
import { LivreModel } from "../models/t_ouvrage.mjs";
import { CategorieModel } from "../models/t_categorie.mjs";
import { CommentaireModel } from "../models/t_commentaire.mjs";
import { EcrivainModel } from "../models/t_ecrivain.mjs";
import { EditeurModel } from "../models/t_editeur.mjs";
import { UtilisateurModel } from "../models/t_utilisateur.mjs";
import * as bcrypt from "bcrypt";

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

const Livre = LivreModel(sequelize, DataTypes);
const Categorie = CategorieModel(sequelize, DataTypes);
const Commentaire = CommentaireModel(sequelize, DataTypes);
const Ecrivain = EcrivainModel(sequelize, DataTypes);
const Editeur = EditeurModel(sequelize, DataTypes);
const Utilisateur = UtilisateurModel(sequelize, DataTypes);

//va syncroniser la db et le mock
let initDB = () => {
  return sequelize.sync({ force: false }).then((_) => {
    //importUtilisateurs();
    console.log("La base de données db_products a bien été synchronisé");
  });
};

// pour importer le mock livre
// const importLivres = () => {
//   livres.map((livre) => {
//     Livre.create({
//       titre: livre.titre,
//       categorie: livre.categorie,
//       nbPages: livre.nbPages,
//       resume: livre.resume
//     }).then((livre) => console.log(livre.toJSON()));
//   });
// };

const importUtilisateurs = () => {
  bcrypt
    .hash("1234", 10) // temps pour hasher = du sel
    .then((hash) =>
      Utilisateur.create({
        id_utilisateur: 5,
        utiPseudo: "etml",
        utiMotDePasse: hash,
        utiRole: "admin"
      }, console.log(hash))
    )
    .then((user) => console.log(user.toJSON()));
};

export {
  sequelize,
  Livre,
  Categorie,
  Commentaire,
  Ecrivain,
  Editeur,
  Utilisateur,
  initDB,
};
