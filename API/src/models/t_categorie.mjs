const CategorieModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_categorie",
    {
      id_categorie: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      catNom: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le nom ne peut pas être vide.",
          },
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
};

export { CategorieModel };
