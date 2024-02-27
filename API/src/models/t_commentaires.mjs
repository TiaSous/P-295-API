const CommentaireModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_commentaire",
    {
      id_commentaire: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comAppreciation: {
        type: DataTypes.INTEGER,
      },
      comCommentaire: {
        type: DataTypes.STRING,
      },
      fk_ouvrage: {
        type: DataTypes.INTEGER,
      },
      fk_utilisateur: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updateAt: false,
    }
  );
};

export {CommentaireModel};