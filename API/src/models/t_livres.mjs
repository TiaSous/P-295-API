const LivreModel = (sequelize, DataTypes) => {
  return sequelize.define("Livres", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titre: {
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
    categorie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nbPages: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    resume: {
        type: DataTypes.STRING,
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