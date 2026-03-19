import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyGetAssociationsMixin,
} from "sequelize";
import type { Sequelize } from "sequelize";
import type { Livre } from "../t_ouvrage";

export class Editeur extends Model<
  InferAttributes<Editeur>,
  InferCreationAttributes<Editeur>
> {
  declare id_editeur: CreationOptional<number>;
  declare ediNom: string;

  // Mixins pour les associations
  declare getLivres: HasManyGetAssociationsMixin<Livre>;

  static initModel(sequelize: Sequelize) {
    Editeur.init(
      {
        id_editeur: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ediNom: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Le nom ne peut pas être vide.",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "t_editeur",
        freezeTableName: true,
      },
    );
  }
}
