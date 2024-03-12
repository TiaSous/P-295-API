const EditeurModel = (sequelize, DataTypes) => {
  return sequelize.define("t_editeur", {
    id_editeur: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ediNom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le nom ne peut pas être vide.",
          },
        },
    }
  },
  {
      freezeTableName: true,
  });
};

export {EditeurModel};