import { Sequelize } from "sequelize";
import { Livre } from "../models/databases/t_ouvrage.js";
import { Categorie } from "../models/databases/t_categorie.js";
import { Commentaire } from "../models/databases/t_commentaire.js";
import { Ecrivain } from "../models/databases/t_ecrivain.js";
import { Editeur } from "../models/databases/t_editeur.js";
import { Utilisateur } from "../models/databases/t_utilisateur.js";

// Connexion à la base de données
export const sequelize = new Sequelize(
  "db_librairie", // Nom de la DB qui doit exister
  "root", // Nom de l'utilisateur
  "root", // Mot de passe de l'utilisateur
  {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: false, // Désactiver la création automatique des champs createdAt et updatedAt
    },
  },
);

// Initialiser tous les modèles
Livre.initModel(sequelize);
Categorie.initModel(sequelize);
Utilisateur.initModel(sequelize);
Ecrivain.initModel(sequelize);
Editeur.initModel(sequelize);
Commentaire.initModel(sequelize);

// Association des modèles
// Livre belongsTo associations
Livre.belongsTo(Utilisateur, {
  foreignKey: "fk_utilisateur",
  as: "Utilisateur",
});
Livre.belongsTo(Categorie, {
  foreignKey: "fk_categorie",
  as: "Categorie",
});
Livre.belongsTo(Ecrivain, {
  foreignKey: "fk_ecrivain",
  as: "Ecrivain",
});
Livre.belongsTo(Editeur, {
  foreignKey: "fk_editeur",
  as: "Editeur",
});

// Livre hasMany Commentaire
Livre.hasMany(Commentaire, {
  foreignKey: "fk_ouvrage",
  as: "Commentaires",
});

// Utilisateur associations
Utilisateur.hasMany(Livre, {
  foreignKey: "fk_utilisateur",
  as: "Livres",
});
Utilisateur.hasMany(Commentaire, {
  foreignKey: "fk_utilisateur",
  as: "Commentaires",
});

// Categorie associations
Categorie.hasMany(Livre, {
  foreignKey: "fk_categorie",
  as: "Livres",
});

// Ecrivain associations
Ecrivain.hasMany(Livre, {
  foreignKey: "fk_ecrivain",
  as: "Livres",
});

// Editeur associations
Editeur.hasMany(Livre, {
  foreignKey: "fk_editeur",
  as: "Livres",
});

// Commentaire associations
Commentaire.belongsTo(Livre, {
  foreignKey: "fk_ouvrage",
  as: "Livre",
});
Commentaire.belongsTo(Utilisateur, {
  foreignKey: "fk_utilisateur",
  as: "Utilisateur",
});

export { Livre, Categorie, Commentaire, Ecrivain, Editeur, Utilisateur };
