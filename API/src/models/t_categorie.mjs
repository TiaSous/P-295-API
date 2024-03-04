const CategorieModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_categorie",
    {
      id_categorie: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      catNom: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
        freezeTableName: true,
    }
  );
};

export { CategorieModel };
