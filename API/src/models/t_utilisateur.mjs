const UtilisateurModel = (sequelize, DataTypes) => {
  return sequelize.define("t_utilisateur", {
    id_utilisateur: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    utiPseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le pseudo ne peut pas être vide.",
          },
        },
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
    },
    utiRole: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
      freezeTableName: true,
  });
};

export {UtilisateurModel}