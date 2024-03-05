CREATE DATABASE IF NOT EXISTS db_librairie;

USE db_librairie;


CREATE TABLE t_utilisateur(
   id_utilisateur INT NOT NULL AUTO_INCREMENT,
   utiPseudo VARCHAR(50) NOT NULL,
   utiMotDePasse VARCHAR(255)  NOT NULL,
   utiDateEntree DATE,
   utiNbOuvrageProposer INT,
   utiNbCommentaire INT,
   utiRole VARCHAR(255) NOT NULL,
   PRIMARY KEY(id_utilisateur)
);

CREATE TABLE t_categorie(
   id_categorie INT NOT NULL AUTO_INCREMENT,
   catNom VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_categorie)
);

CREATE TABLE t_ecrivain(
   id_ecrivain INT NOT NULL AUTO_INCREMENT,
   ecrNom VARCHAR(50) NOT NULL,
   ecrPrenom VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_ecrivain)
);

CREATE TABLE t_editeur(
   id_editeur INT NOT NULL AUTO_INCREMENT,
   ediNom VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_editeur)
);

CREATE TABLE t_ouvrage(
   id_ouvrage INT NOT NULL AUTO_INCREMENT,
   ouvTitre VARCHAR(50) NOT NULL,
   ouvNbPage INT,
   ouvResume VARCHAR(255),
   ouvAnneeEdition DATE,
   ouvCouverture VARCHAR(50),
   ouvExtrait VARCHAR(255),
   ouvMoyenneAppreciation INT,
   fk_utilisateur INT NOT NULL,
   fk_categorie INT,
   fk_ecrivain INT,
   fk_editeur INT,
   PRIMARY KEY(id_ouvrage),
   FOREIGN KEY(fk_utilisateur) REFERENCES t_utilisateur(id_utilisateur) ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY(fk_categorie) REFERENCES t_categorie(id_categorie) ON DELETE SET NULL ON UPDATE CASCADE,
   FOREIGN KEY(fk_ecrivain) REFERENCES t_ecrivain(id_ecrivain) ON DELETE SET NULL ON UPDATE CASCADE,
   FOREIGN KEY(fk_editeur) REFERENCES t_editeur(id_editeur) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE t_commentaire(
   id_commentaire INT NOT NULL AUTO_INCREMENT,
   comAppreciation INT NOT NULL,
   comCommentaire VARCHAR(255) NOT NULL,
   fk_ouvrage INT NOT NULL,
   fk_utilisateur INT NOT NULL,
   PRIMARY KEY(id_commentaire),
   FOREIGN KEY(fk_ouvrage) REFERENCES t_ouvrage(id_ouvrage) ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY(fk_utilisateur) REFERENCES t_utilisateur(id_utilisateur) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insérer des utilisateurs
INSERT INTO t_utilisateur (id_utilisateur, utiPseudo, utiMotDePasse, utiDateEntree, utiNbOuvrageProposer, utiNbCommentaire, utiRole)
VALUES 
(1, 'Tiago', '$2b$10$dvqCnsw22gy8xiGVgJKzIOqjf4GCM1vmoA3iooUdSKYbJ3r056DCu', '2022-01-01', 5, 10, 'admin'),
(2, 'Evin', '$2b$10$dvqCnsw22gy8xiGVgJKzIOqjf4GCM1vmoA3iooUdSKYbJ3r056DCu', '2022-02-01', 3, 7, 'admin'),
(3, 'Alice', '$2b$10$dvqCnsw22gy8xiGVgJKzIOqjf4GCM1vmoA3iooUdSKYbJ3r056DCu', '2022-03-15', 8, 12, 'user');

-- Insérer des catégories
INSERT INTO t_categorie (id_categorie, catNom)
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

-- Insérer des ouvrages
INSERT INTO t_ouvrage (id_ouvrage, ouvTitre, ouvNbPage, ouvResume, ouvAnneeEdition, ouvCouverture, ouvExtrait, ouvMoyenneAppreciation, fk_utilisateur, fk_categorie, fk_ecrivain, fk_editeur)
VALUES 
(1, 'Le Trône de Fer', 800, 'Une épopée fantastique dans un monde imaginaire.', '1996-08-06', 'trone_de_fer.jpg', 'extrait_trone_de_fer.txt', 4, 1, 1, 1, 1),
(2, 'Harry Potter à l\école des sorciers', 320, 'L\histoire de Harry Potter et ses amis à Poudlard.', '1997-06-26', 'harry_potter.jpg', 'extrait_harry_potter.txt', 5, 2, 2, 2, 2),
(3, 'Le Crime de l\Orient-Express', 250, 'Un meurtre mystérieux à bord du célèbre train.', '1934-01-01', 'crime_orient_express.jpg', 'extrait_crime_orient_express.txt', 4, 3,3, 3, 3),
(4, 'Le Vieil Homme et la Mer', 127, 'Un pêcheur cubain lutte contre un énorme poisson dans le golfe du Mexique.', '1952-09-01', 'vieil_homme_mer.jpg', 'extrait_vieil_homme_mer.txt', 5, 3,1, 4, 4);

-- Insérer des commentaires
INSERT INTO t_commentaire (id_commentaire, comAppreciation, comCommentaire, fk_ouvrage, fk_utilisateur)
VALUES 
(1, 4, 'Une intrigue captivante!', 1, 1),
(2, 5, 'Magique du début à la fin.', 2, 2),
(3, 3, 'Un excellent mystère!', 3, 3),
(4, 4, 'Une œuvre littéraire exceptionnelle.', 4, 1);
