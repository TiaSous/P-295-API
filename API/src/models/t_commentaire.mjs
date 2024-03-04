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
        allowNull: false,
        references: {
          model: 't_ouvrage',
          key: 'id_ouvrage'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      fk_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 't_utilisateur',
          key: 'id_utilisateur'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    },
    {
      freezeTableName: true,
    }
  );
};

export { CommentaireModel };
