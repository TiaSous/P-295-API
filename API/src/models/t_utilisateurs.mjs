const UtilisateurModel = (sequelize, DataTypes) => {
  return sequelize.define("t_utilisateur", {
    id_utilisateur: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    utiPseudo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    utiMotDePasse: {
        type: DataTypes.STRING,
        allowNull: false
    },
    utiDateEntree: {
        type: DataTypes.DATE,
    },
    utiNbOuvrageProposer: {
        type: DataTypes.INTEGER,
    },
    utiNbCommentaire: {
        type: DataTypes.INTEGER,
    }
  },
  {
    timestamps: true,
    createdAt: "created",
    updateAt: false,
  });
};

export {UtilisateurModel}