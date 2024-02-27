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


INSERT INTO t_utilisateur (id_utilisateur, utiPseudo, utiMotDePasse, utiDateEntree, utiNbOuvrageProposer, utiNbCommentaire)
VALUES 
(1, 'JohnDoe', 'motdepasse123', '2022-01-01', 5, 10),
(2, 'AliceSmith', 'password456', '2022-02-01', 3, 7),
(3, 'BobJohnson', 'securepass', '2022-03-15', 8, 12);

-- Insérer des catégories
INSERT INTO t_categorie (id_categorie, catType)
VALUES 
(1, 'Science-Fiction'),
(2, 'Romance'),
(3, 'Mystère'),
(4, 'Historique');

-- Insérer des écrivains
INSERT INTO t_ecrivain (id_ecrivain, ecrNom, ecrPrenom)
VALUES 
(1, 'Martin', 'George R. R.'),
(2, 'Rowling', 'J.K.'),
(3, 'Christie', 'Agatha'),
(4, 'Hemingway', 'Ernest');

-- Insérer des éditeurs
INSERT INTO t_editeur (id_editeur, ediNom)
VALUES 
(1, 'Editions Albin Michel'),
(2, 'Editions Gallimard'),
(3, 'HarperCollins'),
(4, 'Random House');