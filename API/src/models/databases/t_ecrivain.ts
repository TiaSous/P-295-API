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

export class Ecrivain extends Model<
  InferAttributes<Ecrivain>,
  InferCreationAttributes<Ecrivain>
> {
  declare id_ecrivain: CreationOptional<number>;
  declare ecrNom: string;
  declare ecrPrenom: string;

  // Mixins pour les associations
  declare getLivres: HasManyGetAssociationsMixin<Livre>;

  static initModel(sequelize: Sequelize) {
    Ecrivain.init(
      {
        id_ecrivain: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ecrNom: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Le nom ne peut pas être vide.",
            },
          },
        },
        ecrPrenom: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Le prénom ne peut pas être vide.",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "t_ecrivain",
        freezeTableName: true,
      },
    );
  }
}
