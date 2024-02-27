CREATE TABLE t_utilisateur(
   id_utilisateur INT,
   utiPseudo VARCHAR(50) NOT NULL,
   utiMotDePasse VARCHAR(50)  NOT NULL,
   utiDateEntree DATE,
   utiNbOuvrageProposer INT,
   utiNbCommentaire INT,
   PRIMARY KEY(id_utilisateur)
);

CREATE TABLE t_categorie(
   id_categorie INT,
   catType VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_categorie)
);

CREATE TABLE t_ecrivain(
   id_ecrivain INT,
   ecrNom VARCHAR(50) NOT NULL,
   ecrPrenom VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_ecrivain)
);

CREATE TABLE t_editeur(
   id_editeur INT,
   ediNom VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_editeur)
);

CREATE TABLE t_ouvrage(
   id_ouvrage INT,
   ouvTitre VARCHAR(50) NOT NULL,
   ouvNbPage INT,
   ouvResume VARCHAR(255),
   ouvAnneeEdition DATE,
   ouvCouverture VARCHAR(50),
   ouvExtrait VARCHAR(255),
   ouvMoyenneAppreciation INT,
   fk_utilisateur INT NOT NULL,
   fk_categorie INT NOT NULL,
   fk_ecrivain INT NOT NULL,
   fk_editeur INT NOT NULL,
   PRIMARY KEY(id_ouvrage),
   FOREIGN KEY(fk_utilisateur) REFERENCES t_utilisateur(id_utilisateur),
   FOREIGN KEY(fk_categorie) REFERENCES t_categorie(id_categorie),
   FOREIGN KEY(fk_ecrivain) REFERENCES t_ecrivain(id_ecrivain),
   FOREIGN KEY(fk_editeur) REFERENCES t_editeur(id_editeur)
);

CREATE TABLE t_commantaire(
   id_commentaire INT,
   comAppreciation INT NOT NULL,
   comCommentaire VARCHAR(255) NOT NULL,
   fk_ouvrage INT NOT NULL,
   fk_utilisateur INT NOT NULL,
   PRIMARY KEY(id_commentaire),
   FOREIGN KEY(fk_ouvrage) REFERENCES t_ouvrage(id_ouvrage),
   FOREIGN KEY(fk_utilisateur) REFERENCES t_utilisateur(id_utilisateur)
);
