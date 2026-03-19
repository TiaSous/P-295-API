import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  BelongsToGetAssociationMixin,
  HasManyGetAssociationsMixin,
} from "sequelize";
import type { Sequelize } from "sequelize";
import type { Categorie } from "./databases/t_categorie";
import type { Ecrivain } from "./databases/t_ecrivain";
import type { Editeur } from "./databases/t_editeur";
import type { Utilisateur } from "./t_utilisateur";
import type { Commentaire } from "./databases/t_commentaire";

export class Livre extends Model<
  InferAttributes<Livre>,
  InferCreationAttributes<Livre>
> {
  declare id_ouvrage: CreationOptional<number>;
  declare ouvTitre: string;
  declare ouvNbPage: CreationOptional<number>;
  declare ouvResume: CreationOptional<string>;
  declare ouvAnneeEdition: CreationOptional<Date>;
  declare ouvCouverture: CreationOptional<string>;
  declare ouvExtrait: CreationOptional<string>;
  declare ouvMoyenneAppreciation: CreationOptional<number>;
  declare fk_utilisateur: ForeignKey<Utilisateur["id_utilisateur"]>;
  declare fk_categorie: ForeignKey<Categorie["id_categorie"]>;
  declare fk_ecrivain: ForeignKey<Ecrivain["id_ecrivain"]>;
  declare fk_editeur: ForeignKey<Editeur["id_editeur"]>;

  // Mixins pour les associations
  declare getUtilisateur: BelongsToGetAssociationMixin<Utilisateur>;
  declare getCategorie: BelongsToGetAssociationMixin<Categorie>;
  declare getEcrivain: BelongsToGetAssociationMixin<Ecrivain>;
  declare getEditeur: BelongsToGetAssociationMixin<Editeur>;
  declare getCommentaires: HasManyGetAssociationsMixin<Commentaire>;

  static initModel(sequelize: Sequelize) {
    Livre.init(
      {
        id_ouvrage: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ouvTitre: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Le nom ne peut pas être vide.",
            },
          },
        },
        ouvNbPage: DataTypes.INTEGER,
        ouvResume: DataTypes.STRING,
        ouvAnneeEdition: {
          type: DataTypes.DATE,
          get() {
            const rawValue = this.getDataValue("ouvAnneeEdition");
            if (rawValue) {
              const date = new Date(rawValue);
              return `${date.getDate().toString().padStart(2, "0")}/${(
                date.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}/${date.getFullYear()}`;
            }
            return null;
          },
        },
        ouvCouverture: DataTypes.STRING,
        ouvExtrait: DataTypes.STRING,
        ouvMoyenneAppreciation: DataTypes.INTEGER,
        fk_utilisateur: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        fk_categorie: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        fk_ecrivain: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        fk_editeur: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "t_ouvrage",
        freezeTableName: true,
      },
    );
  }
}
