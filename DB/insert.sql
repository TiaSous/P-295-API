-- Insérer des utilisateurs
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

-- Insérer des ouvrages
INSERT INTO t_ouvrage (id_ouvrage, ouvTitre, ouvNbPage, ouvResume, ouvAnneeEdition, ouvCouverture, ouvExtrait, ouvMoyenneAppreciation, fk_utilisateur, fk_categorie, fk_ecrivain, fk_editeur)
VALUES 
(1, 'Le Trône de Fer', 800, 'Une épopée fantastique dans un monde imaginaire.', '1996-08-06', 'trone_de_fer.jpg', 'extrait_trone_de_fer.txt', 4, 1, 1, 1, 1),
(2, 'Harry Potter à l\école des sorciers', 320, 'L\histoire de Harry Potter et ses amis à Poudlard.', '1997-06-26', 'harry_potter.jpg', 'extrait_harry_potter.txt', 5, 2, 2, 2, 2),
(3, 'Le Crime de l\Orient-Express', 250, 'Un meurtre mystérieux à bord du célèbre train.', '1934-01-01', 'crime_orient_express.jpg', 'extrait_crime_orient_express.txt', 4, 3,3, 3, 3),
(4, 'Le Vieil Homme et la Mer', 127, 'Un pêcheur cubain lutte contre un énorme poisson dans le golfe du Mexique.', '1952-09-01', 'vieil_homme_mer.jpg', 'extrait_vieil_homme_mer.txt', 5, 3,1, 4, 4);

-- Insérer des commentaires
INSERT INTO t_commantaire (id_commentaire, comAppreciation, comCommentaire, fk_ouvrage, fk_utilisateur)
VALUES 
(1, 4, 'Une intrigue captivante!', 1, 1),
(2, 5, 'Magique du début à la fin.', 2, 2),
(3, 3, 'Un excellent mystère!', 3, 3),
(4, 4, 'Une œuvre littéraire exceptionnelle.', 4, 1);
