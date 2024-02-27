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
      allowNull: false
    },
    fk_categorie: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fk_ecrivain: {
      type : DataTypes.INTEGER,
      allowNull: false
    },
    fk_editeur: {
      type : DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: true,
    createdAt: "created",
    updateAt: false,
  });
};

export {LivreModel};