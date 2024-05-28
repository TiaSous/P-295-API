const CommentaireModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_commentaire",
    {
      id_commentaire: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comAppreciation: {
        allowNull: false,
        type: DataTypes.INTEGER,
        // il peut no
        validate: {
          min: {
            args: [0],
            msg: 'La valeur minimale autorisée est 1.'
          },
          max: {
            args: [5],
            msg: 'La valeur maximale autorisée est 5.'
          }
        }
      },
      comCommentaire: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      fk_ouvrage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: 't_ouvrage',
        //   key: 'id_ouvrage'
        // },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE'
      },
      fk_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: 't_utilisateur',
        //   key: 'id_utilisateur'
        // },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE'
      },
    },
    {
      freezeTableName: true,
    }
  );
};

export { CommentaireModel };
