CREATE DATABASE IF NOT EXISTS library;

USE library;

-- ============================================================
-- INSERTION DE DONNÉES DE SEED POUR LA BASE DE DONNÉES LIVRE
-- ============================================================

-- ============================================================
-- 1. INSERTION DES UTILISATEURS (t_utilisateur)
-- ============================================================
INSERT INTO t_utilisateur (Username, Password, Role) VALUES
('alice_smith', 'hashed_password_123', 'user'),
('bob_johnson', 'hashed_password_456', 'user'),
('carol_white', 'hashed_password_789', 'admin'),
('david_brown', 'hashed_password_101', 'user'),
('emma_davis', 'hashed_password_202', 'user');

-- ============================================================
-- 2. INSERTION DES AUTEURS (t_author)
-- ============================================================
INSERT INTO t_author (LastName, FirstName) VALUES
('Rowling', 'J.K.'),
('Tolkien', 'J.R.R.'),
('Martin', 'George R.R.'),
('Asimov', 'Isaac'),
('Clarke', 'Arthur C.'),
('Austen', 'Jane'),
('Orwell', 'George'),
('Hemingway', 'Ernest'),
('Fitzgerald', 'F. Scott'),
('Christie', 'Agatha');

-- ============================================================
-- 3. INSERTION DES CATÉGORIES (t_category)
-- ============================================================
INSERT INTO t_category (Name) VALUES
('Science-Fiction'),
('Fantasy'),
('Mystère'),
('Romance'),
('Thriller'),
('Aventure'),
('Historique'),
('Biographie'),
('Poésie'),
('Jeunesse');

-- ============================================================
-- 4. INSERTION DES ÉDITEURS (t_publisher)
-- ============================================================
INSERT INTO t_publisher (Name) VALUES
('Bloomsbury Publishing'),
('Allen & Unwin'),
('Bantam Books'),
('Doubleday'),
('Penguin Books'),
('Simon & Schuster'),
('Hachette Book Group'),
('Macmillan Publishers'),
('Random House'),
('Éditions Gallimard');

-- ============================================================
-- 5. INSERTION DES LIVRES (t_book)
-- ============================================================
INSERT INTO t_book (Title, NbPage, Resume, EditionYear, Cover, Passage, Rating, FkUser, FkCategory, FkAuthor, FkPublisher) VALUES
('Harry Potter and the Philosopher''s Stone', 223, 'Un jeune magicien découvre qu''il est un sorcier et commence ses études à Poudlard.', '1997-06-26', 'cover_hp1.jpg', 'Chapter 1: The Boy Who Lived', 5, 1, 2, 1, 1),
('The Lord of the Rings: The Fellowship of the Ring', 487, 'Un groupe d''aventuriers entreprend un long voyage pour détruire un anneau magique.', '1954-07-29', 'cover_lotr1.jpg', 'Chapter 1: A Long-expected Party', 5, 2, 2, 2, 2),
('A Game of Thrones', 694, 'Les nobles familles de Westeros se battent pour le trône du Fer dans un monde de magie et de politique.', '1996-08-06', 'cover_got1.jpg', 'Prologue', 4, 3, 2, 3, 3),
('Foundation', 255, 'Un psychohistorien tente de sauver la civilisation galactique de l''effondrement imminent.', '1951-06-01', 'cover_foundation.jpg', 'Chapter 1', 4, 4, 1, 4, 4),
('2001: A Space Odyssey', 297, 'Une mission spatiale révèle un mystère cosmique ancien et l''évolution de l''humanité.', '1968-04-02', 'cover_2001.jpg', 'Part One: TMA-1', 5, 1, 1, 5, 5),
('Pride and Prejudice', 279, 'L''histoire d''amour entre Elizabeth Bennet et Mr Darcy dans l''Angleterre du XIXe siècle.', '1813-01-28', 'cover_pp.jpg', 'Chapter 1', 5, 2, 4, 6, 6),
('1984', 328, 'Un roman dystopique où un gouvernement totalitaire contrôle chaque aspect de la vie.', '1949-06-08', 'cover_1984.jpg', 'Part One, Chapter 1', 5, 3, 5, 7, 7),
('The Old Man and the Sea', 127, 'Un vieux pêcheur cubain lutte contre un grand marlin dans l''océan.', '1952-09-01', 'cover_omts.jpg', 'Chapter 1', 4, 4, 6, 8, 8),
('The Great Gatsby', 180, 'L''histoire de Jay Gatsby et de son obsession pour une femme dans les années 1920.', '1925-04-10', 'cover_gg.jpg', 'Chapter 1: In My Younger and More Vulnerable Years', 4, 5, 4, 9, 9),
('Murder on the Orient Express', 256, 'Hercule Poirot enquête sur un meurtre dans un train luxueux bloqué par la neige.', '1934-01-01', 'cover_mooe.jpg', 'Chapter 1', 4, 1, 3, 10, 10);

-- ============================================================
-- 6. INSERTION DES COMMENTAIRES (t_comment)
-- ============================================================
INSERT INTO t_comment (Content, Rating, FkBook, FkUser) VALUES
('Excellent livre, très captivant!', 5, 1, 2),
('Les personnages sont bien développés et l''histoire est magique.', 5, 1, 3),
('Une œuvre maîtresse de la science-fiction.', 5, 2, 4),
('Difficile à lire par endroits mais extraordinaire.', 4, 2, 5),
('Un grand classique, vivement recommandé.', 5, 3, 1),
('Incroyable, j''ai adoré chaque page.', 5, 4, 2),
('Un classique de la science-fiction, à lire absolument.', 5, 5, 3),
('Poétique et philosophique, simplement magnifique.', 5, 6, 4),
('Un vrai chef-d''œuvre de la littérature.', 5, 7, 5),
('Court mais intense, très beau.', 4, 8, 1),
('Fascinant portrait de l''amour et du rêve américain.', 4, 9, 2),
('Une intrigue palpitante du début à la fin.', 4, 10, 3);

-- ============================================================
-- SCRIPT TERMINÉ
-- ============================================================
-- Vous pouvez maintenant exécuter ce script dans votre base de données
-- Pour SQL Server:
--   1. Ouvrez SQL Server Management Studio
--   2. Connectez-vous à votre base de données
--   3. Ouvrez une nouvelle requête (New Query)
--   4. Collez ce script
--   5. Exécutez (F5)
--
-- Les IDs seront auto-générés pour chaque entité grâce à l'IDENTITY
-- ============================================================
