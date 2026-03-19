import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  BelongsToGetAssociationMixin,
} from "sequelize";
import type { Sequelize } from "sequelize";
import type { Livre } from "../t_ouvrage";
import type { Utilisateur } from "../t_utilisateur";

export class Commentaire extends Model<
  InferAttributes<Commentaire>,
  InferCreationAttributes<Commentaire>
> {
  declare id_commentaire: CreationOptional<number>;
  declare comAppreciation: number;
  declare comCommentaire: string;
  declare fk_ouvrage: ForeignKey<Livre["id_ouvrage"]>;
  declare fk_utilisateur: ForeignKey<Utilisateur["id_utilisateur"]>;

  // Mixins pour les associations
  declare getLivre: BelongsToGetAssociationMixin<Livre>;
  declare getUtilisateur: BelongsToGetAssociationMixin<Utilisateur>;

  static initModel(sequelize: Sequelize) {
    Commentaire.init(
      {
        id_commentaire: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        comAppreciation: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: {
              args: [0],
              msg: "La valeur minimale autorisée est 1.",
            },
            max: {
              args: [5],
              msg: "La valeur maximale autorisée est 5.",
            },
          },
        },
        comCommentaire: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        fk_ouvrage: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        fk_utilisateur: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "t_commentaire",
        freezeTableName: true,
      },
    );
  }
}
