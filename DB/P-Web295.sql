CREATE TABLE t_utilisateur_(
   id_utilisateur VARCHAR(50),
   utiPseudo VARCHAR(50),
   utiDateEntree VARCHAR(50),
   utiNbOuvrageProposer INT,
   utiNbCommentaire VARCHAR(50),
   PRIMARY KEY(id_utilisateur)
);

CREATE TABLE t_categorie(
   id_categorie VARCHAR(50),
   catType VARCHAR(50),
   PRIMARY KEY(id_categorie)
);

CREATE TABLE t_ecrivain(
   id_ecrivain VARCHAR(50),
   ecriNom VARCHAR(50),
   ecrPrenom VARCHAR(50),
   PRIMARY KEY(id_ecrivain)
);

CREATE TABLE t_editeur(
   id_editeur VARCHAR(50),
   ecriNom VARCHAR(50),
   PRIMARY KEY(id_editeur)
);

CREATE TABLE t_ouvrage(
   id_ouvrage VARCHAR(50),
   livTitre VARCHAR(50),
   livNbPage INT,
   livResume VARCHAR(150),
   livAnneeEdition DATE,
   ouvCouverture_ VARCHAR(50),
   ouvExtrait VARCHAR(50),
   ouvMoyenneAppreciation INT,
   id_utilisateur VARCHAR(50) NOT NULL,
   id_categorie VARCHAR(50) NOT NULL,
   id_ecrivain VARCHAR(50) NOT NULL,
   id_editeur VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_ouvrage),
   FOREIGN KEY(id_utilisateur) REFERENCES t_utilisateur_(id_utilisateur),
   FOREIGN KEY(id_categorie) REFERENCES t_categorie(id_categorie),
   FOREIGN KEY(id_ecrivain) REFERENCES t_ecrivain(id_ecrivain),
   FOREIGN KEY(id_editeur) REFERENCES t_editeur(id_editeur)
);

CREATE TABLE t_commantaire(
   id_commentaire_ VARCHAR(50),
   comAppeciation INT,
   Commentaire VARCHAR(50),
   id_ouvrage VARCHAR(50) NOT NULL,
   id_utilisateur VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_commentaire_),
   FOREIGN KEY(id_ouvrage) REFERENCES t_ouvrage(id_ouvrage),
   FOREIGN KEY(id_utilisateur) REFERENCES t_utilisateur_(id_utilisateur)
);
