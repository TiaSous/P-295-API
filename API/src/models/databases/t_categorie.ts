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

export class Categorie extends Model<
  InferAttributes<Categorie>,
  InferCreationAttributes<Categorie>
> {
  declare id_categorie: CreationOptional<number>;
  declare catNom: string;

  // Mixins pour les associations
  declare getLivres: HasManyGetAssociationsMixin<Livre>;

  static initModel(sequelize: Sequelize) {
    Categorie.init(
      {
        id_categorie: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        catNom: {
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
        tableName: "t_categorie",
        freezeTableName: true,
      },
    );
  }
}
