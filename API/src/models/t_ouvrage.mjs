//TODO à mettre au nouvelle norme
const LivreModel = (sequelize, DataTypes) => {
  return sequelize.define("t_ouvrage", {
    id_ouvrage: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ouvTitre: {
      type: DataTypes.STRING,
      // allowNull = pas obligatiore
      allowNull: false,
      notEmpty: {
        msg: "Le nom ne peut pas être vide.",
      },
      notNull: {
        msg: "Le nom est une propriété obligatoire.",
      },
    },
    ouvNbPage: {
        type: DataTypes.INTEGER
    },
    ouvResume: {
        type: DataTypes.STRING
    },
    ouvAnneeEdition: {
        type: DataTypes.DATE
    },
    ouvCouverture: {
      type: DataTypes.STRING
    },
    ouvExtrait:{
      type: DataTypes.STRING
    },
    ouvMoyenneAppreciation: {
      type: DataTypes.INTEGER
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
    fk_categorie: {
      type: DataTypes.INTEGER,
        references: {
          model: 't_categorie',
          key: 'id_categorie'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    fk_ecrivain: {
      type : DataTypes.INTEGER,
        references: {
          model: 't_ecrivain',
          key: 'id_ecrivain'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    fk_editeur: {
      type : DataTypes.INTEGER,
        references: {
          model: 't_editeur',
          key: 'id_editeur'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
  },
  {
      freezeTableName: true,
  });
};


export {LivreModel};