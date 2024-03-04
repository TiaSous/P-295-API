const EcrivainModel = (sequelize, DataTypes) => {
  return sequelize.define("t_ecrivain", {
    id_ecrivain: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ecrNom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ecrPrenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
  },
  {
      freezeTableName: true,
  }
  );
};

export {EcrivainModel}