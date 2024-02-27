const EcrivainModel = (sequelize, DataTypes) => {
  return sequelize.define("t_commentaire", {
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
    timestamps: true,
    createdAt: "created",
    updateAt: false,
  }
  );
};

export {EcrivainModel}