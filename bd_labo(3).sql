-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 26 sep. 2025 à 12:12
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bd_labo`
--

-- --------------------------------------------------------

--
-- Structure de la table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissions_group_id_b120cbf9` (`group_id`),
  KEY `auth_group_permissions_permission_id_84c5c92e` (`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  KEY `auth_permission_content_type_id_2f476e4b` (`content_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=201 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add chercheur', 7, 'add_chercheur'),
(26, 'Can change chercheur', 7, 'change_chercheur'),
(27, 'Can delete chercheur', 7, 'delete_chercheur'),
(28, 'Can view chercheur', 7, 'view_chercheur'),
(29, 'Can add domaine', 8, 'add_domaine'),
(30, 'Can change domaine', 8, 'change_domaine'),
(31, 'Can delete domaine', 8, 'delete_domaine'),
(32, 'Can view domaine', 8, 'view_domaine'),
(33, 'Can add laboratoire', 9, 'add_laboratoire'),
(34, 'Can change laboratoire', 9, 'change_laboratoire'),
(35, 'Can delete laboratoire', 9, 'delete_laboratoire'),
(36, 'Can view laboratoire', 9, 'view_laboratoire'),
(37, 'Can add page', 10, 'add_page'),
(38, 'Can change page', 10, 'change_page'),
(39, 'Can delete page', 10, 'delete_page'),
(40, 'Can view page', 10, 'view_page'),
(41, 'Can add partenaire', 11, 'add_partenaire'),
(42, 'Can change partenaire', 11, 'change_partenaire'),
(43, 'Can delete partenaire', 11, 'delete_partenaire'),
(44, 'Can view partenaire', 11, 'view_partenaire'),
(45, 'Can add poste', 12, 'add_poste'),
(46, 'Can change poste', 12, 'change_poste'),
(47, 'Can delete poste', 12, 'delete_poste'),
(48, 'Can view poste', 12, 'view_poste'),
(49, 'Can add recherche phase', 13, 'add_recherchephase'),
(50, 'Can change recherche phase', 13, 'change_recherchephase'),
(51, 'Can delete recherche phase', 13, 'delete_recherchephase'),
(52, 'Can view recherche phase', 13, 'view_recherchephase'),
(53, 'Can add reseau social', 14, 'add_reseausocial'),
(54, 'Can change reseau social', 14, 'change_reseausocial'),
(55, 'Can delete reseau social', 14, 'delete_reseausocial'),
(56, 'Can view reseau social', 14, 'view_reseausocial'),
(57, 'Can add type', 15, 'add_type'),
(58, 'Can change type', 15, 'change_type'),
(59, 'Can delete type', 15, 'delete_type'),
(60, 'Can view type', 15, 'view_type'),
(61, 'Can add type laboratoire', 16, 'add_typelaboratoire'),
(62, 'Can change type laboratoire', 16, 'change_typelaboratoire'),
(63, 'Can delete type laboratoire', 16, 'delete_typelaboratoire'),
(64, 'Can view type laboratoire', 16, 'view_typelaboratoire'),
(65, 'Can add chercheur diplome', 17, 'add_chercheurdiplome'),
(66, 'Can change chercheur diplome', 17, 'change_chercheurdiplome'),
(67, 'Can delete chercheur diplome', 17, 'delete_chercheurdiplome'),
(68, 'Can view chercheur diplome', 17, 'view_chercheurdiplome'),
(69, 'Can add chercheur domaine expertise', 18, 'add_chercheurdomaineexpertise'),
(70, 'Can change chercheur domaine expertise', 18, 'change_chercheurdomaineexpertise'),
(71, 'Can delete chercheur domaine expertise', 18, 'delete_chercheurdomaineexpertise'),
(72, 'Can view chercheur domaine expertise', 18, 'view_chercheurdomaineexpertise'),
(73, 'Can add chercheur mot', 19, 'add_chercheurmot'),
(74, 'Can change chercheur mot', 19, 'change_chercheurmot'),
(75, 'Can delete chercheur mot', 19, 'delete_chercheurmot'),
(76, 'Can view chercheur mot', 19, 'view_chercheurmot'),
(77, 'Can add chercheur laboratoire', 20, 'add_chercheurlaboratoire'),
(78, 'Can change chercheur laboratoire', 20, 'change_chercheurlaboratoire'),
(79, 'Can delete chercheur laboratoire', 20, 'delete_chercheurlaboratoire'),
(80, 'Can view chercheur laboratoire', 20, 'view_chercheurlaboratoire'),
(81, 'Can add laboratoire domaine', 21, 'add_laboratoiredomaine'),
(82, 'Can change laboratoire domaine', 21, 'change_laboratoiredomaine'),
(83, 'Can delete laboratoire domaine', 21, 'delete_laboratoiredomaine'),
(84, 'Can view laboratoire domaine', 21, 'view_laboratoiredomaine'),
(85, 'Can add laboratoire new', 22, 'add_laboratoirenew'),
(86, 'Can change laboratoire new', 22, 'change_laboratoirenew'),
(87, 'Can delete laboratoire new', 22, 'delete_laboratoirenew'),
(88, 'Can view laboratoire new', 22, 'view_laboratoirenew'),
(89, 'Can add laboratoire parcour', 23, 'add_laboratoireparcour'),
(90, 'Can change laboratoire parcour', 23, 'change_laboratoireparcour'),
(91, 'Can delete laboratoire parcour', 23, 'delete_laboratoireparcour'),
(92, 'Can view laboratoire parcour', 23, 'view_laboratoireparcour'),
(93, 'Can add laboratoire parcour condition admission', 24, 'add_laboratoireparcourconditionadmission'),
(94, 'Can change laboratoire parcour condition admission', 24, 'change_laboratoireparcourconditionadmission'),
(95, 'Can delete laboratoire parcour condition admission', 24, 'delete_laboratoireparcourconditionadmission'),
(96, 'Can view laboratoire parcour condition admission', 24, 'view_laboratoireparcourconditionadmission'),
(97, 'Can add laboratoire parcour deboucher', 25, 'add_laboratoireparcourdeboucher'),
(98, 'Can change laboratoire parcour deboucher', 25, 'change_laboratoireparcourdeboucher'),
(99, 'Can delete laboratoire parcour deboucher', 25, 'delete_laboratoireparcourdeboucher'),
(100, 'Can view laboratoire parcour deboucher', 25, 'view_laboratoireparcourdeboucher'),
(101, 'Can add laboratoire parcour specialisation', 26, 'add_laboratoireparcourspecialisation'),
(102, 'Can change laboratoire parcour specialisation', 26, 'change_laboratoireparcourspecialisation'),
(103, 'Can delete laboratoire parcour specialisation', 26, 'delete_laboratoireparcourspecialisation'),
(104, 'Can view laboratoire parcour specialisation', 26, 'view_laboratoireparcourspecialisation'),
(105, 'Can add laboratoire presentation', 27, 'add_laboratoirepresentation'),
(106, 'Can change laboratoire presentation', 27, 'change_laboratoirepresentation'),
(107, 'Can delete laboratoire presentation', 27, 'delete_laboratoirepresentation'),
(108, 'Can view laboratoire presentation', 27, 'view_laboratoirepresentation'),
(109, 'Can add laboratoire slider', 28, 'add_laboratoireslider'),
(110, 'Can change laboratoire slider', 28, 'change_laboratoireslider'),
(111, 'Can delete laboratoire slider', 28, 'delete_laboratoireslider'),
(112, 'Can view laboratoire slider', 28, 'view_laboratoireslider'),
(113, 'Can add laboratoire partenaire', 29, 'add_laboratoirepartenaire'),
(114, 'Can change laboratoire partenaire', 29, 'change_laboratoirepartenaire'),
(115, 'Can delete laboratoire partenaire', 29, 'delete_laboratoirepartenaire'),
(116, 'Can view laboratoire partenaire', 29, 'view_laboratoirepartenaire'),
(117, 'Can add chercheur poste', 30, 'add_chercheurposte'),
(118, 'Can change chercheur poste', 30, 'change_chercheurposte'),
(119, 'Can delete chercheur poste', 30, 'delete_chercheurposte'),
(120, 'Can view chercheur poste', 30, 'view_chercheurposte'),
(121, 'Can add recherche', 31, 'add_recherche'),
(122, 'Can change recherche', 31, 'change_recherche'),
(123, 'Can delete recherche', 31, 'delete_recherche'),
(124, 'Can view recherche', 31, 'view_recherche'),
(125, 'Can add recherche chercheur', 32, 'add_recherchechercheur'),
(126, 'Can change recherche chercheur', 32, 'change_recherchechercheur'),
(127, 'Can delete recherche chercheur', 32, 'delete_recherchechercheur'),
(128, 'Can view recherche chercheur', 32, 'view_recherchechercheur'),
(129, 'Can add recherche laboratoire', 33, 'add_recherchelaboratoire'),
(130, 'Can change recherche laboratoire', 33, 'change_recherchelaboratoire'),
(131, 'Can delete recherche laboratoire', 33, 'delete_recherchelaboratoire'),
(132, 'Can view recherche laboratoire', 33, 'view_recherchelaboratoire'),
(133, 'Can add recherche objectif', 34, 'add_rechercheobjectif'),
(134, 'Can change recherche objectif', 34, 'change_rechercheobjectif'),
(135, 'Can delete recherche objectif', 34, 'delete_rechercheobjectif'),
(136, 'Can view recherche objectif', 34, 'view_rechercheobjectif'),
(137, 'Can add recherche partenaire', 35, 'add_recherchepartenaire'),
(138, 'Can change recherche partenaire', 35, 'change_recherchepartenaire'),
(139, 'Can delete recherche partenaire', 35, 'delete_recherchepartenaire'),
(140, 'Can view recherche partenaire', 35, 'view_recherchepartenaire'),
(141, 'Can add recherche chronologie', 36, 'add_recherchechronologie'),
(142, 'Can change recherche chronologie', 36, 'change_recherchechronologie'),
(143, 'Can delete recherche chronologie', 36, 'delete_recherchechronologie'),
(144, 'Can view recherche chronologie', 36, 'view_recherchechronologie'),
(145, 'Can add recherche publication', 37, 'add_recherchepublication'),
(146, 'Can change recherche publication', 37, 'change_recherchepublication'),
(147, 'Can delete recherche publication', 37, 'delete_recherchepublication'),
(148, 'Can view recherche publication', 37, 'view_recherchepublication'),
(149, 'Can add recherche publication citation', 38, 'add_recherchepublicationcitation'),
(150, 'Can change recherche publication citation', 38, 'change_recherchepublicationcitation'),
(151, 'Can delete recherche publication citation', 38, 'delete_recherchepublicationcitation'),
(152, 'Can view recherche publication citation', 38, 'view_recherchepublicationcitation'),
(153, 'Can add recherche publication mot cle', 39, 'add_recherchepublicationmotcle'),
(154, 'Can change recherche publication mot cle', 39, 'change_recherchepublicationmotcle'),
(155, 'Can delete recherche publication mot cle', 39, 'delete_recherchepublicationmotcle'),
(156, 'Can view recherche publication mot cle', 39, 'view_recherchepublicationmotcle'),
(157, 'Can add recherche realisation', 40, 'add_rechercherealisation'),
(158, 'Can change recherche realisation', 40, 'change_rechercherealisation'),
(159, 'Can delete recherche realisation', 40, 'delete_rechercherealisation'),
(160, 'Can view recherche realisation', 40, 'view_rechercherealisation'),
(161, 'Can add ChercheurReseau', 41, 'add_chercheurreseau'),
(162, 'Can change ChercheurReseau', 41, 'change_chercheurreseau'),
(163, 'Can delete ChercheurReseau', 41, 'delete_chercheurreseau'),
(164, 'Can view ChercheurReseau', 41, 'view_chercheurreseau'),
(165, 'Can add laboratoire type new', 42, 'add_laboratoiretypenew'),
(166, 'Can change laboratoire type new', 42, 'change_laboratoiretypenew'),
(167, 'Can delete laboratoire type new', 42, 'delete_laboratoiretypenew'),
(168, 'Can view laboratoire type new', 42, 'view_laboratoiretypenew'),
(169, 'Can add laboratoire mission', 43, 'add_laboratoiremission'),
(170, 'Can change laboratoire mission', 43, 'change_laboratoiremission'),
(171, 'Can delete laboratoire mission', 43, 'delete_laboratoiremission'),
(172, 'Can view laboratoire mission', 43, 'view_laboratoiremission'),
(173, 'Can add laboratoire presentation image', 44, 'add_laboratoirepresentationimage'),
(174, 'Can change laboratoire presentation image', 44, 'change_laboratoirepresentationimage'),
(175, 'Can delete laboratoire presentation image', 44, 'delete_laboratoirepresentationimage'),
(176, 'Can view laboratoire presentation image', 44, 'view_laboratoirepresentationimage'),
(177, 'Can add laboratoire new album', 45, 'add_laboratoirenewalbum'),
(178, 'Can change laboratoire new album', 45, 'change_laboratoirenewalbum'),
(179, 'Can delete laboratoire new album', 45, 'delete_laboratoirenewalbum'),
(180, 'Can view laboratoire new album', 45, 'view_laboratoirenewalbum'),
(181, 'Can add laboratoire page block entete', 46, 'add_laboratoirepageblockentete'),
(182, 'Can change laboratoire page block entete', 46, 'change_laboratoirepageblockentete'),
(183, 'Can delete laboratoire page block entete', 46, 'delete_laboratoirepageblockentete'),
(184, 'Can view laboratoire page block entete', 46, 'view_laboratoirepageblockentete'),
(185, 'Can add Horaire laboratoire', 47, 'add_horairelaboratoire'),
(186, 'Can change Horaire laboratoire', 47, 'change_horairelaboratoire'),
(187, 'Can delete Horaire laboratoire', 47, 'delete_horairelaboratoire'),
(188, 'Can view Horaire laboratoire', 47, 'view_horairelaboratoire'),
(189, 'Can add Contact laboratoire', 48, 'add_contactlaboratoire'),
(190, 'Can change Contact laboratoire', 48, 'change_contactlaboratoire'),
(191, 'Can delete Contact laboratoire', 48, 'delete_contactlaboratoire'),
(192, 'Can view Contact laboratoire', 48, 'view_contactlaboratoire'),
(193, 'Can add Message de contact', 49, 'add_messagecontact'),
(194, 'Can change Message de contact', 49, 'change_messagecontact'),
(195, 'Can delete Message de contact', 49, 'delete_messagecontact'),
(196, 'Can view Message de contact', 49, 'view_messagecontact'),
(197, 'Can add Candidature au parcours', 50, 'add_candidatureparcours'),
(198, 'Can change Candidature au parcours', 50, 'change_candidatureparcours'),
(199, 'Can delete Candidature au parcours', 50, 'delete_candidatureparcours'),
(200, 'Can view Candidature au parcours', 50, 'view_candidatureparcours');

-- --------------------------------------------------------

--
-- Structure de la table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE IF NOT EXISTS `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(254) COLLATE utf8mb4_general_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$1000000$L7w03MH0q5KXyulmPDxrev$YWpZF4YiN+seeCoN1AIEPgQgC0f4scFXp/knZGwhQGk=', '2025-09-26 05:27:29.477223', 1, 'traore', '', '', 't@gmail.com', 1, 1, '2025-09-08 21:10:23.643893');

-- --------------------------------------------------------

--
-- Structure de la table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
CREATE TABLE IF NOT EXISTS `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_user_id_6a12ed8b` (`user_id`),
  KEY `auth_user_groups_group_id_97559544` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
CREATE TABLE IF NOT EXISTS `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permissions_user_id_a95ead1b` (`user_id`),
  KEY `auth_user_user_permissions_permission_id_1fbb5f2c` (`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `backend_candidatureparcours`
--

DROP TABLE IF EXISTS `backend_candidatureparcours`;
CREATE TABLE IF NOT EXISTS `backend_candidatureparcours` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom_candidat` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom_candidat` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `date_naissance` date NOT NULL,
  `lieu_naissance` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `nationalite` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `telephone_candidat` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `email_candidat` varchar(254) COLLATE utf8mb4_general_ci NOT NULL,
  `adresse_complete` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `ville_residence` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pays_residence` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `niveau_etude_actuel` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `etablissement_origine` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `filiere_etude` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `moyenne_generale` decimal(4,2) NOT NULL,
  `annee_obtention_diplome` int UNSIGNED NOT NULL,
  `cv_candidat` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `lettre_motivation` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `releves_notes` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `diplome_obtenu` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `motivation_principale` longtext COLLATE utf8mb4_general_ci,
  `projet_professionnel` longtext COLLATE utf8mb4_general_ci,
  `attentes_formation` longtext COLLATE utf8mb4_general_ci,
  `statut_candidature` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `date_soumission` datetime(6) NOT NULL,
  `date_derniere_modification` datetime(6) NOT NULL,
  `commentaires_admin` longtext COLLATE utf8mb4_general_ci,
  `note_evaluation` decimal(4,2) DEFAULT NULL,
  `id_parcours_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_candidatureparcours_id_parcours_id_310604f5` (`id_parcours_id`)
) ;

-- --------------------------------------------------------

--
-- Structure de la table `backend_chercheur`
--

DROP TABLE IF EXISTS `backend_chercheur`;
CREATE TABLE IF NOT EXISTS `backend_chercheur` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `biographie` longtext COLLATE utf8mb4_general_ci,
  `statut` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `date_embauche` date NOT NULL,
  `photo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `bureau` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_chercheur`
--

INSERT INTO `backend_chercheur` (`id`, `nom`, `prenom`, `biographie`, `statut`, `date_embauche`, `photo`, `bureau`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'Dubois', 'Marie', 'UU Professeure émérite en biologie moléculaire avec plus de 20 ans d\'expérience dans la recherche sur les maladies génétiques. Directrice du laboratoire depuis 2018, elle a publié plus de 150 articles dans des revues internationales.', 'actif', '2025-09-09', 'static/photoTeam/Capture_décran_2025-09-04_133325.png', 'Bureau 215, Bâtiment Sciences', '2025-09-13 00:00:00.000000', '2025-09-17 10:13:06.947134'),
(2, 'test', 'test', 'test', 'actif', '2025-09-09', 'static/photoTeam/Capture_décran_2025-09-04_155212.png', '', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:22.321942'),
(3, 'Traore', 'Siaka', 'Traore Traore Traore Traore Traore Traore Traore Traore Traore Traore Traore Traore Traore', 'actif', '2025-09-09', 'static/photoTeam/Capture_décran_2025-09-09_011317.png', 'Bureau 215, Bâtiment Sciences', '2025-09-18 16:14:47.027750', '2025-09-18 16:40:23.430639');

-- --------------------------------------------------------

--
-- Structure de la table `backend_chercheurdiplome`
--

DROP TABLE IF EXISTS `backend_chercheurdiplome`;
CREATE TABLE IF NOT EXISTS `backend_chercheurdiplome` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `etablissement` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `diplome` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `annee_obtention` date NOT NULL,
  `id_chercheur_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_chercheurdiplome_id_chercheur_id_6b5a00dd` (`id_chercheur_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_chercheurdiplome`
--

INSERT INTO `backend_chercheurdiplome` (`id`, `etablissement`, `diplome`, `annee_obtention`, `id_chercheur_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'Université de nangui abrogua', 'Doctorat en Biologie Moléculaire', '2019-09-16', 1, '2025-09-16 21:33:36.481549', '2025-09-16 21:33:36.481574'),
(2, 'Université de Lyon', 'Master en Biochimie', '2025-09-16', 1, '2025-09-16 21:34:06.804987', '2025-09-16 21:34:06.805026'),
(3, 'Université de Toulouse', 'Licence en Sciences de la Vie', '1990-09-16', 1, '2025-09-16 21:34:36.611631', '2025-09-16 21:34:36.611652'),
(4, 'GFFF', 'HHHH', '2025-09-16', 2, '2025-09-16 21:34:56.234319', '2025-09-16 21:34:56.234345'),
(5, 'jsdh', 'fjskhsd', '2025-09-18', 3, '2025-09-18 16:14:47.081249', '2025-09-18 16:14:47.081419');

-- --------------------------------------------------------

--
-- Structure de la table `backend_chercheurdomaineexpertise`
--

DROP TABLE IF EXISTS `backend_chercheurdomaineexpertise`;
CREATE TABLE IF NOT EXISTS `backend_chercheurdomaineexpertise` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_chercheur_id` bigint NOT NULL,
  `id_domaine_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_chercheurdomaineexpertise_id_chercheur_id_0ca66dda` (`id_chercheur_id`),
  KEY `backend_chercheurdomaineexpertise_id_domaine_id_8e6ba58b` (`id_domaine_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_chercheurdomaineexpertise`
--

INSERT INTO `backend_chercheurdomaineexpertise` (`id`, `id_chercheur_id`, `id_domaine_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 1, 2, '2025-09-16 21:37:52.366237', '2025-09-16 21:37:52.366270'),
(2, 1, 4, '2025-09-16 21:40:21.104554', '2025-09-16 21:40:21.104582'),
(3, 1, 3, '2025-09-16 21:40:26.075913', '2025-09-16 21:40:26.075938'),
(4, 1, 1, '2025-09-16 21:40:30.873034', '2025-09-16 21:40:30.873058'),
(5, 3, 12, '2025-09-18 16:14:47.238266', '2025-09-18 16:14:47.238289');

-- --------------------------------------------------------

--
-- Structure de la table `backend_chercheurlaboratoire`
--

DROP TABLE IF EXISTS `backend_chercheurlaboratoire`;
CREATE TABLE IF NOT EXISTS `backend_chercheurlaboratoire` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_laboratoire_id` bigint NOT NULL,
  `id_chercheur_poste_id` bigint NOT NULL,
  `statu` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_chercheurlaboratoire_id_laboratoire_id_be0ae0b3` (`id_laboratoire_id`),
  KEY `backend_chercheurlaboratoire_id_chercheur_poste_id_c380b0e5` (`id_chercheur_poste_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_chercheurlaboratoire`
--

INSERT INTO `backend_chercheurlaboratoire` (`id`, `id_laboratoire_id`, `id_chercheur_poste_id`, `statu`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 1, 1, 'Actif', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:26.346546'),
(2, 1, 2, 'Actif', '2025-09-26 03:19:04.123344', '2025-09-26 03:19:58.189358'),
(3, 1, 4, 'Actif', '2025-09-26 03:19:30.915752', '2025-09-26 03:19:30.915807');

-- --------------------------------------------------------

--
-- Structure de la table `backend_chercheurmot`
--

DROP TABLE IF EXISTS `backend_chercheurmot`;
CREATE TABLE IF NOT EXISTS `backend_chercheurmot` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `mot` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `date` date NOT NULL,
  `id_chercheur_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_chercheurmot_id_chercheur_id_4d9ff10e` (`id_chercheur_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_chercheurmot`
--

INSERT INTO `backend_chercheurmot` (`id`, `titre`, `mot`, `date`, `id_chercheur_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'Vision stratégique du laboratoire pour 2024', '\"Notre laboratoire s\'engage dans une démarche d\'excellence scientifique en renforçant nos collaborations internationales et en développant de nouveaux axes de recherche innovants dans le domaine de la médecine personnalisée. Cette année marque un tournant décisif dans notre approche de la recherche, avec l\'intégration de nouvelles technologies de pointe et le renforcement de nos partenariats stratégiques. Nous nous concentrons particulièrement sur l\'intelligence artificielle appliquée à la biologie moléculaire, l\'édition génétique CRISPR de nouvelle génération, et le développement de biomarqueurs prédictifs pour les maladies rares. Notre objectif est de positionner notre laboratoire comme un leader mondial dans la recherche translationnelle, en créant des ponts solides entre la recherche fondamentale et les applications cliniques. Nous investissons massivement dans la formation de nos équipes, l\'acquisition d\'équipements de dernière génération, et la création d\'un écosystème favorable à l\'innovation et à la créativité scientifique.\"', '2025-09-16', 1, '2025-09-16 22:42:46.760878', '2025-09-16 22:42:46.760921'),
(2, 'Nouvelle collaboration avec l\'Institut Pasteur', 'Je suis fière d\'annoncer notre nouvelle collaboration avec l\'Institut Pasteur de Paris pour développer des thérapies géniques révolutionnaires contre les maladies rares.\r\nJe suis fière d\'annoncer notre nouvelle collaboration avec l\'Institut Pasteur de Paris pour développer des thérapies géniques révolutionnaires contre les maladies rares. Cette alliance stratégique représente une opportunité exceptionnelle de combiner nos expertises complémentaires et nos ressources pour accélérer le développement de traitements innovants. Ensemble, nous nous concentrerons sur trois axes majeurs : le développement de vecteurs viraux de nouvelle génération, l\'optimisation des stratégies de délivrance génique, et la mise au point de protocoles thérapeutiques personnalisés. Cette collaboration s\'inscrit dans une vision à long terme visant à révolutionner le traitement des maladies génétiques rares, touchant des milliers de patients dans le monde. Nous prévoyons le lancement de trois essais cliniques de phase I d\'ici 2025, avec des retombées potentielles majeures pour la médecine personnalisée et la thérapie génique.', '2025-09-18', 1, '2025-09-18 01:39:49.574559', '2025-09-18 01:39:49.574590'),
(3, 'Obtention du financement ERC Advanced Grant', 'Notre équipe a obtenu un financement ERC Advanced Grant de 2,5 millions d\'euros pour nos recherches sur les mécanismes épigénétiques des maladies neurodégénératives.\r\nCette reconnaissance prestigieuse de la part du Conseil européen de la recherche valide la qualité et l\'originalité de notre approche scientifique. Sur une période de 5 ans, ce financement nous permettra d\'explorer en profondeur les modifications épigénétiques impliquées dans la maladie d\'Alzheimer, la maladie de Parkinson, et la sclérose latérale amyotrophique. Nous développerons des technologies innovantes de séquençage épigénomique à cellule unique, créerons des modèles in vitro sophistiqués, et identifierons de nouvelles cibles thérapeutiques. L\'objectif ultime est de développer des biomarqueurs précoces et des stratégies thérapeutiques révolutionnaires basées sur la modulation épigénétique. Cette recherche pourrait transformer notre compréhension des maladies neurodégénératives et ouvrir la voie à des traitements préventifs personnalisés.', '2025-09-18', 1, '2025-09-18 01:40:41.375099', '2025-09-18 01:40:41.375131'),
(4, 'Lancement du programme de mentorat jeunes chercheurs', 'Nous inaugurons un programme ambitieux de mentorat destiné aux jeunes chercheurs, visant à favoriser l\'excellence académique et l\'innovation scientifique de la nouvelle génération. \r\nCe programme révolutionnaire met l\'accent sur le développement des compétences de recherche, la formation à l\'entrepreneuriat scientifique, et l\'accompagnement personnalisé de chaque participant. Nous avons établi des partenariats avec des laboratoires internationaux de premier plan pour offrir des opportunités d\'échanges et de collaborations uniques. Le programme comprend des ateliers spécialisés, des conférences avec des prix Nobel, et un système de bourses d\'excellence pour soutenir les projets les plus prometteurs. Notre objectif est de former les leaders scientifiques de demain en leur donnant accès aux meilleures ressources et en cultivant leur créativité et leur esprit d\'innovation. Les premiers résultats montrent déjà une augmentation significative de la productivité scientifique et de la satisfaction des participants.', '2025-09-18', 1, '2025-09-18 01:41:37.710228', '2025-09-18 01:41:37.710266');

-- --------------------------------------------------------

--
-- Structure de la table `backend_chercheurposte`
--

DROP TABLE IF EXISTS `backend_chercheurposte`;
CREATE TABLE IF NOT EXISTS `backend_chercheurposte` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_chercheur_id` bigint NOT NULL,
  `id_poste_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_chercheurposte_id_chercheur_id_b819dbe7` (`id_chercheur_id`),
  KEY `backend_chercheurposte_id_poste_id_0b4349c9` (`id_poste_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_chercheurposte`
--

INSERT INTO `backend_chercheurposte` (`id`, `id_chercheur_id`, `id_poste_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 1, 1, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:28.181409'),
(2, 1, 4, '2025-09-18 01:29:19.470207', '2025-09-18 01:29:19.470236'),
(4, 3, 12, '2025-09-18 16:40:23.431927', '2025-09-18 16:40:23.431949');

-- --------------------------------------------------------

--
-- Structure de la table `backend_chercheurreseau`
--

DROP TABLE IF EXISTS `backend_chercheurreseau`;
CREATE TABLE IF NOT EXISTS `backend_chercheurreseau` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_chercheur_id` bigint NOT NULL,
  `type_reseau` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `contact` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_chercheurreseau_id_chercheur_id_86de1727` (`id_chercheur_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_chercheurreseau`
--

INSERT INTO `backend_chercheurreseau` (`id`, `id_chercheur_id`, `type_reseau`, `contact`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 1, 'Téléphone', '0574267601', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:29.722938'),
(2, 1, 'Twitter', 'google.com', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:29.722938'),
(3, 1, 'Email', 't@gmail.com', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:29.722938'),
(4, 3, 'Instagram', 'djkqhsk', '2025-09-18 16:14:47.296466', '2025-09-18 16:14:47.296491'),
(5, 3, 'YouTube', 'ldkjsf', '2025-09-18 16:14:47.411119', '2025-09-18 16:14:47.411147');

-- --------------------------------------------------------

--
-- Structure de la table `backend_contactlaboratoire`
--

DROP TABLE IF EXISTS `backend_contactlaboratoire`;
CREATE TABLE IF NOT EXISTS `backend_contactlaboratoire` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type_contact` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `adresse_complete` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `ville` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `code_postal` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pays` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `telephone_principal` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email_principal` varchar(254) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mot_de_passe_email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `site_web` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `est_actif` tinyint(1) NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  `id_laboratoire_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_contactlaboratoire_id_laboratoire_id_d87a8002` (`id_laboratoire_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_contactlaboratoire`
--

INSERT INTO `backend_contactlaboratoire` (`id`, `type_contact`, `adresse_complete`, `ville`, `code_postal`, `pays`, `telephone_principal`, `email_principal`, `mot_de_passe_email`, `site_web`, `est_actif`, `creer_le`, `mise_a_jour_le`, `id_laboratoire_id`) VALUES
(1, 'principal', 'jhkjlk', 'fh', 'fj', 'Égypte', '123252624', 'b@gmail.com', 'b@gmail.com', NULL, 1, '2025-09-26 06:00:26.667807', '2025-09-26 06:00:26.667831', 1);

-- --------------------------------------------------------

--
-- Structure de la table `backend_domaine`
--

DROP TABLE IF EXISTS `backend_domaine`;
CREATE TABLE IF NOT EXISTS `backend_domaine` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_domaine`
--

INSERT INTO `backend_domaine` (`id`, `titre`, `description`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'Physique Quantique', 'Recherches sur les propriétés quantiques de la matière et applications technologiques.', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:30.490334'),
(2, 'Biotechnologies', 'Développement de nouvelles thérapies et techniques d\'analyse génétique avancées.', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:30.490334'),
(3, 'Intelligence Artificielle', 'Algorithmes d\'apprentissage automatique pour la résolution de problèmes complexes.', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:30.490334'),
(4, 'Énergies Renouvelables', 'Solutions innovantes pour un avenir énergétique durable et efficace.', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:30.490334'),
(9, 'Recherche Médicale', 'Études avancées sur les pathologies et développement de traitements innovants.', '2025-09-17 16:32:48.923512', '2025-09-17 16:32:48.923539'),
(10, 'Technologies Avancées', 'Développement de systèmes informatiques et électroniques de pointe.', '2025-09-17 16:33:08.984874', '2025-09-17 16:33:08.984900'),
(11, 'Sciences Environnementales', 'Étude de l\'impact écologique et solutions de développement durable.', '2025-09-17 16:33:18.758721', '2025-09-17 16:33:18.758746'),
(12, 'Cybersécurité', 'Protection des systèmes d\'information et sécurité des données numériques.', '2025-09-17 16:33:33.125669', '2025-09-17 16:33:33.125695');

-- --------------------------------------------------------

--
-- Structure de la table `backend_horairelaboratoire`
--

DROP TABLE IF EXISTS `backend_horairelaboratoire`;
CREATE TABLE IF NOT EXISTS `backend_horairelaboratoire` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `jour_semaine` int NOT NULL,
  `heure_ouverture` time(6) DEFAULT NULL,
  `heure_fermeture` time(6) DEFAULT NULL,
  `est_ferme` tinyint(1) NOT NULL,
  `notes` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  `contact_laboratoire_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_horairelaboratoire_contact_laboratoire_id_db765e71` (`contact_laboratoire_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `backend_laboratoire`
--

DROP TABLE IF EXISTS `backend_laboratoire`;
CREATE TABLE IF NOT EXISTS `backend_laboratoire` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `logo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ufr` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `date_de_creation` date NOT NULL,
  `id_type_laboratoire_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_laboratoire_id_type_laboratoire_id_9aecc67a` (`id_type_laboratoire_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_laboratoire`
--

INSERT INTO `backend_laboratoire` (`id`, `nom`, `logo`, `ufr`, `date_de_creation`, `id_type_laboratoire_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'labo info', 'static/images/Capture_décran_2025-08-05_232851.png', 'SFA', '1999-01-01', 7, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:31.644378'),
(2, 'Testt', 'static/images/Capture_décran_2025-09-09_011317_CoCPWjF.png', 'SFA', '1999-01-01', 3, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:31.644378');

-- --------------------------------------------------------

--
-- Structure de la table `backend_laboratoiredomaine`
--

DROP TABLE IF EXISTS `backend_laboratoiredomaine`;
CREATE TABLE IF NOT EXISTS `backend_laboratoiredomaine` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_domaine_id` bigint NOT NULL,
  `id_laboratoire_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  `icone` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_laboratoiredomaine_id_domaine_id_7d2226c5` (`id_domaine_id`),
  KEY `backend_laboratoiredomaine_id_laboratoire_id_90ad0ab7` (`id_laboratoire_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_laboratoiredomaine`
--

INSERT INTO `backend_laboratoiredomaine` (`id`, `id_domaine_id`, `id_laboratoire_id`, `creer_le`, `mise_a_jour_le`, `icone`) VALUES
(1, 2, 1, '2025-09-13 00:00:00.000000', '2025-09-17 16:36:29.549036', 'Dna-Science'),
(2, 4, 1, '2025-09-13 00:00:00.000000', '2025-09-17 16:48:37.724968', 'Zap-Énergie'),
(3, 3, 1, '2025-09-13 00:00:00.000000', '2025-09-17 16:35:02.942490', 'Brain-Science'),
(4, 1, 1, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:32.497019', 'Atom-Science'),
(5, 12, 1, '2025-09-17 16:38:06.157786', '2025-09-17 16:38:06.157848', 'Shield-Sécurité'),
(6, 9, 1, '2025-09-17 16:38:37.244732', '2025-09-17 16:38:37.244759', 'Microscope-Science'),
(7, 11, 1, '2025-09-17 16:38:51.482978', '2025-09-17 16:38:51.483004', 'Leaf-Nature'),
(8, 10, 1, '2025-09-17 16:39:30.860125', '2025-09-17 16:39:30.860163', 'Cpu-Technologie');

-- --------------------------------------------------------

--
-- Structure de la table `backend_laboratoiremission`
--

DROP TABLE IF EXISTS `backend_laboratoiremission`;
CREATE TABLE IF NOT EXISTS `backend_laboratoiremission` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `annee_creation` date NOT NULL,
  `budget_annuel` bigint NOT NULL,
  `monnaie` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `id_laboratoire_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_laboratoiremission_id_laboratoire_id_7e381778` (`id_laboratoire_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_laboratoiremission`
--

INSERT INTO `backend_laboratoiremission` (`id`, `description`, `annee_creation`, `budget_annuel`, `monnaie`, `id_laboratoire_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'Nous nous consacrons à l\'avancement des connaissances scientifiques à travers des recherches multidisciplinaires qui répondent aux défis contemporains de notre société. Notre approche collaborative favorise l\'innovation et la découverte.\r\n\r\nEn partenariat avec des institutions internationales, nous formons la prochaine génération de chercheurs tout en développant des solutions concrètes pour améliorer la qualité de vie. jfdkjkf', '1999-01-01', 10000000, 'FCFA', 1, '2025-09-13 00:00:00.000000', '2025-09-17 13:32:44.485042');

-- --------------------------------------------------------

--
-- Structure de la table `backend_laboratoirenew`
--

DROP TABLE IF EXISTS `backend_laboratoirenew`;
CREATE TABLE IF NOT EXISTS `backend_laboratoirenew` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `titre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `extrait` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `phrase_cle` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `contenu_complet` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `image_principal` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `statu` varchar(90) COLLATE utf8mb4_general_ci NOT NULL,
  `id_laboratoire_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  `date_realisation_debut` date NOT NULL,
  `date_realisation_fin` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_laboratoirenew_id_laboratoire_id_2c2e105c` (`id_laboratoire_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_laboratoirenew`
--

INSERT INTO `backend_laboratoirenew` (`id`, `titre`, `extrait`, `phrase_cle`, `contenu_complet`, `image_principal`, `statu`, `id_laboratoire_id`, `creer_le`, `mise_a_jour_le`, `date_realisation_debut`, `date_realisation_fin`) VALUES
(1, 'Prix d\'Excellence en Recherche 2024', 'none', 'Notre laboratoire a reçu le Prix d\'Excellence en Recherche 2024 pour ses travaux révolutionnaires en thérapie génique.', 'Un prix mérité après 5 années de recherche\r\nCette distinction vient récompenser l\'excellence de nos travaux en thérapie génique, un domaine dans lequel notre laboratoire s\'est spécialisé depuis 2019. L\'équipe dirigée par le Dr. Sarah Martin a développé des approches innovantes pour traiter plusieurs maladies génétiques rares.\r\n\r\nDes résultats prometteurs\r\nLes essais cliniques de phase I ont montré une efficacité remarquable avec 85% de réponse positive chez les patients traités. Ces résultats dépassent largement les attentes initiales et ouvrent la voie à de nouveaux traitements pour des milliers de patients.\r\n\r\nInvestissement dans l\'avenir\r\nLa dotation de 500 000€ permettra d\'acquérir un séquenceur de nouvelle génération et de recruter deux post-doctorants spécialisés en édition génomique. Ces investissements renforceront notre capacité de recherche pour les années à venir.', 'static/images/Capture_décran_2025-08-05_232851_ahglIHm.png', 'Actif', 1, '2025-09-13 23:54:50.376314', '2025-09-18 10:17:24.395334', '2025-09-18', NULL),
(2, 'Nouveau Partenariat avec l\'Institut Max Planck', 'none', 'Signature d\'un accord de collaboration de 3 ans pour des recherches en physique quantique avancée.', 'Un partenariat stratégique\r\nL\'accord signé avec l\'Institut Max Planck de Munich marque une étape importante dans notre développement international. Cette collaboration portera sur les technologies quantiques et l\'informatique quantique.\r\n\r\nÉchanges scientifiques\r\nLe programme prévoit l\'échange de 6 chercheurs par an et l\'accès privilégié aux installations de calcul quantique de l\'Institut Max Planck. Nos équipes pourront ainsi mener des expériences impossibles à réaliser avec nos équipements actuels.\r\n\r\nObjectifs de recherche\r\nLes projets communs se concentreront sur le développement d\'algorithmes quantiques pour la simulation moléculaire et l\'optimisation de processus industriels complexes.', 'static/images/Capture_décran_2025-08-05_232851_bP5ttxp.png', 'Actif', 1, '2025-09-13 23:55:58.559954', '2025-09-18 17:15:18.763102', '2025-09-18', NULL),
(4, 'Publication Majeure dans Nature', 'du journal', 'Notre équipe publie des résultats breakthrough sur la correction d\'erreurs quantiques dans Nature Quantum Information.', 'Un prix mérité après 5 années de recherche\r\nCette distinction vient récompenser l\'excellence de nos travaux en thérapie génique, un domaine dans lequel notre laboratoire s\'est spécialisé depuis 2019. L\'équipe dirigée par le Dr. Sarah Martin a développé des approches innovantes pour traiter plusieurs maladies génétiques rares.\r\n\r\nDes résultats prometteurs\r\nLes essais cliniques de phase I ont montré une efficacité remarquable avec 85% de réponse positive chez les patients traités. Ces résultats dépassent largement les attentes initiales et ouvrent la voie à de nouveaux traitements pour des milliers de patients.\r\n\r\nInvestissement dans l\'avenir\r\nLa dotation de 500 000€ permettra d\'acquérir un séquenceur de nouvelle génération et de recruter deux post-doctorants spécialisés en édition génomique. Ces investissements renforceront notre capacité de recherche pour les années à venir.', 'static/images/Capture_décran_2025-09-04_133325.png', 'Actif', 1, '2025-09-18 09:17:32.315537', '2025-09-18 17:16:49.043258', '2025-09-18', '2026-09-18');

-- --------------------------------------------------------

--
-- Structure de la table `backend_laboratoirenewalbum`
--

DROP TABLE IF EXISTS `backend_laboratoirenewalbum`;
CREATE TABLE IF NOT EXISTS `backend_laboratoirenewalbum` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  `id_laboratoire_new_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_laboratoirenewalbum_id_laboratoire_new_id_883e01ba` (`id_laboratoire_new_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_laboratoirenewalbum`
--

INSERT INTO `backend_laboratoirenewalbum` (`id`, `image`, `creer_le`, `mise_a_jour_le`, `id_laboratoire_new_id`) VALUES
(1, 'static/AlbumActualite/Capture001.png', '2025-09-14 13:23:08.896241', '2025-09-14 13:23:08.896290', 1),
(2, 'static/AlbumActualite/Capture_décran_2025-09-04_133325.png', '2025-09-14 13:31:29.667752', '2025-09-14 13:31:29.667793', 1),
(3, 'static/AlbumActualite/Capture_décran_2025-09-04_155212.png', '2025-09-14 13:31:43.088212', '2025-09-14 13:31:43.088254', 2);

-- --------------------------------------------------------

--
-- Structure de la table `backend_laboratoirepageblockentete`
--

DROP TABLE IF EXISTS `backend_laboratoirepageblockentete`;
CREATE TABLE IF NOT EXISTS `backend_laboratoirepageblockentete` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `block` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `titre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  `id_laboratoire_id` bigint NOT NULL,
  `id_page_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_laboratoirepageblockentete_id_laboratoire_id_f48a8f24` (`id_laboratoire_id`),
  KEY `backend_laboratoirepageblockentete_id_page_id_221fe8ba` (`id_page_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_laboratoirepageblockentete`
--

INSERT INTO `backend_laboratoirepageblockentete` (`id`, `block`, `titre`, `description`, `creer_le`, `mise_a_jour_le`, `id_laboratoire_id`, `id_page_id`) VALUES
(1, 'about', 'Un Laboratoire d\'Excellence', 'Depuis plus de 15 ans, notre laboratoire est à l\'avant-garde de la recherche scientifique, repoussant constamment les limites de la connaissance pour créer un impact positif sur la société.', '2025-09-17 11:34:25.833290', '2025-09-17 11:34:25.833364', 1, 2),
(2, 'director', 'Rencontrez Notre Directrice', 'Une leadership visionnaire qui guide notre laboratoire vers l\'excellence scientifique et l\'innovation', '2025-09-17 11:34:52.030491', '2025-09-17 11:34:52.030527', 1, 2),
(3, 'racourci', 'Excellence Scientifique', 'Découvrez notre approche innovante de la recherche scientifique et nos contributions à l\'avancement des connaissances mondiales.', '2025-09-17 11:35:19.742784', '2025-09-17 11:35:19.742810', 1, 2),
(4, 'chiffre', 'Notre Impact en Chiffres', 'Des résultats concrets qui témoignent de notre engagement dans l\'excellence et l\'innovation scientifique.', '2025-09-17 11:35:57.337699', '2025-09-17 12:27:32.064609', 1, 2),
(5, 'new', 'Dernières Nouvelles du Laboratoire', 'Restez informés de nos dernières découvertes, collaborations et reconnaissances dans le monde scientifique.', '2025-09-17 11:36:29.215910', '2025-09-17 11:36:29.215948', 1, 2),
(6, 'presentation', 'Présentation du Laboratoire', 'Découvrez l\'histoire, la vision et les valeurs qui guident notre laboratoire de recherche', '2025-09-17 16:59:23.986533', '2025-09-17 16:59:23.986560', 1, 1),
(7, 'domaine', 'Nos Domaines d\'Expertise', 'Découvrez les domaines dans lesquels notre laboratoire excelle', '2025-09-17 17:00:06.587676', '2025-09-17 17:00:06.587738', 1, 1),
(8, 'partenaire', 'Nos Partenaires', 'Collaborations avec des institutions de renom', '2025-09-17 17:00:30.843404', '2025-09-17 17:00:30.843431', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `backend_laboratoireparcour`
--

DROP TABLE IF EXISTS `backend_laboratoireparcour`;
CREATE TABLE IF NOT EXISTS `backend_laboratoireparcour` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom_parour` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `date_creation` date NOT NULL,
  `description` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `duree_formation` int NOT NULL,
  `nombre_etudiant_max` int NOT NULL,
  `statu` varchar(90) COLLATE utf8mb4_general_ci NOT NULL,
  `id_laboratoire_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_laboratoireparcour_id_laboratoire_id_441d0a96` (`id_laboratoire_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_laboratoireparcour`
--

INSERT INTO `backend_laboratoireparcour` (`id`, `nom_parour`, `date_creation`, `description`, `duree_formation`, `nombre_etudiant_max`, `statu`, `id_laboratoire_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'Master Biologie Moléculaire et Cellulaire', '2025-09-08', 'Formation approfondie en biologie moléculaire avec spécialisation en recherche fondamentale et appliquée. Stage obligatoire de 6 mois dans notre laboratoire.', 3, 12, 'Actif', 1, '2025-09-13 00:00:00.000000', '2025-09-26 04:22:01.943479'),
(2, 'parcour', '2025-06-08', 'sdfjksdfjsdf', 25, 3, 'Actif', 1, '2025-09-26 03:44:09.326245', '2025-09-26 03:46:06.245811');

-- --------------------------------------------------------

--
-- Structure de la table `backend_laboratoireparcourconditionadmission`
--

DROP TABLE IF EXISTS `backend_laboratoireparcourconditionadmission`;
CREATE TABLE IF NOT EXISTS `backend_laboratoireparcourconditionadmission` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `valeur` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_laboratoire_parcour_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_laboratoireparcourc_id_laboratoire_parcour_id_0bd0e8a6` (`id_laboratoire_parcour_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_laboratoireparcourconditionadmission`
--

INSERT INTO `backend_laboratoireparcourconditionadmission` (`id`, `titre`, `valeur`, `id_laboratoire_parcour_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'sdlkjf', '1/20', 2, '2025-09-26 03:44:10.089059', '2025-09-26 03:44:10.089236'),
(2, 'sdfkl', '2/20', 2, '2025-09-26 03:44:10.240313', '2025-09-26 03:44:10.240369'),
(3, 'UUU', '1/20', 1, '2025-09-26 04:22:01.945819', '2025-09-26 04:22:01.945847'),
(4, 'III', '2/20', 1, '2025-09-26 04:22:01.946592', '2025-09-26 04:22:01.946615');

-- --------------------------------------------------------

--
-- Structure de la table `backend_laboratoireparcourdeboucher`
--

DROP TABLE IF EXISTS `backend_laboratoireparcourdeboucher`;
CREATE TABLE IF NOT EXISTS `backend_laboratoireparcourdeboucher` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `deboucher` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `id_laboratoire_parcour_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_laboratoireparcourd_id_laboratoire_parcour_id_2ef7902b` (`id_laboratoire_parcour_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_laboratoireparcourdeboucher`
--

INSERT INTO `backend_laboratoireparcourdeboucher` (`id`, `deboucher`, `id_laboratoire_parcour_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'sdjf', 2, '2025-09-26 03:44:09.327910', '2025-09-26 03:44:09.327935'),
(2, 'TTT', 1, '2025-09-26 04:22:01.944781', '2025-09-26 04:22:01.944805');

-- --------------------------------------------------------

--
-- Structure de la table `backend_laboratoireparcourspecialisation`
--

DROP TABLE IF EXISTS `backend_laboratoireparcourspecialisation`;
CREATE TABLE IF NOT EXISTS `backend_laboratoireparcourspecialisation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `specialisation` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `id_laboratoire_parcour_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_laboratoireparcours_id_laboratoire_parcour_id_ccca7da1` (`id_laboratoire_parcour_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_laboratoireparcourspecialisation`
--

INSERT INTO `backend_laboratoireparcourspecialisation` (`id`, `specialisation`, `id_laboratoire_parcour_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'jsdfk', 2, '2025-09-26 03:44:10.242017', '2025-09-26 03:44:10.242070'),
(2, 'klfsdj', 2, '2025-09-26 03:44:10.386760', '2025-09-26 03:44:10.386813'),
(3, 'kljsdf', 2, '2025-09-26 03:44:10.388347', '2025-09-26 03:44:10.388398'),
(4, 'OOO', 1, '2025-09-26 04:22:01.947312', '2025-09-26 04:22:01.947335'),
(5, 'OOO', 1, '2025-09-26 04:22:01.947975', '2025-09-26 04:22:01.947997');

-- --------------------------------------------------------

--
-- Structure de la table `backend_laboratoirepartenaire`
--

DROP TABLE IF EXISTS `backend_laboratoirepartenaire`;
CREATE TABLE IF NOT EXISTS `backend_laboratoirepartenaire` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_laboratoire_id` bigint NOT NULL,
  `id_partenaire_id` bigint NOT NULL,
  `statu` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `type_partenaire` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_laboratoirepartenaire_id_laboratoire_id_03130fe6` (`id_laboratoire_id`),
  KEY `backend_laboratoirepartenaire_id_partenaire_id_d104dc95` (`id_partenaire_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_laboratoirepartenaire`
--

INSERT INTO `backend_laboratoirepartenaire` (`id`, `id_laboratoire_id`, `id_partenaire_id`, `statu`, `type_partenaire`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 1, 1, 'Actif', 'Financiers', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:38.599307'),
(2, 1, 4, 'Actif', 'Académiques et scientifiques', '2025-09-17 15:27:10.203084', '2025-09-17 15:27:10.203112'),
(3, 1, 9, 'Actif', 'Institutionnels', '2025-09-17 15:27:17.304111', '2025-09-17 15:27:17.304136'),
(4, 1, 7, 'Actif', 'Industriels et privés', '2025-09-17 15:27:25.132331', '2025-09-17 15:27:25.132360'),
(5, 1, 3, 'Actif', 'Financiers', '2025-09-17 15:27:32.260748', '2025-09-17 15:27:32.260771'),
(6, 1, 5, 'Actif', 'Industriels et privés', '2025-09-17 15:27:38.393632', '2025-09-17 15:27:38.393665'),
(7, 1, 2, 'Actif', 'Industriels et privés', '2025-09-17 15:27:46.644694', '2025-09-17 15:27:46.644720'),
(8, 1, 6, 'Actif', 'Académiques et scientifiques', '2025-09-17 15:27:53.053819', '2025-09-17 15:27:53.053846'),
(9, 1, 8, 'Actif', 'Associatifs et société civile', '2025-09-17 15:28:00.852594', '2025-09-17 15:28:00.852619');

-- --------------------------------------------------------

--
-- Structure de la table `backend_laboratoirepresentation`
--

DROP TABLE IF EXISTS `backend_laboratoirepresentation`;
CREATE TABLE IF NOT EXISTS `backend_laboratoirepresentation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `id_laboratoire_id` bigint NOT NULL,
  `titre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_laboratoirepresentation_id_laboratoire_id_bd35ed2a` (`id_laboratoire_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_laboratoirepresentation`
--

INSERT INTO `backend_laboratoirepresentation` (`id`, `description`, `id_laboratoire_id`, `titre`, `creer_le`, `mise_a_jour_le`) VALUES
(2, 'Fondé en 2005, notre laboratoire s\'est imposé comme un centre d\'excellence en recherche scientifique en Côte d\'Ivoire. Nous avons évolué d\'une petite équipe de chercheurs passionnés à une institution reconnue internationalement pour ses contributions à la science et à l\'innovation.', 1, 'Notre Histoire', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:39.752285'),
(3, 'Être le laboratoire de référence en Afrique de l\'Ouest pour la recherche multidisciplinaire, en contribuant à résoudre les défis contemporains par l\'innovation scientifique et technologique.', 1, 'Notre Vision', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:39.752285'),
(4, 'Excellence scientifique et rigueur méthodologique\r\nCollaboration interdisciplinaire et partenariats stratégiques\r\nInnovation responsable et développement durable\r\nFormation de la prochaine génération de chercheurs', 1, 'Nos Valeurs', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:39.752285');

-- --------------------------------------------------------

--
-- Structure de la table `backend_laboratoirepresentationimage`
--

DROP TABLE IF EXISTS `backend_laboratoirepresentationimage`;
CREATE TABLE IF NOT EXISTS `backend_laboratoirepresentationimage` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `id_laboratoire_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_laboratoirepresentationimage_id_laboratoire_id_f2277451` (`id_laboratoire_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_laboratoirepresentationimage`
--

INSERT INTO `backend_laboratoirepresentationimage` (`id`, `image`, `id_laboratoire_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'static/imagePresentation/photo-1532187863486-abf9dbad1b69.jpeg', 1, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:40.392062');

-- --------------------------------------------------------

--
-- Structure de la table `backend_laboratoireslider`
--

DROP TABLE IF EXISTS `backend_laboratoireslider`;
CREATE TABLE IF NOT EXISTS `backend_laboratoireslider` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `id_laboratoire_id` bigint NOT NULL,
  `id_page_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_laboratoireslider_id_laboratoire_id_a2c063a0` (`id_laboratoire_id`),
  KEY `backend_laboratoireslider_id_page_id_69a37524` (`id_page_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_laboratoireslider`
--

INSERT INTO `backend_laboratoireslider` (`id`, `titre`, `description`, `id_laboratoire_id`, `id_page_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'À Propos de Notre Laboratoire', 'Depuis plus de 20 ans, notre laboratoire est à l\'avant-garde de la recherche scientifique, combinant excellence académique et innovation technologique pour façonner l\'avenir.', 1, 1, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:41.335623'),
(2, 'Innovation & Découverte', 'Notre laboratoire repousse les frontières de la science moderne à travers des recherches interdisciplinaires et des technologies de pointe.', 1, 2, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:41.335623'),
(3, 'Actualités du Laboratoire', 'Suivez les dernières nouvelles, découvertes et événements de notre laboratoire. Restez informés de nos avancées scientifiques et collaborations.', 1, 6, '2025-09-14 01:07:53.638703', '2025-09-14 01:07:53.638745'),
(4, 'Nos Projets de Recherche', 'Découvrez nos projets de recherche actuels et passés qui repoussent les limites de la science et contribuent à l\'avancement technologique mondial.', 1, 4, '2025-09-14 15:08:03.045760', '2025-09-14 15:08:03.045788');

-- --------------------------------------------------------

--
-- Structure de la table `backend_laboratoiretypenew`
--

DROP TABLE IF EXISTS `backend_laboratoiretypenew`;
CREATE TABLE IF NOT EXISTS `backend_laboratoiretypenew` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_laboratoire_new_id` bigint NOT NULL,
  `id_type_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_laboratoiretypenew_id_laboratoire_new_id_aa8e145a` (`id_laboratoire_new_id`),
  KEY `backend_laboratoiretypenew_id_type_id_c38e6e8a` (`id_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_laboratoiretypenew`
--

INSERT INTO `backend_laboratoiretypenew` (`id`, `id_laboratoire_new_id`, `id_type_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 1, 1, '2025-09-14 00:04:04.568502', '2025-09-14 00:04:04.568556'),
(2, 1, 3, '2025-09-14 00:04:12.570270', '2025-09-14 00:04:35.431310'),
(3, 2, 4, '2025-09-14 00:04:27.591257', '2025-09-14 00:04:27.591294'),
(4, 2, 2, '2025-09-14 00:04:45.305199', '2025-09-14 00:04:45.305224'),
(5, 1, 6, '2025-09-14 01:09:18.557849', '2025-09-14 01:09:18.557901'),
(6, 1, 6, '2025-09-17 10:42:43.682015', '2025-09-17 10:42:43.682044'),
(7, 4, 1, '2025-09-18 17:16:49.044841', '2025-09-18 17:16:49.044866');

-- --------------------------------------------------------

--
-- Structure de la table `backend_messagecontact`
--

DROP TABLE IF EXISTS `backend_messagecontact`;
CREATE TABLE IF NOT EXISTS `backend_messagecontact` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `prenom_expediteur` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `nom_expediteur` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email_expediteur` varchar(254) COLLATE utf8mb4_general_ci NOT NULL,
  `organisation_expediteur` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sujet_message` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `contenu_message` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `statut_message` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `priorite` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `reponse_admin` longtext COLLATE utf8mb4_general_ci,
  `responsable_reponse` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_reponse` datetime(6) DEFAULT NULL,
  `est_traite` tinyint(1) NOT NULL,
  `date_envoi` datetime(6) NOT NULL,
  `date_derniere_modification` datetime(6) NOT NULL,
  `id_laboratoire_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_messagecontact_id_laboratoire_id_74bbf0af` (`id_laboratoire_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `backend_page`
--

DROP TABLE IF EXISTS `backend_page`;
CREATE TABLE IF NOT EXISTS `backend_page` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_page`
--

INSERT INTO `backend_page` (`id`, `titre`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'about', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:42.605607'),
(2, 'acceuil', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:42.605607'),
(3, 'team', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:42.605607'),
(4, 'research', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:42.605607'),
(5, 'publications', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:42.605607'),
(6, 'new', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:42.605607'),
(7, 'level', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:42.605607'),
(8, 'contact', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:42.605607');

-- --------------------------------------------------------

--
-- Structure de la table `backend_partenaire`
--

DROP TABLE IF EXISTS `backend_partenaire`;
CREATE TABLE IF NOT EXISTS `backend_partenaire` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom_partenaire` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `pays` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ville` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adresse` longtext COLLATE utf8mb4_general_ci,
  `site_web` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(254) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telephone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_general_ci,
  `date_debut_partenariat` date DEFAULT NULL,
  `date_fin_partenariat` date DEFAULT NULL,
  `notes` longtext COLLATE utf8mb4_general_ci,
  `logo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_partenaire`
--

INSERT INTO `backend_partenaire` (`id`, `nom_partenaire`, `pays`, `ville`, `adresse`, `site_web`, `email`, `telephone`, `description`, `date_debut_partenariat`, `date_fin_partenariat`, `notes`, `logo`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'Una', 'Côte d’Ivoire', 'Abidjan', 'Université Nangui Abrogoua, abobo-adjamé, Cote d\'ivoire', 'https://www.univ-na.ci/', 'k75871724@gmail.com', '0574267601', 'c\'est une université', '2000-01-01', '2100-01-01', 'ok', '', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:43.409797'),
(2, 'Université Félix Houphouët-Boigny', 'Cote d\'ivoire', 'IIII', 'UUUU', 'https://www.univ-fhb.edu.ci', 'i@gmail.com', '111111', 'Partenariat académique et recherche collaborative', '2025-09-17', NULL, 'III', 'static/logoPartenaire/Capture_décran_2025-09-04_155212.png', '2025-09-17 15:19:23.780806', '2025-09-17 15:19:23.780830'),
(3, 'INPHB', 'Cote d\'ivoire', 'IIII', 'sdjhsdf', 'https://www.inphb.edu.ci', 'i@gmail.com', '111111', 'Institut National Polytechnique Houphouët-Boigny', '2025-09-17', NULL, 'fjkdgjkdfjkghkjd jhjdjkd hj hk kdhjk jkjkdgjkdfgnk', 'static/logoPartenaire/Capture_décran_2025-09-09_010945.png', '2025-09-17 15:20:42.761958', '2025-09-17 15:20:42.762009'),
(4, 'CNRA', 'Cote d\'ivoire', 'IIII', 'jhdsgsjhdfgsj', NULL, 'i@gmail.com', '111111', 'Centre National de Recherche Agronomique', '2025-09-17', NULL, 'Centre National de Recherche Agronomique', 'static/logoPartenaire/Capture_décran_2025-09-09_011045.png', '2025-09-17 15:21:35.541757', '2025-09-17 15:21:35.541800'),
(5, 'LANADA', 'Cote d\'ivoire', 'IIII', 'LANADA', NULL, 'i@gmail.com', '111111', 'Laboratoire National d\'Appui au Développement Agricole', '2025-09-17', NULL, 'Laboratoire National d\'Appui au Développement Agricole', 'static/logoPartenaire/Capture_décran_2025-09-09_011207.png', '2025-09-17 15:22:08.881701', '2025-09-17 15:22:08.881741'),
(6, 'Université Nangui Abrogoua', 'Cote d\'ivoire', 'IIII', 'Collaboration en sciences naturelles et environnementales', NULL, 'i@gmail.com', '111111', 'Collaboration en sciences naturelles et environnementales', '2025-09-17', NULL, 'Collaboration en sciences naturelles et environnementales', 'static/logoPartenaire/Capture_décran_2025-09-09_011223.png', '2025-09-17 15:22:43.048882', '2025-09-17 15:22:43.048915'),
(7, 'École Normale Supérieure', 'Cote d\'ivoire', 'IIII', 'École Normale Supérieure', NULL, 'i@gmail.com', '111111', 'Formation et recherche en sciences de l\'éducation', '2025-09-17', NULL, 'Formation et recherche en sciences de l\'éducation', 'static/logoPartenaire/Capture_décran_2025-09-09_011317.png', '2025-09-17 15:23:08.647733', '2025-09-17 15:23:08.647773'),
(8, 'UVCI', 'Cote d\'ivoire', 'IIII', 'UVCI', NULL, 'i@gmail.com', '111111', 'Université Virtuelle de Côte d\'Ivoire', '2025-09-17', NULL, 'Université Virtuelle de Côte d\'Ivoire', 'static/logoPartenaire/Capture_décran_2025-09-04_133325.png', '2025-09-17 15:23:30.516858', '2025-09-17 15:23:30.516891'),
(9, 'CSRS', 'Côte d’Ivoire', 'CSRS', 'Université Nangui Abrogoua, abobo-adjamé, Cote d\'ivoire', NULL, 'siakat212@gmail.com', '0574267601', 'CSRS', '2025-09-17', NULL, 'CSRS', 'static/logoPartenaire/Capture_décran_2025-09-04_155212_hQFfR2I.png', '2025-09-17 15:23:57.134578', '2025-09-17 15:23:57.134679');

-- --------------------------------------------------------

--
-- Structure de la table `backend_poste`
--

DROP TABLE IF EXISTS `backend_poste`;
CREATE TABLE IF NOT EXISTS `backend_poste` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `abreviation_poste` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `grade` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_poste`
--

INSERT INTO `backend_poste` (`id`, `nom`, `abreviation_poste`, `grade`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'Directeur du Laboratoire', 'D', NULL, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:43.987375'),
(2, 'Maître de Recherche', 'Mr', NULL, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:43.987375'),
(3, 'Chargé de Recherche', 'Cr', NULL, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:43.987375'),
(4, 'Professeur', 'Pr', NULL, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:43.987375'),
(5, 'Maître de Conférences', 'Mcf', NULL, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:43.987375'),
(6, 'Post-doctorant', 'Post-doc', NULL, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:43.987375'),
(7, 'Doctorant', 'Dct', NULL, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:43.987375'),
(8, 'Ingénieur de Recherche', 'Ir', NULL, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:43.987375'),
(9, 'Ingénieur d’Étude', 'Ie', NULL, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:43.987375'),
(10, 'Assistant de Recherche', 'Ar', NULL, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:43.987375'),
(11, 'Technicien de Laboratoire', 'Tech. Lab', NULL, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:43.987375'),
(12, 'Docteur', 'Dr', NULL, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:43.987375');

-- --------------------------------------------------------

--
-- Structure de la table `backend_recherche`
--

DROP TABLE IF EXISTS `backend_recherche`;
CREATE TABLE IF NOT EXISTS `backend_recherche` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin_prevue` date DEFAULT NULL,
  `date_fin_reelle` date DEFAULT NULL,
  `budget_total` decimal(12,2) DEFAULT NULL,
  `statu` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_recherche`
--

INSERT INTO `backend_recherche` (`id`, `titre`, `description`, `date_debut`, `date_fin_prevue`, `date_fin_reelle`, `budget_total`, `statu`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'Thérapie Génique Avancée', 'Développement de nouvelles approches de thérapie génique pour traiter les maladies rares en utilisant des vecteurs viraux innovants.', '2023-01-01', '2026-01-01', NULL, 2000000.00, 'Terminer', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:44.903825'),
(2, 'Ordinateurs Quantiques', 'Recherche fondamentale sur les algorithmes quantiques et développement de nouveaux protocoles de correction d\'erreurs.', '2022-01-01', '2025-01-01', '2026-01-01', NULL, 'En cours', '2025-09-13 00:00:00.000000', '2025-09-22 10:55:30.135912'),
(3, 'IA pour le Diagnostic Médical', 'Développement d\'un système d\'intelligence artificielle pour le diagnostic précoce de pathologies cardiovasculaires.', '2021-01-01', '2023-01-01', '2023-01-01', 600000.00, 'Terminer', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:44.903825'),
(4, 'Cellules Solaires Pérovskite', 'Amélioration de l\'efficacité et de la stabilité des cellules solaires à base de pérovskite pour applications commerciales. Amélioration de l\'efficacité et de la stabilité des cellules solaires à base de pérovskite pour applications commerciales. Amélioration de l\'efficacité et de la stabilité des cellules solaires à base de pérovskite pour applications commerciales. Amélioration de l\'efficacité et de la stabilité des cellules solaires à base de pérovskite pour applications commerciales. Amélioration de l\'efficacité et de la stabilité des cellules solaires à base de pérovskite pour applications commerciales.', '2024-01-01', '2027-01-01', '2027-01-01', 950000.00, 'En cours', '2025-09-13 00:00:00.000000', '2025-09-22 10:54:09.365078');

-- --------------------------------------------------------

--
-- Structure de la table `backend_recherchechercheur`
--

DROP TABLE IF EXISTS `backend_recherchechercheur`;
CREATE TABLE IF NOT EXISTS `backend_recherchechercheur` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role_equipe` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `id_chercheur_id` bigint NOT NULL,
  `id_recherche_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_recherchechercheur_id_chercheur_id_2e38df1b` (`id_chercheur_id`),
  KEY `backend_recherchechercheur_id_recherche_id_2f66dc07` (`id_recherche_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_recherchechercheur`
--

INSERT INTO `backend_recherchechercheur` (`id`, `role_equipe`, `id_chercheur_id`, `id_recherche_id`, `creer_le`, `mise_a_jour_le`) VALUES
(6, 'chef_projet', 3, 4, '2025-09-22 10:54:09.753287', '2025-09-22 10:54:09.753331'),
(2, 'chercheur_principal', 1, 1, '2025-09-18 08:20:43.809382', '2025-09-18 08:20:43.809408'),
(3, 'chef_projet', 2, 1, '2025-09-18 08:20:49.717092', '2025-09-18 08:20:49.717135'),
(7, 'chef_projet', 2, 2, '2025-09-22 10:55:30.188631', '2025-09-22 10:55:30.188658'),
(5, 'chef_projet', 1, 3, '2025-09-18 08:21:09.008761', '2025-09-18 08:21:09.008807');

-- --------------------------------------------------------

--
-- Structure de la table `backend_recherchechronologie`
--

DROP TABLE IF EXISTS `backend_recherchechronologie`;
CREATE TABLE IF NOT EXISTS `backend_recherchechronologie` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `etat` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `id_recherche_id` bigint NOT NULL,
  `id_recherche_phase_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_recherchechronologie_id_recherche_id_fa971d3a` (`id_recherche_id`),
  KEY `backend_recherchechronologie_id_recherche_phase_id_b67a4987` (`id_recherche_phase_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `backend_recherchelaboratoire`
--

DROP TABLE IF EXISTS `backend_recherchelaboratoire`;
CREATE TABLE IF NOT EXISTS `backend_recherchelaboratoire` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_recherche_id` bigint NOT NULL,
  `id_laboratoire_domaine_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_recherchelaboratoire_id_recherche_id_857e8907` (`id_recherche_id`),
  KEY `backend_recherchelaboratoire_id_laboratoire_domaine_id_30409520` (`id_laboratoire_domaine_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_recherchelaboratoire`
--

INSERT INTO `backend_recherchelaboratoire` (`id`, `id_recherche_id`, `id_laboratoire_domaine_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 4, 1, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:47.098616'),
(2, 1, 1, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:47.098616'),
(3, 2, 1, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:47.098616'),
(4, 3, 1, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:47.098616'),
(5, 4, 2, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:47.098616'),
(6, 3, 3, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:47.098616'),
(7, 1, 3, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:47.098616'),
(8, 2, 4, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:47.098616'),
(9, 4, 4, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:47.098616'),
(10, 4, 3, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:47.098616');

-- --------------------------------------------------------

--
-- Structure de la table `backend_rechercheobjectif`
--

DROP TABLE IF EXISTS `backend_rechercheobjectif`;
CREATE TABLE IF NOT EXISTS `backend_rechercheobjectif` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `objectif` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `id_recherche_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_rechercheobjectif_id_recherche_id_8f66baae` (`id_recherche_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_rechercheobjectif`
--

INSERT INTO `backend_rechercheobjectif` (`id`, `objectif`, `id_recherche_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'Développer des vecteurs viraux plus efficaces', 4, '2025-09-15 23:55:52.640863', '2025-09-15 23:55:52.640892'),
(2, 'Optimiser les protocoles de livraison génique', 4, '2025-09-15 23:56:03.606094', '2025-09-15 23:56:03.606118'),
(3, 'Mener des essais précliniques sur modèles animaux', 4, '2025-09-15 23:56:16.714130', '2025-09-15 23:56:16.714156'),
(4, 'Préparer les dossiers pour les essais cliniques humains', 4, '2025-09-15 23:56:30.827567', '2025-09-15 23:56:30.827595'),
(5, 'Développer des vecteurs viraux plus efficaces', 2, '2025-09-22 10:55:30.186756', '2025-09-22 10:55:30.186782');

-- --------------------------------------------------------

--
-- Structure de la table `backend_recherchepartenaire`
--

DROP TABLE IF EXISTS `backend_recherchepartenaire`;
CREATE TABLE IF NOT EXISTS `backend_recherchepartenaire` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type_collaboration` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `contribution_partenaire` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contribution_laboratoire` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `montant_financement` bigint NOT NULL,
  `monnaie` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `id_partenaire_id` bigint NOT NULL,
  `id_recherche_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_recherchepartenaire_id_partenaire_id_7993a495` (`id_partenaire_id`),
  KEY `backend_recherchepartenaire_id_recherche_id_99849db7` (`id_recherche_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_recherchepartenaire`
--

INSERT INTO `backend_recherchepartenaire` (`id`, `type_collaboration`, `contribution_partenaire`, `contribution_laboratoire`, `date_debut`, `date_fin`, `montant_financement`, `monnaie`, `id_partenaire_id`, `id_recherche_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'Financement', '2000', '2000', '2025-09-15', '2025-09-15', 2000, 'FCFA', 1, 4, '2025-09-15 12:09:03.911913', '2025-09-15 12:09:03.911935');

-- --------------------------------------------------------

--
-- Structure de la table `backend_recherchephase`
--

DROP TABLE IF EXISTS `backend_recherchephase`;
CREATE TABLE IF NOT EXISTS `backend_recherchephase` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `phase` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_recherchephase`
--

INSERT INTO `backend_recherchephase` (`id`, `phase`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'Phase 1', '2025-09-16 00:04:45.743268', '2025-09-16 00:04:45.743290'),
(2, 'Phase 2', '2025-09-16 00:04:53.722486', '2025-09-16 00:04:53.722517'),
(3, 'Phase 3', '2025-09-16 00:05:04.742341', '2025-09-16 00:05:04.742362'),
(4, 'Phase 4', '2025-09-16 00:05:13.346508', '2025-09-16 00:05:13.346528');

-- --------------------------------------------------------

--
-- Structure de la table `backend_recherchepublication`
--

DROP TABLE IF EXISTS `backend_recherchepublication`;
CREATE TABLE IF NOT EXISTS `backend_recherchepublication` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `resume` longtext COLLATE utf8mb4_general_ci,
  `fichier` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `doi` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `facteur_impact` decimal(5,2) DEFAULT NULL,
  `date_publication` date DEFAULT NULL,
  `url_publication` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contenu` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `id_recherche_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_recherchepublication_id_recherche_id_e3dc64ce` (`id_recherche_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_recherchepublication`
--

INSERT INTO `backend_recherchepublication` (`id`, `titre`, `resume`, `fichier`, `doi`, `facteur_impact`, `date_publication`, `url_publication`, `contenu`, `id_recherche_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'Nature Quantum Information', 'Cette étude présente une approche révolutionnaire de la correction d\'erreurs quantiques en utilisant des algorithmes d\'apprentissage automatique avancés. Notre méthode démontre une amélioration de 40% par rapport aux schémas de correction d\'erreurs traditionnels, ouvrant la voie à des ordinateurs quantiques plus fiables.', 'static/documentsPublication/Capture_décran_2025-09-04_133325.png', '10.1038/s41534-024-00789-1', 12.40, '2025-09-09', NULL, 'Introduction\r\nLa correction d\'erreurs quantiques représente l\'un des défis majeurs pour le développement d\'ordinateurs quantiques pratiques. Les états quantiques sont extrêmement fragiles et sujets à la décohérence, nécessitant des méthodes sophistiquées pour préserver l\'information quantique.\r\n\r\nMéthodologie\r\nNotre approche combine les réseaux de neurones convolutionnels avec des algorithmes de détection d\'erreurs quantiques en temps réel. L\'architecture développée peut identifier et corriger les erreurs avec une précision de 99.7%.\r\n\r\nRésultats\r\nLes tests effectués sur un processeur quantique à 20 qubits montrent une réduction significative du taux d\'erreur logique, passant de 10⁻³ à 6×10⁻⁴. Cette amélioration permet d\'envisager des calculs quantiques de plus longue durée.\r\n\r\nConclusion\r\nCette recherche ouvre de nouvelles perspectives pour l\'informatique quantique pratique et pourrait accélérer le développement d\'applications quantiques commerciales dans les 5 prochaines années.', 4, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:50.097398'),
(2, 'CRISPR-Cas9 Mediated Gene Therapy for Rare Genetic Disorders', 'Les maladies génétiques rares touchent plus de 300 millions de personnes dans le monde, avec très peu d\'options thérapeutiques disponibles. Cette étude présente des avancées majeures dans l\'utilisation de la thérapie génique pour traiter ces pathologies.', 'static/documentsPublication/Capture_décran_2025-09-04_133325_5jeo7bk.png', '10.1016/j.cgt.2024.05.012', 2.07, '2024-09-09', NULL, 'Contexte\r\nLes maladies génétiques rares touchent plus de 300 millions de personnes dans le monde, avec très peu d\'options thérapeutiques disponibles. Cette étude présente des avancées majeures dans l\'utilisation de la thérapie génique pour traiter ces pathologies.\r\n\r\nDéveloppements techniques\r\nNous avons développé de nouveaux vecteurs viraux adéno-associés (AAV) optimisés pour cibler spécifiquement les cellules affectées. Ces vecteurs présentent une efficacité de transduction 300% supérieure aux vecteurs classiques.\r\n\r\nEssais cliniques\r\nLes essais de phase I/II menés sur 45 patients atteints de trois maladies génétiques différentes montrent des résultats encourageants : 78% des patients présentent une amélioration clinique significative après 6 mois de traitement.\r\n\r\nSécurité\r\nAucun effet secondaire grave n\'a été observé, démontrant la sécurité de notre approche thérapeutique. Les analyses immunologiques confirment une tolérance excellente des vecteurs modifiés.', 1, '2025-09-13 00:00:00.000000', '2025-09-13 21:46:50.097398');

-- --------------------------------------------------------

--
-- Structure de la table `backend_recherchepublicationcitation`
--

DROP TABLE IF EXISTS `backend_recherchepublicationcitation`;
CREATE TABLE IF NOT EXISTS `backend_recherchepublicationcitation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `citation` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `id_recherche_publication_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_recherchepublicatio_id_recherche_publication_id_d70919f3` (`id_recherche_publication_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_recherchepublicationcitation`
--

INSERT INTO `backend_recherchepublicationcitation` (`id`, `citation`, `id_recherche_publication_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'jksjdksjd', 1, '2025-09-16 22:22:57.018872', '2025-09-16 22:22:57.018903'),
(2, 'jhdj', 2, '2025-09-16 22:23:13.028531', '2025-09-16 22:23:13.028564');

-- --------------------------------------------------------

--
-- Structure de la table `backend_recherchepublicationmotcle`
--

DROP TABLE IF EXISTS `backend_recherchepublicationmotcle`;
CREATE TABLE IF NOT EXISTS `backend_recherchepublicationmotcle` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `mot_cle` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `id_recherche_publication_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_recherchepublicatio_id_recherche_publication_id_8f251cff` (`id_recherche_publication_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_recherchepublicationmotcle`
--

INSERT INTO `backend_recherchepublicationmotcle` (`id`, `mot_cle`, `id_recherche_publication_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'bcx', 1, '2025-09-16 22:23:40.044477', '2025-09-16 22:23:40.044502');

-- --------------------------------------------------------

--
-- Structure de la table `backend_rechercherealisation`
--

DROP TABLE IF EXISTS `backend_rechercherealisation`;
CREATE TABLE IF NOT EXISTS `backend_rechercherealisation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `date_realisation` date NOT NULL,
  `impact` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `lien_externe` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `id_recherche_id` bigint NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `backend_rechercherealisation_id_recherche_id_4fac377b` (`id_recherche_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_rechercherealisation`
--

INSERT INTO `backend_rechercherealisation` (`id`, `titre`, `description`, `date_realisation`, `impact`, `lien_externe`, `id_recherche_id`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'Développement de 3 nouveaux vecteurs AAV optimisés', 'Développement de 3 nouveaux vecteurs AAV optimisés Développement de 3 nouveaux vecteurs AAV optimisés Développement de 3 nouveaux vecteurs AAV optimisés Développement de 3 nouveaux vecteurs AAV optimisés Développement de 3 nouveaux vecteurs AAV optimisés', '2025-09-16', 'positif', 'http://google.com', 4, '2025-09-16 00:02:48.837767', '2025-09-16 00:03:11.477752');

-- --------------------------------------------------------

--
-- Structure de la table `backend_type`
--

DROP TABLE IF EXISTS `backend_type`;
CREATE TABLE IF NOT EXISTS `backend_type` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_type`
--

INSERT INTO `backend_type` (`id`, `type`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'Prix', '2025-09-14 00:02:16.711825', '2025-09-14 00:02:16.711849'),
(2, 'Partenariat', '2025-09-14 00:02:30.555147', '2025-09-14 00:02:30.555170'),
(3, 'À la une', '2025-09-14 00:02:48.820901', '2025-09-14 00:02:48.820924'),
(4, 'Important', '2025-09-14 00:03:01.720087', '2025-09-14 00:03:01.720108'),
(5, 'Publication', '2025-09-14 00:03:11.744816', '2025-09-14 00:03:11.744841'),
(6, 'Événement', '2025-09-14 00:03:21.093605', '2025-09-14 00:03:21.093797'),
(7, 'Infrastructure', '2025-09-14 00:03:30.368446', '2025-09-14 00:03:30.368481'),
(8, 'Équipe', '2025-09-14 00:03:42.664239', '2025-09-14 00:03:42.664263');

-- --------------------------------------------------------

--
-- Structure de la table `backend_typelaboratoire`
--

DROP TABLE IF EXISTS `backend_typelaboratoire`;
CREATE TABLE IF NOT EXISTS `backend_typelaboratoire` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type_labo` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `creer_le` datetime(6) NOT NULL,
  `mise_a_jour_le` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_typelaboratoire`
--

INSERT INTO `backend_typelaboratoire` (`id`, `type_labo`, `creer_le`, `mise_a_jour_le`) VALUES
(1, 'Physique', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:53.510950'),
(2, 'Chimie', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:53.510950'),
(3, 'Biologie', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:53.510950'),
(4, 'Pharmacie', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:53.510950'),
(5, 'Médical/Clinique', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:53.510950'),
(6, 'Géosciences', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:53.510950'),
(7, 'Informatique', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:53.510950'),
(8, 'Ingénierie', '2025-09-13 00:00:00.000000', '2025-09-13 21:46:53.510950');

-- --------------------------------------------------------

--
-- Structure de la table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8mb4_general_ci,
  `object_repr` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `action_flag` smallint UNSIGNED NOT NULL,
  `change_message` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6` (`user_id`)
) ;

--
-- Déchargement des données de la table `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2025-09-08 21:11:07.838086', '1', 'Physique', 1, '[{\"added\": {}}]', 16, 1),
(2, '2025-09-08 21:11:16.554898', '2', 'Chimie', 1, '[{\"added\": {}}]', 16, 1),
(3, '2025-09-08 21:11:24.939049', '3', 'Biologie', 1, '[{\"added\": {}}]', 16, 1),
(4, '2025-09-08 21:11:32.490532', '4', 'Pharmacie', 1, '[{\"added\": {}}]', 16, 1),
(5, '2025-09-08 21:11:45.420715', '5', 'Médical/Clinique', 1, '[{\"added\": {}}]', 16, 1),
(6, '2025-09-08 21:11:53.513289', '6', 'Géosciences', 1, '[{\"added\": {}}]', 16, 1),
(7, '2025-09-08 21:12:01.395055', '7', 'Informatique', 1, '[{\"added\": {}}]', 16, 1),
(8, '2025-09-08 21:12:11.507276', '8', 'Ingénierie', 1, '[{\"added\": {}}]', 16, 1),
(9, '2025-09-08 21:13:37.041708', '1', 'labo info', 1, '[{\"added\": {}}]', 9, 1),
(10, '2025-09-08 21:15:14.906763', '1', 'labo info', 2, '[{\"changed\": {\"fields\": [\"Logo\"]}}]', 9, 1),
(11, '2025-09-08 21:16:02.217102', '1', 'labo info', 1, '[{\"added\": {}}]', 27, 1),
(12, '2025-09-08 22:15:36.374379', '1', 'Master Biologie Moléculaire et Cellulaire', 1, '[{\"added\": {}}]', 23, 1),
(13, '2025-09-08 22:16:41.502255', '1', 'Master Biologie Moléculaire et Cellulaire', 2, '[{\"changed\": {\"fields\": [\"Statu\"]}}]', 23, 1),
(14, '2025-09-08 22:17:03.133960', '1', 'Master Biologie Moléculaire et Cellulaire', 2, '[{\"changed\": {\"fields\": [\"Statu\"]}}]', 23, 1),
(15, '2025-09-09 00:49:41.525256', '1', 'Una', 1, '[{\"added\": {}}]', 11, 1),
(16, '2025-09-09 00:49:57.226436', '1', 'labo info - Una', 1, '[{\"added\": {}}]', 29, 1),
(17, '2025-09-09 01:10:29.949099', '1', 'Physique Quantique', 1, '[{\"added\": {}}]', 8, 1),
(18, '2025-09-09 01:11:18.329496', '2', 'Biotechnologies', 1, '[{\"added\": {}}]', 8, 1),
(19, '2025-09-09 01:12:30.602850', '3', 'Intelligence Artificielle', 1, '[{\"added\": {}}]', 8, 1),
(20, '2025-09-09 01:13:25.727629', '4', 'Énergies Renouvelables', 1, '[{\"added\": {}}]', 8, 1),
(21, '2025-09-09 01:27:51.579887', '1', 'labo info', 1, '[{\"added\": {}}]', 21, 1),
(22, '2025-09-09 01:27:56.643741', '2', 'labo info', 1, '[{\"added\": {}}]', 21, 1),
(23, '2025-09-09 01:27:59.819113', '3', 'labo info', 1, '[{\"added\": {}}]', 21, 1),
(24, '2025-09-09 01:28:04.218878', '4', 'labo info', 1, '[{\"added\": {}}]', 21, 1),
(25, '2025-09-09 01:31:11.674104', '1', 'about', 1, '[{\"added\": {}}]', 10, 1),
(26, '2025-09-09 01:31:37.684066', '2', 'acceuil', 1, '[{\"added\": {}}]', 10, 1),
(27, '2025-09-09 01:31:45.466461', '3', 'team', 1, '[{\"added\": {}}]', 10, 1),
(28, '2025-09-09 01:31:55.053752', '4', 'research', 1, '[{\"added\": {}}]', 10, 1),
(29, '2025-09-09 01:32:06.705317', '5', 'publications', 1, '[{\"added\": {}}]', 10, 1),
(30, '2025-09-09 01:32:14.861243', '6', 'new', 1, '[{\"added\": {}}]', 10, 1),
(31, '2025-09-09 01:32:26.681589', '7', 'level', 1, '[{\"added\": {}}]', 10, 1),
(32, '2025-09-09 01:32:37.643289', '8', 'contact', 1, '[{\"added\": {}}]', 10, 1),
(33, '2025-09-09 01:33:28.313898', '1', 'about - À Propos de Notre Laboratoire', 1, '[{\"added\": {}}]', 28, 1),
(34, '2025-09-09 16:59:47.780324', '2', 'acceuil - Innovation & Découverte', 1, '[{\"added\": {}}]', 28, 1),
(35, '2025-09-09 17:16:29.886558', '1', 'Thérapie Génique Avancée', 1, '[{\"added\": {}}]', 31, 1),
(36, '2025-09-09 17:17:26.165892', '2', 'Ordinateurs Quantiques', 1, '[{\"added\": {}}]', 31, 1),
(37, '2025-09-09 17:18:14.429862', '1', 'Thérapie Génique Avancée', 2, '[{\"changed\": {\"fields\": [\"Statu\"]}}]', 31, 1),
(38, '2025-09-09 17:18:19.778032', '2', 'Ordinateurs Quantiques', 2, '[{\"changed\": {\"fields\": [\"Statu\"]}}]', 31, 1),
(39, '2025-09-09 17:19:18.992140', '3', 'IA pour le Diagnostic Médical', 1, '[{\"added\": {}}]', 31, 1),
(40, '2025-09-09 17:20:07.295828', '4', 'Cellules Solaires Pérovskite', 1, '[{\"added\": {}}]', 31, 1),
(41, '2025-09-09 17:21:03.520931', '1', 'labo info - Cellules Solaires Pérovskite - Biotechnologies', 1, '[{\"added\": {}}]', 33, 1),
(42, '2025-09-09 17:21:17.880726', '2', 'labo info - Cellules Solaires Pérovskite - Physique Quantique', 1, '[{\"added\": {}}]', 33, 1),
(43, '2025-09-09 17:21:26.259395', '3', 'labo info - Cellules Solaires Pérovskite - Intelligence Artificielle', 1, '[{\"added\": {}}]', 33, 1),
(44, '2025-09-09 17:21:32.806305', '4', 'labo info - Thérapie Génique Avancée - Biotechnologies', 1, '[{\"added\": {}}]', 33, 1),
(45, '2025-09-09 17:21:38.429236', '5', 'labo info - Thérapie Génique Avancée - Énergies Renouvelables', 1, '[{\"added\": {}}]', 33, 1),
(46, '2025-09-09 17:21:42.791139', '6', 'labo info - Thérapie Génique Avancée - Intelligence Artificielle', 1, '[{\"added\": {}}]', 33, 1),
(47, '2025-09-09 17:21:48.062532', '7', 'labo info - Thérapie Génique Avancée - Physique Quantique', 1, '[{\"added\": {}}]', 33, 1),
(48, '2025-09-09 17:21:52.934652', '8', 'labo info - Ordinateurs Quantiques - Biotechnologies', 1, '[{\"added\": {}}]', 33, 1),
(49, '2025-09-09 17:21:57.844474', '9', 'labo info - IA pour le Diagnostic Médical - Physique Quantique', 1, '[{\"added\": {}}]', 33, 1),
(50, '2025-09-09 17:22:02.083850', '10', 'labo info - IA pour le Diagnostic Médical - Énergies Renouvelables', 1, '[{\"added\": {}}]', 33, 1),
(51, '2025-09-09 17:30:35.476416', '1', 'labo info - Cellules Solaires Pérovskite - Biotechnologies', 1, '[{\"added\": {}}]', 33, 1),
(52, '2025-09-09 17:30:39.419187', '2', 'labo info - Thérapie Génique Avancée - Biotechnologies', 1, '[{\"added\": {}}]', 33, 1),
(53, '2025-09-09 17:30:43.327724', '3', 'labo info - Ordinateurs Quantiques - Biotechnologies', 1, '[{\"added\": {}}]', 33, 1),
(54, '2025-09-09 17:30:49.981103', '4', 'labo info - IA pour le Diagnostic Médical - Biotechnologies', 1, '[{\"added\": {}}]', 33, 1),
(55, '2025-09-09 17:30:54.535297', '5', 'labo info - Cellules Solaires Pérovskite - Énergies Renouvelables', 1, '[{\"added\": {}}]', 33, 1),
(56, '2025-09-09 17:30:58.215720', '6', 'labo info - IA pour le Diagnostic Médical - Intelligence Artificielle', 1, '[{\"added\": {}}]', 33, 1),
(57, '2025-09-09 17:31:02.058857', '7', 'labo info - Thérapie Génique Avancée - Intelligence Artificielle', 1, '[{\"added\": {}}]', 33, 1),
(58, '2025-09-09 17:31:05.703982', '8', 'labo info - Ordinateurs Quantiques - Physique Quantique', 1, '[{\"added\": {}}]', 33, 1),
(59, '2025-09-09 17:31:08.830694', '9', 'labo info - Cellules Solaires Pérovskite - Physique Quantique', 1, '[{\"added\": {}}]', 33, 1),
(60, '2025-09-09 17:31:13.408271', '10', 'labo info - Cellules Solaires Pérovskite - Intelligence Artificielle', 1, '[{\"added\": {}}]', 33, 1),
(61, '2025-09-09 17:39:42.524051', '1', 'Nature Quantum Information', 1, '[{\"added\": {}}]', 37, 1),
(62, '2025-09-09 17:42:00.385408', '2', 'CRISPR-Cas9 Mediated Gene Therapy for Rare Genetic Disorders', 1, '[{\"added\": {}}]', 37, 1),
(63, '2025-09-09 18:15:58.128926', '1', 'Marie Dubois', 1, '[{\"added\": {}}]', 7, 1),
(64, '2025-09-09 18:16:08.455483', '1', 'Dubois Marie - labo info', 1, '[{\"added\": {}}]', 20, 1),
(65, '2025-09-09 18:16:39.136999', '2', 'Testt', 1, '[{\"added\": {}}]', 9, 1),
(66, '2025-09-09 18:17:09.765694', '2', 'test test', 1, '[{\"added\": {}}]', 7, 1),
(67, '2025-09-09 18:17:13.976766', '2', 'test test - Testt', 1, '[{\"added\": {}}]', 20, 1),
(68, '2025-09-09 18:17:49.778365', '3', 'test test - labo info', 1, '[{\"added\": {}}]', 20, 1),
(69, '2025-09-09 18:35:20.277406', '1', 'Thérapie Génique Avancée', 2, '[{\"changed\": {\"fields\": [\"Statu\"]}}]', 31, 1),
(70, '2025-09-09 18:35:31.785861', '1', 'Thérapie Génique Avancée', 2, '[{\"changed\": {\"fields\": [\"Statu\"]}}]', 31, 1),
(71, '2025-09-10 14:38:36.259000', '1', 'Directeur de Recherche', 1, '[{\"added\": {}}]', 12, 1),
(72, '2025-09-10 14:38:47.744264', '2', 'Maître de Recherche', 1, '[{\"added\": {}}]', 12, 1),
(73, '2025-09-10 14:39:02.892725', '3', 'Chargé de Recherche', 1, '[{\"added\": {}}]', 12, 1),
(74, '2025-09-10 14:39:12.892742', '4', 'Professeur', 1, '[{\"added\": {}}]', 12, 1),
(75, '2025-09-10 14:39:25.345510', '5', 'Maître de Conférences', 1, '[{\"added\": {}}]', 12, 1),
(76, '2025-09-10 14:39:45.065036', '6', 'Post-doctorant', 1, '[{\"added\": {}}]', 12, 1),
(77, '2025-09-10 14:40:46.629341', '7', 'Doctorant', 1, '[{\"added\": {}}]', 12, 1),
(78, '2025-09-10 14:41:00.643401', '8', 'Ingénieur de Recherche', 1, '[{\"added\": {}}]', 12, 1),
(79, '2025-09-10 14:41:12.960575', '9', 'Ingénieur d’Étude', 1, '[{\"added\": {}}]', 12, 1),
(80, '2025-09-10 14:41:24.343994', '10', 'Assistant de Recherche', 1, '[{\"added\": {}}]', 12, 1),
(81, '2025-09-10 14:41:40.086708', '11', 'Technicien de Laboratoire', 1, '[{\"added\": {}}]', 12, 1),
(82, '2025-09-10 14:42:30.847904', '12', 'Docteur', 1, '[{\"added\": {}}]', 12, 1),
(83, '2025-09-10 14:42:41.009741', '1', 'Directeur de Recherche', 2, '[{\"changed\": {\"fields\": [\"Abreviation poste\"]}}]', 12, 1),
(84, '2025-09-10 15:27:51.791811', '2', 'labo info - Notre Histoire', 1, '[{\"added\": {}}]', 27, 1),
(85, '2025-09-10 15:28:08.330848', '3', 'labo info - Notre Vision', 1, '[{\"added\": {}}]', 27, 1),
(86, '2025-09-10 15:28:30.961473', '4', 'labo info - Nos Valeurs', 1, '[{\"added\": {}}]', 27, 1),
(87, '2025-09-10 15:29:40.732947', '1', 'labo info', 1, '[{\"added\": {}}]', 43, 1),
(88, '2025-09-10 15:29:50.244364', '1', 'labo info - ', 3, '', 27, 1),
(89, '2025-09-10 15:31:47.700194', '1', 'labo info', 1, '[{\"added\": {}}]', 44, 1),
(90, '2025-09-10 15:51:09.827766', '1', 'Testt - Una', 2, '[{\"changed\": {\"fields\": [\"Id laboratoire\", \"Type partenaire\"]}}]', 29, 1),
(91, '2025-09-10 15:51:17.951913', '1', 'labo info - Una', 2, '[{\"changed\": {\"fields\": [\"Id laboratoire\"]}}]', 29, 1),
(92, '2025-09-10 16:06:55.386478', '7', 'Doctorant', 2, '[{\"changed\": {\"fields\": [\"Abreviation poste\"]}}]', 12, 1),
(93, '2025-09-10 16:07:38.878999', '1', 'Directrice du Laboratoire', 2, '[{\"changed\": {\"fields\": [\"Nom\"]}}]', 12, 1),
(94, '2025-09-10 16:08:24.407777', '1', 'Directeur du Laboratoire', 2, '[{\"changed\": {\"fields\": [\"Nom\"]}}]', 12, 1),
(95, '2025-09-10 16:08:27.733202', '1', 'Dubois Marie - Directeur du Laboratoire', 1, '[{\"added\": {}}]', 30, 1),
(96, '2025-09-10 17:08:45.786666', '2', 'Dubois Marie - Twitter', 1, '[{\"added\": {}}]', 41, 1),
(97, '2025-09-10 17:12:14.693124', '2', 'Dubois Marie - Twitter', 2, '[{\"changed\": {\"fields\": [\"Contact\"]}}]', 41, 1),
(98, '2025-09-10 17:12:24.431526', '1', 'Dubois Marie - Téléphone', 2, '[{\"changed\": {\"fields\": [\"Contact\"]}}]', 41, 1),
(99, '2025-09-10 17:12:45.780074', '3', 'Dubois Marie - Email', 1, '[{\"added\": {}}]', 41, 1),
(100, '2025-09-10 17:16:48.080756', '1', 'Marie Dubois', 2, '[{\"changed\": {\"fields\": [\"Bureau\"]}}]', 7, 1),
(101, '2025-09-10 17:47:37.279781', '2', 'Ordinateurs Quantiques', 2, '[{\"changed\": {\"fields\": [\"Statu\"]}}]', 31, 1),
(102, '2025-09-10 17:47:43.892530', '1', 'Thérapie Génique Avancée', 2, '[{\"changed\": {\"fields\": [\"Statu\"]}}]', 31, 1),
(103, '2025-09-10 17:50:10.269110', '2', 'Ordinateurs Quantiques', 2, '[{\"changed\": {\"fields\": [\"Statu\"]}}]', 31, 1),
(104, '2025-09-10 17:57:15.837247', '4', 'Dubois Marie - labo info', 3, '', 20, 1),
(105, '2025-09-10 18:04:05.549913', '5', 'Dubois Marie - labo info', 1, '[{\"added\": {}}]', 20, 1),
(106, '2025-09-10 18:07:41.974807', '1', 'Dubois Marie - labo info', 1, '[{\"added\": {}}]', 20, 1),
(107, '2025-09-13 23:54:50.628826', '1', 'Prix d\'Excellence en Recherche 2024', 1, '[{\"added\": {}}]', 22, 1),
(108, '2025-09-13 23:55:58.562370', '2', 'Nouveau Partenariat avec l\'Institut Max Planck', 1, '[{\"added\": {}}]', 22, 1),
(109, '2025-09-13 23:59:28.915867', '3', 'Nouveau', 1, '[{\"added\": {}}]', 22, 1),
(110, '2025-09-13 23:59:58.331039', '3', 'Nouveau', 3, '', 22, 1),
(111, '2025-09-14 00:02:16.713090', '1', 'Prix', 1, '[{\"added\": {}}]', 15, 1),
(112, '2025-09-14 00:02:30.556740', '2', 'Partenariat', 1, '[{\"added\": {}}]', 15, 1),
(113, '2025-09-14 00:02:48.821604', '3', 'À la une', 1, '[{\"added\": {}}]', 15, 1),
(114, '2025-09-14 00:03:01.721784', '4', 'Important', 1, '[{\"added\": {}}]', 15, 1),
(115, '2025-09-14 00:03:11.746440', '5', 'Publication', 1, '[{\"added\": {}}]', 15, 1),
(116, '2025-09-14 00:03:21.095381', '6', 'Événement', 1, '[{\"added\": {}}]', 15, 1),
(117, '2025-09-14 00:03:30.372242', '7', 'Infrastructure', 1, '[{\"added\": {}}]', 15, 1),
(118, '2025-09-14 00:03:42.667568', '8', 'Équipe', 1, '[{\"added\": {}}]', 15, 1),
(119, '2025-09-14 00:04:04.571077', '1', 'labo info - Prix', 1, '[{\"added\": {}}]', 42, 1),
(120, '2025-09-14 00:04:12.573511', '2', 'labo info - Prix', 1, '[{\"added\": {}}]', 42, 1),
(121, '2025-09-14 00:04:27.594347', '3', 'labo info - Important', 1, '[{\"added\": {}}]', 42, 1),
(122, '2025-09-14 00:04:35.462791', '2', 'labo info - À la une', 2, '[{\"changed\": {\"fields\": [\"Id type\"]}}]', 42, 1),
(123, '2025-09-14 00:04:45.306981', '4', 'labo info - Partenariat', 1, '[{\"added\": {}}]', 42, 1),
(124, '2025-09-14 01:07:54.032723', '3', 'new - Actualités du Laboratoire', 1, '[{\"added\": {}}]', 28, 1),
(125, '2025-09-14 01:09:18.682769', '5', 'labo info - Événement', 1, '[{\"added\": {}}]', 42, 1),
(126, '2025-09-14 01:12:37.650989', '1', 'Prix d\'Excellence en Recherche 2024', 2, '[{\"changed\": {\"fields\": [\"Statu\"]}}]', 22, 1),
(127, '2025-09-14 01:12:51.671988', '1', 'Prix d\'Excellence en Recherche 2024', 2, '[{\"changed\": {\"fields\": [\"Statu\"]}}]', 22, 1),
(128, '2025-09-14 13:23:08.925285', '1', 'labo info - static/AlbumActualite/Capture001.png', 1, '[{\"added\": {}}]', 45, 1),
(129, '2025-09-14 13:31:29.672166', '2', 'labo info - static/AlbumActualite/Capture_décran_2025-09-04_133325.png', 1, '[{\"added\": {}}]', 45, 1),
(130, '2025-09-14 13:31:43.094338', '3', 'labo info - static/AlbumActualite/Capture_décran_2025-09-04_155212.png', 1, '[{\"added\": {}}]', 45, 1),
(131, '2025-09-14 15:08:03.047822', '4', 'research - Nos Projets de Recherche', 1, '[{\"added\": {}}]', 28, 1),
(132, '2025-09-14 15:09:01.698226', '2', 'Ordinateurs Quantiques', 2, '[{\"changed\": {\"fields\": [\"Statu\"]}}]', 31, 1),
(133, '2025-09-14 15:09:16.766533', '2', 'Ordinateurs Quantiques', 2, '[{\"changed\": {\"fields\": [\"Statu\"]}}]', 31, 1),
(134, '2025-09-15 00:53:43.530413', '1', 'Cellules Solaires Pérovskite - Dubois Marie', 1, '[{\"added\": {}}]', 32, 1),
(135, '2025-09-15 12:09:04.311823', '1', 'Cellules Solaires Pérovskite - Una', 1, '[{\"added\": {}}]', 35, 1),
(136, '2025-09-15 23:55:52.642212', '1', 'Cellules Solaires Pérovskite - Développer des vecteurs viraux plus efficaces', 1, '[{\"added\": {}}]', 34, 1),
(137, '2025-09-15 23:56:03.607788', '2', 'Cellules Solaires Pérovskite - Optimiser les protocoles de livraison génique', 1, '[{\"added\": {}}]', 34, 1),
(138, '2025-09-15 23:56:16.715787', '3', 'Cellules Solaires Pérovskite - Mener des essais précliniques sur modèles animaux', 1, '[{\"added\": {}}]', 34, 1),
(139, '2025-09-15 23:56:30.829368', '4', 'Cellules Solaires Pérovskite - Préparer les dossiers pour les essais cliniques humains', 1, '[{\"added\": {}}]', 34, 1),
(140, '2025-09-16 00:02:48.839330', '1', 'Développement de 3 nouveaux vecteurs AAV optimisés', 1, '[{\"added\": {}}]', 40, 1),
(141, '2025-09-16 00:03:12.052858', '1', 'Développement de 3 nouveaux vecteurs AAV optimisés', 2, '[{\"changed\": {\"fields\": [\"Id recherche\"]}}]', 40, 1),
(142, '2025-09-16 00:04:45.877935', '1', 'Phase 1', 1, '[{\"added\": {}}]', 13, 1),
(143, '2025-09-16 00:04:53.727141', '2', 'Phase 2', 1, '[{\"added\": {}}]', 13, 1),
(144, '2025-09-16 00:05:04.744043', '3', 'Phase 3', 1, '[{\"added\": {}}]', 13, 1),
(145, '2025-09-16 00:05:13.349240', '4', 'Phase 4', 1, '[{\"added\": {}}]', 13, 1),
(146, '2025-09-16 21:33:36.800280', '1', 'Dubois Marie - Université de nangui abrogua', 1, '[{\"added\": {}}]', 17, 1),
(147, '2025-09-16 21:34:06.810692', '2', 'Dubois Marie - Université de Lyon', 1, '[{\"added\": {}}]', 17, 1),
(148, '2025-09-16 21:34:36.613464', '3', 'Dubois Marie - Université de Toulouse', 1, '[{\"added\": {}}]', 17, 1),
(149, '2025-09-16 21:34:56.235281', '4', 'test test - GFFF', 1, '[{\"added\": {}}]', 17, 1),
(150, '2025-09-16 21:40:21.111224', '2', 'Dubois Marie - Énergies Renouvelables', 1, '[{\"added\": {}}]', 18, 1),
(151, '2025-09-16 21:40:26.077626', '3', 'Dubois Marie - Intelligence Artificielle', 1, '[{\"added\": {}}]', 18, 1),
(152, '2025-09-16 21:40:30.873706', '4', 'Dubois Marie - Physique Quantique', 1, '[{\"added\": {}}]', 18, 1),
(153, '2025-09-16 22:22:57.065155', '1', 'jksjdksjd', 1, '[{\"added\": {}}]', 38, 1),
(154, '2025-09-16 22:23:13.030255', '2', 'jhdj', 1, '[{\"added\": {}}]', 38, 1),
(155, '2025-09-16 22:23:40.045580', '1', 'bcx', 1, '[{\"added\": {}}]', 39, 1),
(156, '2025-09-16 22:42:46.762613', '1', 'Dubois Marie - Vision stratégique du laboratoire pour 2024', 1, '[{\"added\": {}}]', 19, 1),
(157, '2025-09-17 10:13:09.261973', '1', 'Marie Dubois', 2, '[{\"changed\": {\"fields\": [\"Biographie\"]}}]', 7, 1),
(158, '2025-09-17 10:42:43.685302', '6', 'labo info - Événement', 1, '[{\"added\": {}}]', 42, 1),
(159, '2025-09-17 11:34:25.841550', '1', 'labo info - acceuil - about', 1, '[{\"added\": {}}]', 46, 1),
(160, '2025-09-17 11:34:52.033851', '2', 'labo info - acceuil - director', 1, '[{\"added\": {}}]', 46, 1),
(161, '2025-09-17 11:35:19.761888', '3', 'labo info - acceuil - racourci', 1, '[{\"added\": {}}]', 46, 1),
(162, '2025-09-17 11:35:57.339854', '4', 'labo info - acceuil - chifre', 1, '[{\"added\": {}}]', 46, 1),
(163, '2025-09-17 11:36:29.217856', '5', 'labo info - acceuil - new', 1, '[{\"added\": {}}]', 46, 1),
(164, '2025-09-17 12:27:32.066309', '4', 'labo info - acceuil - chiffre', 2, '[{\"changed\": {\"fields\": [\"Block\"]}}]', 46, 1),
(165, '2025-09-17 13:32:44.487187', '1', 'labo info', 2, '[{\"changed\": {\"fields\": [\"Description\"]}}]', 43, 1),
(166, '2025-09-17 15:19:23.800385', '2', 'Université Félix Houphouët-Boigny', 1, '[{\"added\": {}}]', 11, 1),
(167, '2025-09-17 15:20:42.808331', '3', 'INPHB', 1, '[{\"added\": {}}]', 11, 1),
(168, '2025-09-17 15:21:35.544448', '4', 'CNRA', 1, '[{\"added\": {}}]', 11, 1),
(169, '2025-09-17 15:22:08.979756', '5', 'LANADA', 1, '[{\"added\": {}}]', 11, 1),
(170, '2025-09-17 15:22:43.050121', '6', 'Université Nangui Abrogoua', 1, '[{\"added\": {}}]', 11, 1),
(171, '2025-09-17 15:23:08.689504', '7', 'École Normale Supérieure', 1, '[{\"added\": {}}]', 11, 1),
(172, '2025-09-17 15:23:30.518219', '8', 'UVCI', 1, '[{\"added\": {}}]', 11, 1),
(173, '2025-09-17 15:23:57.137280', '9', 'CSRS', 1, '[{\"added\": {}}]', 11, 1),
(174, '2025-09-17 15:27:10.220973', '2', 'labo info - CNRA', 1, '[{\"added\": {}}]', 29, 1),
(175, '2025-09-17 15:27:17.304971', '3', 'labo info - CSRS', 1, '[{\"added\": {}}]', 29, 1),
(176, '2025-09-17 15:27:25.133125', '4', 'labo info - École Normale Supérieure', 1, '[{\"added\": {}}]', 29, 1),
(177, '2025-09-17 15:27:32.261730', '5', 'labo info - INPHB', 1, '[{\"added\": {}}]', 29, 1),
(178, '2025-09-17 15:27:38.456057', '6', 'labo info - LANADA', 1, '[{\"added\": {}}]', 29, 1),
(179, '2025-09-17 15:27:46.645486', '7', 'labo info - Université Félix Houphouët-Boigny', 1, '[{\"added\": {}}]', 29, 1),
(180, '2025-09-17 15:27:53.054585', '8', 'labo info - Université Nangui Abrogoua', 1, '[{\"added\": {}}]', 29, 1),
(181, '2025-09-17 15:28:00.853454', '9', 'labo info - UVCI', 1, '[{\"added\": {}}]', 29, 1),
(182, '2025-09-17 16:31:43.374804', '5', 'Physique Quantique', 1, '[{\"added\": {}}]', 8, 1),
(183, '2025-09-17 16:31:59.722859', '6', 'Biotechnologies', 1, '[{\"added\": {}}]', 8, 1),
(184, '2025-09-17 16:32:23.283856', '7', 'Intelligence Artificielle', 1, '[{\"added\": {}}]', 8, 1),
(185, '2025-09-17 16:32:33.925609', '8', 'Énergies Renouvelables', 1, '[{\"added\": {}}]', 8, 1),
(186, '2025-09-17 16:32:48.924358', '9', 'Recherche Médicale', 1, '[{\"added\": {}}]', 8, 1),
(187, '2025-09-17 16:33:08.986357', '10', 'Technologies Avancées', 1, '[{\"added\": {}}]', 8, 1),
(188, '2025-09-17 16:33:18.761027', '11', 'Sciences Environnementales', 1, '[{\"added\": {}}]', 8, 1),
(189, '2025-09-17 16:33:33.425863', '12', 'Cybersécurité', 1, '[{\"added\": {}}]', 8, 1),
(190, '2025-09-17 16:34:03.136146', '6', 'Biotechnologies', 3, '', 8, 1),
(191, '2025-09-17 16:34:03.136201', '8', 'Énergies Renouvelables', 3, '', 8, 1),
(192, '2025-09-17 16:34:03.136232', '7', 'Intelligence Artificielle', 3, '', 8, 1),
(193, '2025-09-17 16:34:03.136263', '5', 'Physique Quantique', 3, '', 8, 1),
(194, '2025-09-17 16:35:02.995810', '3', 'labo info - Intelligence Artificielle', 2, '[{\"changed\": {\"fields\": [\"Icone\"]}}]', 21, 1),
(195, '2025-09-17 16:36:15.606378', '2', 'labo info - Énergies Renouvelables', 2, '[{\"changed\": {\"fields\": [\"Icone\"]}}]', 21, 1),
(196, '2025-09-17 16:36:29.550235', '1', 'labo info - Biotechnologies', 2, '[{\"changed\": {\"fields\": [\"Icone\"]}}]', 21, 1),
(197, '2025-09-17 16:38:06.159873', '5', 'labo info - Cybersécurité', 1, '[{\"added\": {}}]', 21, 1),
(198, '2025-09-17 16:38:37.247079', '6', 'labo info - Recherche Médicale', 1, '[{\"added\": {}}]', 21, 1),
(199, '2025-09-17 16:38:51.483754', '7', 'labo info - Sciences Environnementales', 1, '[{\"added\": {}}]', 21, 1),
(200, '2025-09-17 16:39:30.862401', '8', 'labo info - Technologies Avancées', 1, '[{\"added\": {}}]', 21, 1),
(201, '2025-09-17 16:48:37.726151', '2', 'labo info - Énergies Renouvelables', 2, '[{\"changed\": {\"fields\": [\"Icone\"]}}]', 21, 1),
(202, '2025-09-17 16:59:24.188245', '6', 'labo info - about - presentation', 1, '[{\"added\": {}}]', 46, 1),
(203, '2025-09-17 17:00:06.600677', '7', 'labo info - about - domaine', 1, '[{\"added\": {}}]', 46, 1),
(204, '2025-09-17 17:00:30.844261', '8', 'labo info - about - partenaire', 1, '[{\"added\": {}}]', 46, 1),
(205, '2025-09-17 22:31:36.115810', '4', 'Cellules Solaires Pérovskite', 2, '[{\"changed\": {\"fields\": [\"Description\"]}}]', 31, 1),
(206, '2025-09-18 01:29:19.620935', '2', 'Dubois Marie - Professeur', 1, '[{\"added\": {}}]', 30, 1),
(207, '2025-09-18 01:39:49.911477', '2', 'Dubois Marie - Nouvelle collaboration avec l\'Institut Pasteur', 1, '[{\"added\": {}}]', 19, 1),
(208, '2025-09-18 01:40:41.440398', '3', 'Dubois Marie - Obtention du financement ERC Advanced Grant', 1, '[{\"added\": {}}]', 19, 1),
(209, '2025-09-18 01:41:37.711737', '4', 'Dubois Marie - Lancement du programme de mentorat jeunes chercheurs', 1, '[{\"added\": {}}]', 19, 1),
(210, '2025-09-18 08:20:43.897336', '2', 'Thérapie Génique Avancée - Dubois Marie', 1, '[{\"added\": {}}]', 32, 1),
(211, '2025-09-18 08:20:49.718826', '3', 'Thérapie Génique Avancée - test test', 1, '[{\"added\": {}}]', 32, 1),
(212, '2025-09-18 08:21:01.982477', '4', 'Ordinateurs Quantiques - Dubois Marie', 1, '[{\"added\": {}}]', 32, 1),
(213, '2025-09-18 08:21:09.011853', '5', 'IA pour le Diagnostic Médical - Dubois Marie', 1, '[{\"added\": {}}]', 32, 1),
(214, '2025-09-18 09:17:32.339110', '4', 'Publication Majeure dans Nature', 1, '[{\"added\": {}}]', 22, 1),
(215, '2025-09-18 10:17:17.757429', '2', 'Nouveau Partenariat avec l\'Institut Max Planck', 2, '[{\"changed\": {\"fields\": [\"Date realisation debut\"]}}]', 22, 1),
(216, '2025-09-18 10:17:24.398062', '1', 'Prix d\'Excellence en Recherche 2024', 2, '[{\"changed\": {\"fields\": [\"Date realisation debut\"]}}]', 22, 1),
(217, '2025-09-18 16:14:47.487332', '3', 'Siaka Traore', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"chercheur diplome\", \"object\": \"Traore Siaka - jsdh\"}}, {\"added\": {\"name\": \"chercheur domaine expertise\", \"object\": \"Traore Siaka - Cybers\\u00e9curit\\u00e9\"}}, {\"added\": {\"name\": \"ChercheurReseau\", \"object\": \"Traore Siaka - Instagram\"}}, {\"added\": {\"name\": \"ChercheurReseau\", \"object\": \"Traore Siaka - YouTube\"}}, {\"added\": {\"name\": \"chercheur poste\", \"object\": \"Traore Siaka - Doctorant\"}}]', 7, 1),
(218, '2025-09-18 16:27:00.280473', '3', 'Siaka Traore', 2, '[{\"deleted\": {\"name\": \"chercheur poste\", \"object\": \"Traore Siaka - Doctorant\"}}]', 7, 1),
(219, '2025-09-18 16:40:23.459605', '3', 'Siaka Traore', 2, '[{\"added\": {\"name\": \"chercheur poste\", \"object\": \"Traore Siaka - Docteur\"}}]', 7, 1),
(220, '2025-09-18 17:15:18.833609', '2', 'Nouveau Partenariat avec l\'Institut Max Planck', 2, '[]', 22, 1),
(221, '2025-09-18 17:16:49.045894', '4', 'Publication Majeure dans Nature', 2, '[{\"added\": {\"name\": \"laboratoire type new\", \"object\": \"labo info - Prix\"}}]', 22, 1),
(222, '2025-09-22 10:54:09.755001', '4', 'Cellules Solaires Pérovskite', 2, '[{\"added\": {\"name\": \"recherche chercheur\", \"object\": \"Cellules Solaires P\\u00e9rovskite - Traore Siaka\"}}, {\"deleted\": {\"name\": \"recherche chercheur\", \"object\": \"Cellules Solaires P\\u00e9rovskite - Dubois Marie\"}}]', 31, 1),
(223, '2025-09-22 10:55:30.190006', '2', 'Ordinateurs Quantiques', 2, '[{\"added\": {\"name\": \"recherche objectif\", \"object\": \"Ordinateurs Quantiques - D\\u00e9velopper des vecteurs viraux plus efficaces\"}}, {\"added\": {\"name\": \"recherche chercheur\", \"object\": \"Ordinateurs Quantiques - test test\"}}, {\"deleted\": {\"name\": \"recherche chercheur\", \"object\": \"Ordinateurs Quantiques - test test\"}}]', 31, 1),
(224, '2025-09-26 03:19:04.147387', '2', 'Dubois Marie - Testt', 1, '[{\"added\": {}}]', 20, 1),
(225, '2025-09-26 03:19:30.920749', '3', 'Traore Siaka - labo info', 1, '[{\"added\": {}}]', 20, 1),
(226, '2025-09-26 03:19:58.194823', '2', 'Dubois Marie - labo info', 2, '[{\"changed\": {\"fields\": [\"Id laboratoire\"]}}]', 20, 1),
(227, '2025-09-26 03:44:10.389705', '2', 'parcour', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"laboratoire parcour deboucher\", \"object\": \"Testt - sdjf\"}}, {\"added\": {\"name\": \"laboratoire parcour condition admission\", \"object\": \"sdlkjf\"}}, {\"added\": {\"name\": \"laboratoire parcour condition admission\", \"object\": \"sdfkl\"}}, {\"added\": {\"name\": \"laboratoire parcour specialisation\", \"object\": \"Testt - jsdfk\"}}, {\"added\": {\"name\": \"laboratoire parcour specialisation\", \"object\": \"Testt - klfsdj\"}}, {\"added\": {\"name\": \"laboratoire parcour specialisation\", \"object\": \"Testt - kljsdf\"}}]', 23, 1),
(228, '2025-09-26 03:44:41.901035', '2', 'parcour', 2, '[{\"changed\": {\"fields\": [\"Id laboratoire\"]}}]', 23, 1),
(229, '2025-09-26 03:46:06.247709', '2', 'parcour', 2, '[{\"changed\": {\"fields\": [\"Duree formation\"]}}]', 23, 1),
(230, '2025-09-26 04:22:01.948957', '1', 'Master Biologie Moléculaire et Cellulaire', 2, '[{\"added\": {\"name\": \"laboratoire parcour deboucher\", \"object\": \"labo info - TTT\"}}, {\"added\": {\"name\": \"laboratoire parcour condition admission\", \"object\": \"UUU\"}}, {\"added\": {\"name\": \"laboratoire parcour condition admission\", \"object\": \"III\"}}, {\"added\": {\"name\": \"laboratoire parcour specialisation\", \"object\": \"labo info - OOO\"}}, {\"added\": {\"name\": \"laboratoire parcour specialisation\", \"object\": \"labo info - OOO\"}}]', 23, 1),
(231, '2025-09-26 06:00:26.738969', '1', 'labo info - Contact principal', 1, '[{\"added\": {}}]', 48, 1);

-- --------------------------------------------------------

--
-- Structure de la table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(2, 'auth', 'permission'),
(3, 'auth', 'group'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session'),
(7, 'backend', 'chercheur'),
(8, 'backend', 'domaine'),
(9, 'backend', 'laboratoire'),
(10, 'backend', 'page'),
(11, 'backend', 'partenaire'),
(12, 'backend', 'poste'),
(13, 'backend', 'recherchephase'),
(14, 'backend', 'reseausocial'),
(15, 'backend', 'type'),
(16, 'backend', 'typelaboratoire'),
(17, 'backend', 'chercheurdiplome'),
(18, 'backend', 'chercheurdomaineexpertise'),
(19, 'backend', 'chercheurmot'),
(20, 'backend', 'chercheurlaboratoire'),
(21, 'backend', 'laboratoiredomaine'),
(22, 'backend', 'laboratoirenew'),
(23, 'backend', 'laboratoireparcour'),
(24, 'backend', 'laboratoireparcourconditionadmission'),
(25, 'backend', 'laboratoireparcourdeboucher'),
(26, 'backend', 'laboratoireparcourspecialisation'),
(27, 'backend', 'laboratoirepresentation'),
(28, 'backend', 'laboratoireslider'),
(29, 'backend', 'laboratoirepartenaire'),
(30, 'backend', 'chercheurposte'),
(31, 'backend', 'recherche'),
(32, 'backend', 'recherchechercheur'),
(33, 'backend', 'recherchelaboratoire'),
(34, 'backend', 'rechercheobjectif'),
(35, 'backend', 'recherchepartenaire'),
(36, 'backend', 'recherchechronologie'),
(37, 'backend', 'recherchepublication'),
(38, 'backend', 'recherchepublicationcitation'),
(39, 'backend', 'recherchepublicationmotcle'),
(40, 'backend', 'rechercherealisation'),
(41, 'backend', 'chercheurreseau'),
(42, 'backend', 'laboratoiretypenew'),
(43, 'backend', 'laboratoiremission'),
(44, 'backend', 'laboratoirepresentationimage'),
(45, 'backend', 'laboratoirenewalbum'),
(46, 'backend', 'laboratoirepageblockentete'),
(47, 'backend', 'horairelaboratoire'),
(48, 'backend', 'contactlaboratoire'),
(49, 'backend', 'messagecontact'),
(50, 'backend', 'candidatureparcours');

-- --------------------------------------------------------

--
-- Structure de la table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-09-08 21:05:43.976243'),
(2, 'auth', '0001_initial', '2025-09-08 21:05:48.763411'),
(3, 'admin', '0001_initial', '2025-09-08 21:05:49.792576'),
(4, 'admin', '0002_logentry_remove_auto_add', '2025-09-08 21:05:49.800745'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2025-09-08 21:05:49.814738'),
(6, 'contenttypes', '0002_remove_content_type_name', '2025-09-08 21:05:50.309768'),
(7, 'auth', '0002_alter_permission_name_max_length', '2025-09-08 21:05:50.519043'),
(8, 'auth', '0003_alter_user_email_max_length', '2025-09-08 21:05:50.846323'),
(9, 'auth', '0004_alter_user_username_opts', '2025-09-08 21:05:50.872391'),
(10, 'auth', '0005_alter_user_last_login_null', '2025-09-08 21:05:51.097193'),
(11, 'auth', '0006_require_contenttypes_0002', '2025-09-08 21:05:51.099302'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2025-09-08 21:05:51.129023'),
(13, 'auth', '0008_alter_user_username_max_length', '2025-09-08 21:05:51.294073'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2025-09-08 21:05:51.449692'),
(15, 'auth', '0010_alter_group_name_max_length', '2025-09-08 21:05:51.650686'),
(16, 'auth', '0011_update_proxy_permissions', '2025-09-08 21:05:51.681415'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2025-09-08 21:05:51.885980'),
(18, 'backend', '0001_initial', '2025-09-08 21:06:13.727519'),
(19, 'sessions', '0001_initial', '2025-09-08 21:06:13.998295'),
(20, 'backend', '0002_alter_domaine_image_alter_laboratoire_logo_and_more', '2025-09-08 21:15:04.087142'),
(21, 'backend', '0003_alter_partenaire_statut', '2025-09-08 22:20:16.806421'),
(22, 'backend', '0004_remove_partenaire_statut_partenaire_statu', '2025-09-08 22:23:51.064689'),
(23, 'backend', '0005_alter_partenaire_id_type_partenaire', '2025-09-09 00:43:06.837855'),
(24, 'backend', '0006_rename_id_type_partenaire_partenaire_type_partenaire', '2025-09-09 00:47:03.672068'),
(25, 'backend', '0007_remove_recherche_statut_recherche_statu', '2025-09-09 01:42:52.043581'),
(26, 'backend', '0008_recherchelaboratoire_id_domaine', '2025-09-09 17:12:20.959916'),
(27, 'backend', '0009_remove_recherche_id_domaine', '2025-09-09 17:14:23.842634'),
(28, 'backend', '0010_remove_recherchelaboratoire_id_domaine_and_more', '2025-09-09 17:29:54.983245'),
(29, 'backend', '0011_remove_recherchepublication_annee_publication', '2025-09-09 17:34:19.992979'),
(30, 'backend', '0012_alter_recherchepublication_fichier', '2025-09-09 17:36:26.556486'),
(31, 'backend', '0013_remove_chercheur_photo_url_chercheur_photo', '2025-09-09 18:15:00.263223'),
(32, 'backend', '0014_alter_poste_grade', '2025-09-10 14:37:34.017758'),
(33, 'backend', '0015_alter_poste_grade', '2025-09-10 14:38:26.136666'),
(34, 'backend', '0016_remove_laboratoirepresentation_annee_creation_and_more', '2025-09-10 15:25:22.072998'),
(35, 'backend', '0017_remove_partenaire_statu_and_more', '2025-09-10 15:50:13.939188'),
(36, 'backend', '0018_partenaire_logo', '2025-09-10 15:54:40.025696'),
(37, 'backend', '0019_remove_chercheurlaboratoire_id_chercheur_and_more', '2025-09-10 16:17:42.493177'),
(38, 'backend', '0020_chercheurlaboratoire_statu', '2025-09-10 16:19:29.495414'),
(39, 'backend', '0021_remove_chercheurreseau_id_reseau_social_and_more', '2025-09-10 17:07:03.675540'),
(40, 'backend', '0022_remove_chercheurreseau_lien_and_more', '2025-09-10 17:11:04.493141'),
(41, 'backend', '0023_chercheur_bureau', '2025-09-10 17:16:26.893913'),
(42, 'backend', '0024_remove_chercheurdomaineexpertise_nom_domaine_and_more', '2025-09-13 21:30:49.260106'),
(43, 'backend', '0025_chercheur_creer_le_chercheur_mise_a_jour_le_and_more', '2025-09-13 21:46:53.719002'),
(44, 'backend', '0026_alter_chercheur_creer_le_and_more', '2025-09-13 21:47:15.677224'),
(45, 'backend', '0027_laboratoirenewalbum', '2025-09-14 13:20:42.150378'),
(46, 'backend', '0028_laboratoirepageblockentete', '2025-09-17 11:32:50.007253'),
(47, 'backend', '0029_laboratoiredomaine_icone', '2025-09-17 16:23:20.313903'),
(48, 'backend', '0030_remove_domaine_image', '2025-09-17 16:30:47.219974'),
(49, 'backend', '0031_remove_laboratoirenew_date_publication_and_more', '2025-09-18 09:11:36.718424'),
(50, 'backend', '0032_alter_laboratoirenew_date_realisation_debut', '2025-09-18 09:12:06.491750'),
(51, 'backend', '0033_candidatureparcours_contactlaboratoire_and_more', '2025-09-26 01:00:57.165939');

-- --------------------------------------------------------

--
-- Structure de la table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('h700ly0oxylxlay9k45gf9dsshie40v9', '.eJxVjDsOwjAQBe_iGln-ZmNKes5grddrHECOFCcV4u4QKQW0b2beS0Tc1hq3zkucsjgLLU6_W0J6cNtBvmO7zZLmti5TkrsiD9rldc78vBzu30HFXr81DWQdDAkoUciBqCiAXKxKvqjsIBkyRaFznuw4OsNkCJG9hmBZOyXeHwN-OFc:1uvj8D:VHdjz_QrWkaEuIbxO11Cb98JDivo8G8vMbIq6OSqsa4', '2025-09-22 21:10:33.388691'),
('wmjr1yzq02d69mj7rwiel7vul5m87wfr', '.eJxVjDsOwjAQBe_iGln-ZmNKes5grddrHECOFCcV4u4QKQW0b2beS0Tc1hq3zkucsjgLLU6_W0J6cNtBvmO7zZLmti5TkrsiD9rldc78vBzu30HFXr81DWQdDAkoUciBqCiAXKxKvqjsIBkyRaFznuw4OsNkCJG9hmBZOyXeHwN-OFc:1v0eAP:xSX4RtEiAr7s8dWCGlApNLnSueJTjKgv___YrbGOf2w', '2025-10-06 10:53:09.086327'),
('4e9cjtqcwh9kt98fsqzpvvzvgw3c9yp6', '.eJxVjDsOwjAQBe_iGln-ZmNKes5grddrHECOFCcV4u4QKQW0b2beS0Tc1hq3zkucsjgLLU6_W0J6cNtBvmO7zZLmti5TkrsiD9rldc78vBzu30HFXr81DWQdDAkoUciBqCiAXKxKvqjsIBkyRaFznuw4OsNkCJG9hmBZOyXeHwN-OFc:1v1yyO:lJPCvYkWafp4H9FsJ6ZYeTWOK01dOc8HOFDhRiisRU8', '2025-10-10 03:18:16.079311'),
('wbxmpjcze00q62w610zcdeuvzhlqzl0v', '.eJxVjDsOwjAQBe_iGln-ZmNKes5grddrHECOFCcV4u4QKQW0b2beS0Tc1hq3zkucsjgLLU6_W0J6cNtBvmO7zZLmti5TkrsiD9rldc78vBzu30HFXr81DWQdDAkoUciBqCiAXKxKvqjsIBkyRaFznuw4OsNkCJG9hmBZOyXeHwN-OFc:1v1zxa:WrQ3Cih6VJv_PxBylUiYpS2O4QLOF8cMscq3LGo_K7o', '2025-10-10 04:21:30.167858'),
('rabhlww3wlwsktbd5p2kvjm1a25iwd3i', '.eJxVjDsOwjAQBe_iGln-ZmNKes5grddrHECOFCcV4u4QKQW0b2beS0Tc1hq3zkucsjgLLU6_W0J6cNtBvmO7zZLmti5TkrsiD9rldc78vBzu30HFXr81DWQdDAkoUciBqCiAXKxKvqjsIBkyRaFznuw4OsNkCJG9hmBZOyXeHwN-OFc:1v20zP:uAtO1rt22idWJlFrPO6EB4Hx4gVeREgIpymryBBtGdA', '2025-10-10 05:27:27.902816'),
('ri3ri80o5qeu0k96bscomkpdktc8qq0c', '.eJxVjDsOwjAQBe_iGln-ZmNKes5grddrHECOFCcV4u4QKQW0b2beS0Tc1hq3zkucsjgLLU6_W0J6cNtBvmO7zZLmti5TkrsiD9rldc78vBzu30HFXr81DWQdDAkoUciBqCiAXKxKvqjsIBkyRaFznuw4OsNkCJG9hmBZOyXeHwN-OFc:1v20zR:93ljKF74D9Itg63RYgckI-KnbO5iY6JaJj-KPeRfWKc', '2025-10-10 05:27:29.480095');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
