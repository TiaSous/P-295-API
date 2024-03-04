const EditeurModel = (sequelize, DataTypes) => {
  return sequelize.define("t_editeur", {
    id_editeur: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ediNom: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
      freezeTableName: true,
  });
};

export {EditeurModel};