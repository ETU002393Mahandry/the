CREATE TABLE the_Variete(
   idvariete INT AUTO_INCREMENT,
   nom VARCHAR(50) NOT NULL,
   occupation DECIMAL(15,2) NOT NULL,
   rendement DECIMAL(15,2),
   vente DECIMAL(15,2),
   PRIMARY KEY(idvariete)
);
CREATE TABLE the_Parcelle(
   idparcelle INT AUTO_INCREMENT,
   idvariete INT NOT NULL,
   surface DECIMAL(15,2) NOT NULL,
   PRIMARY KEY(idparcelle),
   FOREIGN KEY(idvariete) REFERENCES the_Variete(idvariete)
);
CREATE TABLE the_Cueilleur(
   idcueilleur INT AUTO_INCREMENT,
   nom VARCHAR(150) NOT NULL,
   genre VARCHAR(50) NOT NULL,
   naissance DATE NOT NULL,
   PRIMARY KEY(idcueilleur)
);
CREATE TABLE the_Depense(
   iddepense INT AUTO_INCREMENT,
   nom VARCHAR(100) NOT NULL,
   PRIMARY KEY(iddepense)
);
CREATE TABLE the_CoutDepense(
   idcout INT AUTO_INCREMENT,
   iddepense INT NOT NULL,
   prix DECIMAL(15,2) NOT NULL,
   datecout DATE NOT NULL,
   PRIMARY KEY(idcout),
   FOREIGN KEY(iddepense) REFERENCES the_Depense(iddepense)
);
CREATE TABLE the_Salaire(
   idsalaire INT AUTO_INCREMENT,
   salaire DECIMAL(15,2) NOT NULL,
   datesalaire DATE NOT NULL,
   PRIMARY KEY(idsalaire)
);
CREATE TABLE the_Utilisateur(
   iduser INT AUTO_INCREMENT,
   nom VARCHAR(100) NOT NULL,
   email VARCHAR(150) NOT NULL,
   mdp VARCHAR(100) NOT NULL,
   isadmin BOOLEAN NOT NULL DEFAULT false,
   PRIMARY KEY(iduser),
   UNIQUE(email)
);
CREATE TABLE the_Cueillette(
   idcueillette INT AUTO_INCREMENT,
   datecueillette DATE NOT NULL,
   idcueilleur INT NOT NULL,
   idparcelle INT NOT NULL,
   poids DECIMAL(15,2) NOT NULL,
   PRIMARY KEY(idcueillette),
   FOREIGN KEY(idcueilleur) REFERENCES the_Cueilleur(idcueilleur),
   FOREIGN KEY(idparcelle) REFERENCES the_Parcelle(idparcelle)
);
CREATE TABLE the_Saison(
   idsaison INT AUTO_INCREMENT,
   mois INT,
   selectionner BOOLEAN DEFAULT false,
   datesaison DATE,
   PRIMARY KEY(idsaison)
);
CREATE TABLE the_Infos(
   idinfos INT AUTO_INCREMENT,
   idcueilleur INT,
   minimal DECIMAL(15,2),
   bonus DECIMAL(15,2),
   mallus DECIMAL(15,2),
   PRIMARY KEY(idinfos),
   FOREIGN KEY(idcueilleur) REFERENCES the_Cueilleur(idcueilleur)
);


-- Données de test pour la table the_Variete
INSERT INTO the_Variete (nom, occupation, rendement) VALUES 
('Noir', 10.5, 20.2),
('Vert', 8.7, 18.3),
('Cammomille', 12.3, 22.1);

-- Données de test pour la table the_Parcelle
INSERT INTO the_Parcelle (idvariete, surface) VALUES
(1, 50.5),
(2, 40.2),
(3, 60.7);

-- Données de test pour la table the_Cueilleur
INSERT INTO the_Cueilleur (nom, genre, naissance) VALUES
('Jean Dupont', 'Homme', '1980-05-15'),
('Marie Durand', 'Femme', '1992-12-28'),
('Pierre Martin', 'Homme', '1975-08-10');

-- Données de test pour la table the_Depense
INSERT INTO the_Depense (nom) VALUES
('Engrais'),
('Semences'),
('Carburant');

-- Données de test pour la table the_CoutDepense
INSERT INTO the_CoutDepense (iddepense, prix, datecout) VALUES
(1, 150.75, '2023-05-20'),
(2, 200.50, '2023-04-10'),
(3, 80.25, '2023-06-15');

-- Données de test pour la table the_Salaire
INSERT INTO the_Salaire (salaire, datesalaire) VALUES
(1200.00, '2023-05-31'),
(1100.00, '2023-07-31'),
(1300.00, '2023-08-31');

-- Données de test pour la table the_Utilisateur
INSERT INTO the_Utilisateur (nom, email, mdp, isadmin) VALUES
('Mahandry', 'mahandry@gmail.com', SHA1('ituprom16'), true),
('Tsanta', 'tsanta@gmail.com', SHA1('mdp123'), false),
('Marcelo', 'marcelo@gmail.com', SHA1('pwd456'), false);


-- Données de test pour la table the_Cueillette
INSERT INTO the_Cueillette (datecueillette, idcueilleur, idparcelle, poids) VALUES
('2023-07-15', 1, 1, 150.2),
('2023-07-16', 2, 2, 120.5),
('2023-07-17', 3, 3, 180.3);

-- Insérer des données dans la table the_Saison
INSERT INTO the_Saison (idvariete, mois, datesaison) VALUES
(1, 1, '2023-01-01'),
(1, 2, '2023-02-01'),
(1, 3, '2023-03-01'),
(2, 1, '2023-01-01'),
(2, 2, '2023-02-01'),
(2, 3, '2023-03-01'),
(3, 1, '2023-01-01'),
(3, 2, '2023-02-01'),
(3, 3, '2023-03-01');

-- Insérer des données dans la table the_Infos
INSERT INTO the_Infos (idcueilleur, minimal, bonus, mallus) VALUES
(1, 100.00, 5.00, 2.00),
(2, 120.00, 6.00, 3.00),
(3, 110.00, 4.00, 1.50);