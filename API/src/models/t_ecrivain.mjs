const EcrivainModel = (sequelize, DataTypes) => {
  return sequelize.define("t_ecrivain", {
    id_ecrivain: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      freezeTableName: true,
  }
  );
};

export {EcrivainModel}