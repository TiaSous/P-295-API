import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyGetAssociationsMixin,
} from "sequelize";
import type { Sequelize } from "sequelize";
import type { Livre } from "./databases/t_ouvrage";
import type { Commentaire } from "./databases/t_commentaire";

export class Utilisateur extends Model<
  InferAttributes<Utilisateur>,
  InferCreationAttributes<Utilisateur>
> {
  declare id_utilisateur: CreationOptional<number>;
  declare utiPseudo: string;
  declare utiMotDePasse: string;
  declare utiDateEntree: CreationOptional<Date>;
  declare utiNbOuvrageProposer: CreationOptional<number>;
  declare utiNbCommentaire: CreationOptional<number>;
  declare utiRole: string;

  // Mixins pour les associations
  declare getLivres: HasManyGetAssociationsMixin<Livre>;
  declare getCommentaires: HasManyGetAssociationsMixin<Commentaire>;

  static initModel(sequelize: Sequelize) {
    Utilisateur.init(
      {
        id_utilisateur: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        utiPseudo: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Le pseudo ne peut pas être vide.",
            },
          },
        },
        utiMotDePasse: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        utiDateEntree: DataTypes.DATE,
        utiNbOuvrageProposer: DataTypes.INTEGER,
        utiNbCommentaire: DataTypes.INTEGER,
        utiRole: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "t_utilisateur",
        freezeTableName: true,
      },
    );
  }
}
