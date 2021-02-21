-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 192.168.99.101
-- Generation Time: Feb 19, 2021 at 11:32 AM
-- Server version: 8.0.22
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `matcha`
--
CREATE DATABASE IF NOT EXISTS matcha;
USE matcha;

-- --------------------------------------------------------

--
-- Table structure for table `block`
--

CREATE TABLE `block` (
  `id` int NOT NULL,
  `blocker` int NOT NULL,
  `blocked` int NOT NULL,
  `dateOfBlock` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `consults`
--

CREATE TABLE `consults` (
  `id` int NOT NULL,
  `consulter` int NOT NULL,
  `consulted` int NOT NULL,
  `dateOfConsult` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `consults`
--

INSERT INTO `consults` (`id`, `consulter`, `consulted`, `dateOfConsult`) VALUES
(35, 261, 260, '2021-01-25 15:03:09'),
(36, 260, 261, '2021-01-25 15:03:58'),
(37, 260, 261, '2021-01-30 12:15:04');

-- --------------------------------------------------------

--
-- Table structure for table `gender`
--

CREATE TABLE `gender` (
  `id` int NOT NULL,
  `gender` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gender`
--

INSERT INTO `gender` (`id`, `gender`) VALUES
(2, 'Female'),
(1, 'Male');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int NOT NULL,
  `image` text NOT NULL,
  `userId` int NOT NULL,
  `isProfilePicture` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `image`, `userId`, `isProfilePicture`) VALUES
(207, '1607329039024_leftBG copy.jpg', 260, 1),
(208, '1607329039023_leftBG copy 2.jpg', 260, 0),
(209, '1607329039018_leftBackground copy.jpg', 260, 0),
(210, '1607329039021_leftBackground.jpg', 260, 0),
(223, '1607503524786_leftBackground copy.jpg', 261, 1),
(224, '1607503524794_leftBG copy 2.jpg', 261, 0),
(225, '1607503524795_leftBG copy.jpg', 261, 0),
(226, '1607513868958_leftBackground copy 2.jpg', 264, 1),
(227, '1607513868967_leftBackground copy.jpg', 264, 0),
(228, '1607513868982_leftBG copy 2.jpg', 264, 0),
(229, '1607513868985_leftBG copy.jpg', 264, 0),
(230, '1607513868980_leftBackground.jpg', 264, 0),
(231, '1607329039023_leftBG copy 3.jpg', 301, 1),
(232, '69512468_351902105695601_4433047741492363264_o.jpg', 302, 1),
(233, '69907263_351902322362246_9127829273879511040_n.jpg', 303, 1),
(234, '1612627635365_342.jpg', 304, 1),
(235, '1612627641028_1_20191103_163523.jpg', 305, 1),
(236, '1612621436097_1.png', 306, 1),
(237, '1612626431435_1r4a7668.jpg', 307, 1),
(238, '1612621436097_1.png', 308, 1),
(239, '1607329039023_leftBG copy 3.jpg', 309, 1);
-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int NOT NULL,
  `liker` int NOT NULL,
  `liked` int NOT NULL,
  `dateOfLike` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `liker`, `liked`, `dateOfLike`) VALUES
(118, 260, 261, '2021-01-27 15:51:03'),
(119, 261, 260, '2021-01-27 15:51:15');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `altitude` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `latitude`, `longitude`, `altitude`) VALUES
(5, -5.89788, 32.8821, 0),
(6, -6.93476, 32.886, 0),
(7, -7, 38, 0),
(8, 15, 5, 10);

-- --------------------------------------------------------

--
-- Table structure for table `match`
--

CREATE TABLE `match` (
  `id` int NOT NULL,
  `matcher` int NOT NULL,
  `matched` int NOT NULL,
  `dateOfMatch` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `match`
--

INSERT INTO `match` (`id`, `matcher`, `matched`, `dateOfMatch`) VALUES
(17, 261, 260, '2021-01-27 15:51:15');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int NOT NULL,
  `sender` int NOT NULL,
  `receiver` int NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL,
  `seen` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender`, `receiver`, `content`, `date`, `seen`) VALUES
(1, 260, 261, 'Hello user 2', '2021-01-25 18:02:17', 1),
(2, 260, 261, 'Hello user 2', '2021-01-25 18:02:24', 1),
(3, 261, 260, 'Hello user 2', '2021-01-25 18:03:29', 1),
(4, 260, 261, 'Hello user 2', '2021-01-25 18:04:25', 1),
(5, 261, 260, 'Hello user 2', '2021-01-25 18:04:28', 1),
(6, 260, 261, 'Hello user 2', '2021-01-25 18:04:56', 1),
(7, 260, 261, 'Hello user 2', '2021-01-25 18:04:59', 1),
(8, 260, 261, 'Hello user 2', '2021-01-25 18:05:17', 1),
(9, 260, 261, 'Hello user 2', '2021-01-25 18:05:18', 1),
(10, 261, 260, 'Hello user 2', '2021-01-25 18:05:26', 1),
(11, 261, 260, 'Hello user 2', '2021-01-25 18:05:39', 1),
(12, 261, 260, 'Hello user 2', '2021-01-25 18:05:39', 1),
(13, 261, 260, 'Hello user 2', '2021-01-25 18:05:40', 1),
(14, 261, 260, 'Hello user 2', '2021-01-25 18:05:40', 1),
(15, 260, 261, 'Hello user 2', '2021-01-25 18:05:55', 1),
(16, 261, 260, 'Hello user 2', '2021-01-25 18:07:23', 1),
(17, 261, 260, 'Hello user 2', '2021-01-25 18:08:24', 1),
(18, 261, 260, 'Hello user 2', '2021-01-25 18:08:37', 1),
(19, 261, 260, 'Hello user 2', '2021-01-25 18:08:44', 1),
(20, 261, 260, 'Hello user 2', '2021-01-25 18:09:01', 1),
(21, 261, 260, 'Hello user 2', '2021-01-25 18:09:23', 1),
(22, 261, 260, 'Hello user 2', '2021-01-25 18:09:48', 1),
(23, 260, 261, 'Hello user 2', '2021-01-25 18:09:51', 1),
(24, 260, 261, 'Hello user 2', '2021-01-25 18:09:51', 1),
(25, 260, 261, 'Hello user 2', '2021-01-25 18:09:51', 1),
(26, 261, 260, 'Hello user 2', '2021-01-25 18:10:19', 1),
(27, 261, 260, 'Hello user 2', '2021-01-25 18:10:19', 1),
(28, 261, 260, 'Hello user 2', '2021-01-25 18:10:19', 1),
(29, 261, 260, 'Hello user 2', '2021-01-25 18:10:19', 1),
(30, 261, 260, 'Hello user 2', '2021-01-25 18:40:08', 1),
(31, 261, 260, 'Hello user 2', '2021-01-25 18:40:08', 1),
(32, 261, 260, 'Hello user 2', '2021-01-25 18:40:08', 1),
(33, 261, 260, 'Hello user 2', '2021-01-25 18:40:08', 1),
(34, 261, 260, 'Hello user 2', '2021-01-25 18:40:09', 1),
(35, 261, 260, 'Hello user 2', '2021-01-25 18:40:09', 1),
(36, 261, 260, 'Hello user 2', '2021-01-25 18:40:09', 1),
(37, 261, 260, 'Hello user 2', '2021-01-25 18:40:22', 1),
(38, 261, 260, 'Hello user 2', '2021-01-25 18:40:22', 1),
(39, 260, 261, 'Hello user 2', '2021-01-25 18:40:30', 1),
(40, 260, 261, 'Hello user 2', '2021-01-25 18:40:30', 1),
(41, 260, 261, 'Hello user 2', '2021-01-25 18:40:30', 1),
(42, 260, 261, 'Hello user 2', '2021-01-25 18:40:30', 1),
(43, 260, 261, 'Hello user 2', '2021-01-25 18:40:31', 1),
(44, 260, 261, 'Hello user 2', '2021-01-25 18:40:31', 1),
(45, 260, 261, 'Hello user 2', '2021-01-25 18:40:31', 1),
(46, 260, 261, 'Hello user 2', '2021-01-26 18:28:42', 1),
(47, 261, 260, 'Hello user 2', '2021-01-26 18:28:45', 1),
(48, 260, 261, 'Hello user 2', '2021-01-26 18:28:49', 1),
(49, 260, 261, 'Hello user 2', '2021-01-26 18:28:50', 1),
(50, 260, 261, 'Hello user 2', '2021-01-26 18:28:50', 1),
(51, 260, 261, 'Hello user 2', '2021-01-26 18:28:50', 1),
(52, 260, 261, 'Hello user 2', '2021-01-26 18:28:50', 1),
(53, 261, 260, 'Hello user 2', '2021-01-26 18:29:06', 1),
(54, 261, 260, 'Hello user 2', '2021-01-26 18:29:06', 1),
(55, 261, 260, 'Hello user 2', '2021-01-26 18:29:07', 1),
(56, 261, 260, 'Hello user 2', '2021-01-26 18:29:07', 1),
(57, 261, 260, 'Hello user 2', '2021-01-26 18:29:07', 1),
(58, 261, 260, 'Hello user 2', '2021-01-26 18:29:07', 1),
(59, 261, 260, 'Hello user 2', '2021-01-26 18:29:07', 1),
(60, 261, 260, 'Hello user 2', '2021-01-26 18:29:07', 1),
(61, 261, 260, 'Hello user 2', '2021-01-26 18:29:08', 1),
(62, 260, 261, 'Hello user 2', '2021-01-27 17:00:15', 1),
(63, 260, 261, 'Hello user 2', '2021-01-27 17:00:15', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int NOT NULL,
  `type` varchar(50) NOT NULL,
  `notifier` int NOT NULL,
  `notified` int NOT NULL,
  `date` datetime NOT NULL,
  `seen` tinyint DEFAULT (0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `type`, `notifier`, `notified`, `date`, `seen`) VALUES
(60, 'like', 260, 261, '2021-01-27 15:51:03', 1),
(61, 'match', 261, 260, '2021-01-27 15:51:15', 1),
(62, 'match', 260, 261, '2021-01-27 15:51:15', 1),
(63, 'like', 261, 260, '2021-01-27 15:51:15', 1),
(64, 'consult', 260, 261, '2021-01-30 12:15:04', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rank`
--

CREATE TABLE `rank` (
  `id` int NOT NULL,
  `rank` varchar(50) NOT NULL,
  `rankValue` float NOT NULL,
  `minXp` float NOT NULL,
  `maxXp` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rank`
--

INSERT INTO `rank` (`id`, `rank`, `rankValue`, `minXp`, `maxXp`) VALUES
(1, 'Apprentice', 0, 0, 1000),
(2, 'Initiated', 10, 1000, 2250),
(3, 'Trained', 20, 2250, 3375),
(4, 'Competent', 30, 3375, 5062),
(5, 'Experienced', 40, 5062, 7593),
(6, 'Specialist', 50, 7593, 7593);

-- --------------------------------------------------------

--
-- Table structure for table `sexualOrientation`
--

CREATE TABLE `sexualOrientation` (
  `id` int NOT NULL,
  `orientation` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sexualOrientation`
--

INSERT INTO `sexualOrientation` (`id`, `orientation`) VALUES
(1, 'heterosexual'),
(2, 'homosexual'),
(3, 'bisexual');

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id` int NOT NULL,
  `tag` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`id`, `tag`) VALUES
(870, '12521'),
(493, '20'),
(492, 'cf'),
(783, 'Damn'),
(491, 'ff'),
(107, 'FFFFF'),
(400, 'Hamza'),
(499, 'LIIILLL'),
(109, 'lol'),
(291, 'New_Tag'),
(327, 'New_Tag2'),
(106, 'XD'),
(108, 'XD2');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `activationCode` varchar(256) DEFAULT NULL,
  `expirationDate` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `refreshToken` text,
  `resetPasswordToken` varchar(256) DEFAULT NULL,
  `resetPasswordExpirationDate` datetime DEFAULT NULL,
  `genderId` int DEFAULT NULL,
  `orientationId` int DEFAULT NULL,
  `bio` text,
  `locationId` int DEFAULT NULL,
  `rankId` int NOT NULL,
  `experience` float NOT NULL,
  `birthDate` date DEFAULT NULL,
  `lastSeen` datetime NOT NULL DEFAULT (now())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `userName`, `firstName`, `lastName`, `password`, `activationCode`, `expirationDate`, `active`, `refreshToken`, `resetPasswordToken`, `resetPasswordExpirationDate`, `genderId`, `orientationId`, `bio`, `locationId`, `rankId`, `experience`, `birthDate`) VALUES
(260, 'younes.bouladhane.dev@gmail.com', 'connectedUser', 'Skafandrii_Test', 'test1', '$2b$10$wbutPxWGgeV0lJhAK6iOUeXO6Yymj88yw9U/REgi7dsEloHD0k.Q6', '1f24a72783d05ba94f85f4cf889aa349d491ea3277730ade22d6553c121724c7e4e082ce9e7fceffe7f3430d3fc1148247139f1830ab4970856a607c96d3d0ed44a3fe15c94639f7d3a03b52449d06e1e1b4b98ac913ac960e7bf2179d6bfc2ba0ae1b0e8721417d42766e84bacb08202d6ca4b390425f8d60bee2438d3fe837', '2020-11-27 12:14:19', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImNvbm5lY3RlZFVzZXIiLCJpYXQiOjE2MTA5OTE3OTAsImV4cCI6MTYxMTA3ODE5MH0.Sx8X5J8FvOklQP6V8J1V-iZfpS0tnxSLcO4LBx3EveY', NULL, NULL, 1, 1, 'Worsdfadfking', 5, 5, 0, '1970-07-05'),
(261, 'younes.bouladhane.d@gmail.com', 'test2', 'test2', 'test2', '$2b$10$8M4CiRvH8jClA36/6q.lOeU4yoR1ys8IMMrzeeuLWKYCq/PMVpBBi', '72cbe6c54ef4a98c0f80fd8204132112ce5567a0ffd62da6c1c0b25489a889502d7a0a861febf4f385c60ce17dc070d4262706910de9308b487ca49676aa4791235d9b8a449871f002521a3103c8638f75f09977a7f51d62b4275ec557e73c64b23743a1f5d12ecbc41eb134af308ac970e0cd0d19a9cacf1ff5a334066366bb', '2020-12-05 14:06:18', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QyIiwiaWF0IjoxNjA3NTAyNjg2LCJleHAiOjE2MDc1ODkwODZ9.Xfo5yZkjr-hR7Uds000sZ3GSnXjf_83Y4Q55M-aI2uk', NULL, NULL, 1, 1, NULL, 6, 1, 0, '1975-07-05'),
(262, 'younes.bouladhafne.dg@mail.com', 'test3', 'test3', 'test3', '$2b$10$UBLEVgvl2RszrjFs.T7rDOYCzPlEkEF57tQAazkjXNPUYFohhnW76', 'fc5ff24371f2a4538b223d680da3cdbd5d2774a617ad5df25389d51b8f713c0ff40af1d4cfcc5fe2d2c9480c06d015279bf5e96f44d0ba837f0ab8098b78ed48381b633d6d64a7f35774d38c7fee164561eb9dceab1aab4a430b6ff9f051a05ce1b6e329047193841900d069e8fa2e621b3abca88728443d3ff40c34e52fe23e', '2020-12-06 11:54:28', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QzIiwiaWF0IjoxNjA3NzY4MjE4LCJleHAiOjE2MDc4NTQ2MTh9.VQ4OlNq7zVGvmVjTJVOYIL9amfkt-GGDPyqR_X-BGXA', NULL, NULL, 1, 3, NULL, 6, 1, 0, '1980-07-05'),
(263, 'younouladhafne.dg@mail.com', 'test4', 'test4', 'test4', '$2b$10$vCold6qJSlwf0IJHJp8/SeAZdjNU.lyrPEJRqRMUjM7FXGOLFKLme', 'cf2b1cd80eb03bcaa27530ac572fc9c0e42edac083d880a0b53f2e7c5c02143541e995174d7be2f34c3aa50274e0d320ef7be4a98e6e02cb0b615b62ceb8263edb066c9690507dba051695b5b229312f9f2e0794d9242c6e653898625db095dd51121e65d2868a0a33b1ac5caf2e870e40298f5fa4ba371631431ede99e558d8', '2020-12-06 11:54:40', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3Q0IiwiaWF0IjoxNjA3NjIyMjg1LCJleHAiOjE2MDc3MDg2ODV9.8G83bo-2x7GahvzDcF99cqLNgkBEebcUR7uglwQxsIk', NULL, NULL, 2, 1, NULL, 6, 1, 0, '1985-07-05'),
(264, 'younouladhsafne.dg@mail.com', 'test5', 'test5', 'test4', '$2b$10$zmKebqEZZmCc0yA7po0z1.zVUWUGaYGeE2YAlHx4YeQVHun0kjizS', '69e8edbc5b450b079f0905cc71b6441e28033e9a79ed90a4bb01ed768d8b92074da18cd4a740b4126c621625537a60ac8012b6d7d468f40653f3212515778dcbeda342d887176ab259b7daf11a0df6920900508fb9066c4ef1459b0e7148d86b1de40011ae2fff8afafeffc4247cf5362aca14d5c6fd2061deaae4a09d6bce63', '2020-12-10 12:36:23', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3Q1IiwiaWF0IjoxNjA3NjIyMDkwLCJleHAiOjE2MDc3MDg0OTB9.EXT7znqAjwYVdqo8HxPhtZA3s_DVfoIrQc_oQJVMbVM', NULL, NULL, 1, 1, NULL, 6, 1, 0, '1990-07-05'),
(265, 'younouladhs66afne.dg@mail.com', 'test6', 'test6', 'test6', '$2b$10$fkro9R8dALgwE.ZRo23/j.w8UzTTu/bF30lAgq67WOHm2jgUXgeSW', '5636adbab9d6c5edad3952fde904189881019af788f157871057a4e1bfbe575a3fb5655857c5800de913047266cbac743c5eec473fe573a12084a2747aa40768b785a090a0b527df062695b35ebb48cfc70bc91fb4ea3daee9de95b61e62d430e8fdf94a825c20fc1e14ba3636a27f68b5c5306e61f155f76a93f9dc01412a63', '2020-12-12 10:38:12', 1, NULL, NULL, NULL, 2, 3, NULL, 5, 1, 0, '1996-07-05'),
(301, 'younouladhs66afne1.dg@mail.com', 'test61', 'test61', 'test61', '$2b$10$fkro9R8dALgwE.ZRo23/j.w8UzTTu/bF30lAgq67WOHm2jgUXgeSW', '5636adbab9d6c5edad3952fde904189881019af788f157871057a4e1bfbe575a3fb5655857c5800de913047266cbac743c5eec473fe573a12084a2747aa40768b785a090a0b527df062695b35ebb48cfc70bc91fb4ea3daee9de95b61e62d430e8fdf94a825c20fc1e14ba3636a27f68b5c5306e61f155f76a93f9dc01412a63', '2020-12-12 10:38:12', 1, NULL, NULL, NULL, 2, 3, "Call me maybe", 5, 1, 0, '1996-07-05'),
(302, 'younouladhs66afne2.dg@mail.com', 'test62', 'test62', 'test62', '$2b$10$fkro9R8dALgwE.ZRo23/j.w8UzTTu/bF30lAgq67WOHm2jgUXgeSW', '5636adbab9d6c5edad3952fde904189881019af788f157871057a4e1bfbe575a3fb5655857c5800de913047266cbac743c5eec473fe573a12084a2747aa40768b785a090a0b527df062695b35ebb48cfc70bc91fb4ea3daee9de95b61e62d430e8fdf94a825c20fc1e14ba3636a27f68b5c5306e61f155f76a93f9dc01412a63', '2020-12-12 10:38:12', 1, NULL, NULL, NULL, 2, 3, "Call me maybe", 5, 1, 0, '1996-07-05'),
(303, 'younouladhs66afne3.dg@mail.com', 'test63', 'test63', 'test63', '$2b$10$fkro9R8dALgwE.ZRo23/j.w8UzTTu/bF30lAgq67WOHm2jgUXgeSW', '5636adbab9d6c5edad3952fde904189881019af788f157871057a4e1bfbe575a3fb5655857c5800de913047266cbac743c5eec473fe573a12084a2747aa40768b785a090a0b527df062695b35ebb48cfc70bc91fb4ea3daee9de95b61e62d430e8fdf94a825c20fc1e14ba3636a27f68b5c5306e61f155f76a93f9dc01412a63', '2020-12-12 10:38:12', 1, NULL, NULL, NULL, 2, 3, "Call me maybe", 5, 1, 0, '1996-07-05'),
(304, 'younouladhs66afne4.dg@mail.com', 'test64', 'test64', 'test64', '$2b$10$fkro9R8dALgwE.ZRo23/j.w8UzTTu/bF30lAgq67WOHm2jgUXgeSW', '5636adbab9d6c5edad3952fde904189881019af788f157871057a4e1bfbe575a3fb5655857c5800de913047266cbac743c5eec473fe573a12084a2747aa40768b785a090a0b527df062695b35ebb48cfc70bc91fb4ea3daee9de95b61e62d430e8fdf94a825c20fc1e14ba3636a27f68b5c5306e61f155f76a93f9dc01412a63', '2020-12-12 10:38:12', 1, NULL, NULL, NULL, 2, 3, "Call me maybe", 5, 1, 0, '1996-07-05'),
(305, 'younouladhs66afne5.dg@mail.com', 'test65', 'test65', 'test65', '$2b$10$fkro9R8dALgwE.ZRo23/j.w8UzTTu/bF30lAgq67WOHm2jgUXgeSW', '5636adbab9d6c5edad3952fde904189881019af788f157871057a4e1bfbe575a3fb5655857c5800de913047266cbac743c5eec473fe573a12084a2747aa40768b785a090a0b527df062695b35ebb48cfc70bc91fb4ea3daee9de95b61e62d430e8fdf94a825c20fc1e14ba3636a27f68b5c5306e61f155f76a93f9dc01412a63', '2020-12-12 10:38:12', 1, NULL, NULL, NULL, 2, 3, "Call me maybe", 5, 1, 0, '1996-07-05'),
(306, 'younouladhs66afne6.dg@mail.com', 'test66', 'test66', 'test66', '$2b$10$fkro9R8dALgwE.ZRo23/j.w8UzTTu/bF30lAgq67WOHm2jgUXgeSW', '5636adbab9d6c5edad3952fde904189881019af788f157871057a4e1bfbe575a3fb5655857c5800de913047266cbac743c5eec473fe573a12084a2747aa40768b785a090a0b527df062695b35ebb48cfc70bc91fb4ea3daee9de95b61e62d430e8fdf94a825c20fc1e14ba3636a27f68b5c5306e61f155f76a93f9dc01412a63', '2020-12-12 10:38:12', 1, NULL, NULL, NULL, 2, 3, "Call me maybe", 5, 1, 0, '1996-07-05'),
(307, 'younouladhs66afne7.dg@mail.com', 'test67', 'test67', 'test67', '$2b$10$fkro9R8dALgwE.ZRo23/j.w8UzTTu/bF30lAgq67WOHm2jgUXgeSW', '5636adbab9d6c5edad3952fde904189881019af788f157871057a4e1bfbe575a3fb5655857c5800de913047266cbac743c5eec473fe573a12084a2747aa40768b785a090a0b527df062695b35ebb48cfc70bc91fb4ea3daee9de95b61e62d430e8fdf94a825c20fc1e14ba3636a27f68b5c5306e61f155f76a93f9dc01412a63', '2020-12-12 10:38:12', 1, NULL, NULL, NULL, 2, 3, "Call me maybe", 5, 1, 0, '1996-07-05'),
(308, 'younouladhs66afne8.dg@mail.com', 'test68', 'test68', 'test68', '$2b$10$fkro9R8dALgwE.ZRo23/j.w8UzTTu/bF30lAgq67WOHm2jgUXgeSW', '5636adbab9d6c5edad3952fde904189881019af788f157871057a4e1bfbe575a3fb5655857c5800de913047266cbac743c5eec473fe573a12084a2747aa40768b785a090a0b527df062695b35ebb48cfc70bc91fb4ea3daee9de95b61e62d430e8fdf94a825c20fc1e14ba3636a27f68b5c5306e61f155f76a93f9dc01412a63', '2020-12-12 10:38:12', 1, NULL, NULL, NULL, 2, 3, "Call me maybe", 5, 1, 0, '1996-07-05'),
(309, 'younouladhs66afne9.dg@mail.com', 'test69', 'test69', 'test69', '$2b$10$fkro9R8dALgwE.ZRo23/j.w8UzTTu/bF30lAgq67WOHm2jgUXgeSW', '5636adbab9d6c5edad3952fde904189881019af788f157871057a4e1bfbe575a3fb5655857c5800de913047266cbac743c5eec473fe573a12084a2747aa40768b785a090a0b527df062695b35ebb48cfc70bc91fb4ea3daee9de95b61e62d430e8fdf94a825c20fc1e14ba3636a27f68b5c5306e61f155f76a93f9dc01412a63', '2020-12-12 10:38:12', 1, NULL, NULL, NULL, 2, 3, "Call me maybe", 5, 1, 0, '1996-07-05'),
(267, 'younouladhs66fafne.dg@mail.com', 'test7', 'test7', 'test7', '$2b$10$fkro9R8dALgwE.ZRo23/j.w8UzTTu/bF30lAgq67WOHm2jgUXgeSW', '5636adbab9d6c5edad3952fde904189881019af788f157871057a4e1bfbe575a3fb5655857c5800de913047266cbac743c5eec473fe573a12084a2747aa40768b785a090a0b527df062695b35ebb48cfc70bc91fb4ea3daee9de95b61e62d430e8fdf94a825c20fc1e14ba3636a27f68b5c5306e61f155f76a93f9dc01412a63', '2020-12-12 10:38:12', 1, NULL, NULL, NULL, 2, 3, NULL, 8, 1, 0, '2001-07-05'),
(271, 'younouladhhhhhs66afne.dg@mail.com', 'test8', 'test8', 'test8', '$2b$10$GX/MMh.JYS5I02ldyXPUi.K.v2zb0xnQVKVRnkyAEzbNevJegGOPa', 'c090163e5d8209285fec1f16ade852d6634b403233f406ad74082849cd39c700619af4ef0a850040010f922eb21fe220ae5f17646f9e8d6f31480d7ab929fa12895739504343600aafc79d16a1f0d63217b58579a165e75fb62730fb7ac271cb498d312c1c1c034d7f905846e7d53cbb4753a58d98471d45d6250150d98578d6', '2020-12-13 12:19:48', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, '2003-07-05'),
(273, 'younouladhhhhhfs66afne.dg@mail.com', 'test10', 'test10', 'test8', '$2b$10$1bgCXHCL3qCcJVEfk7kviOf0CZX5ecBLw8tylZ5IOTz1aFUcsLGH6', 'f1195caf5c4056c1901ecb0b9e178b336e0d05a384668702e166d04c234be36686a599257ff0c220c58fabfed61d4727e5dbb0a4ed7c0ef524ffed250f804a741e3656a690de50444de2b8f5bd04901bec314effbaf92ad9d69fe246c0354483ef446aa79f17e49420c5bb0fad8ba73ed20b4fc368256bc83c2e8d073bb60033', '2020-12-13 12:21:37', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, '1980-07-05'),
(274, 'younoulad11afne.dg@mail.com', 'test11', 'test11', 'test11', '$2b$10$fkro9R8dALgwE.ZRo23/j.w8UzTTu/bF30lAgq67WOHm2jgUXgeSW', '5636adbab9d6c5edad3952fde904189881019af788f157871057a4e1bfbe575a3fb5655857c5800de913047266cbac743c5eec473fe573a12084a2747aa40768b785a090a0b527df062695b35ebb48cfc70bc91fb4ea3daee9de95b61e62d430e8fdf94a825c20fc1e14ba3636a27f68b5c5306e61f155f76a93f9dc01412a63', '2020-12-12 10:38:12', 1, NULL, NULL, NULL, 2, 3, NULL, 5, 1, 70, '1980-07-05'),
(279, 'younouladhhh12fne.dg@mail.com', 'test12', 'test12', 'test2', '$2b$10$BzGn679MRHM.JcCG3mRpoOBFNAa1KlzP0Lxaix4sekmSjvCCYfGRu', 'c4e39b69b8125ad267c9845d6220a94705e050439bdab9e63bfc76b8b6857cde74fe7181fbf5a71949e09573fc57c0bfb7840f4df5511451e2a7ed3ecc008fe9ccf4c59608310ca7e1300642b55d523b348881d5f3e7aac5e70054c5e005fb534ec5d4aabda1bf6037fa76c19f0f341d0da8b0c9eb4ab69d9f7e6e331d08d2ff', '2021-01-20 15:32:22', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, '1996-07-05');

-- --------------------------------------------------------

--
-- Table structure for table `user_tag`
--

CREATE TABLE `user_tag` (
  `id` int NOT NULL,
  `tagId` int DEFAULT NULL,
  `userId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_tag`
--


INSERT INTO `user_tag` (`id`, `tagId`, `userId`) VALUES
(731, 499, 260),
(781, 499, 265),
(782, 783, 265),
(786, 499, 267),
(784, 499, 274),
(732, 783, 260),
(746, 783, 264),
(785, 783, 267),
(738, 870, 261),
(745, 870, 264),
(881, 499, 301),
(882, 783, 301),
(883, 499, 302),
(884, 783, 302),
(885, 499, 303),
(886, 783, 303),
(887, 499, 304),
(888, 783, 304),
(889, 499, 305),
(880, 783, 305),
(891, 499, 306),
(892, 783, 306),
(893, 499, 307),
(894, 783, 307),
(895, 499, 308),
(896, 783, 308),
(897, 499, 309),
(898, 783, 309);
--
-- Indexes for dumped tables
--

--
-- Indexes for table `block`
--
ALTER TABLE `block`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_blocked_blocker` (`blocked`,`blocker`),
  ADD KEY `blocker_user` (`blocker`);

--
-- Indexes for table `consults`
--
ALTER TABLE `consults`
  ADD PRIMARY KEY (`id`),
  ADD KEY `consulted_user` (`consulted`),
  ADD KEY `consulter_user` (`consulter`);

--
-- Indexes for table `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gender` (`gender`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `imageUserId` (`userId`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `liker` (`liker`,`liked`),
  ADD KEY `liked_user` (`liked`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `match`
--
ALTER TABLE `match`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_matcher_matched` (`matcher`,`matched`),
  ADD KEY `matched_user` (`matched`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_sender` (`sender`),
  ADD KEY `FK_receiver` (`receiver`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notifier_user` (`notifier`),
  ADD KEY `fk_notified_user` (`notified`);

--
-- Indexes for table `rank`
--
ALTER TABLE `rank`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sexualOrientation`
--
ALTER TABLE `sexualOrientation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tag` (`tag`),
  ADD UNIQUE KEY `tag_2` (`tag`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mail` (`email`),
  ADD UNIQUE KEY `username` (`userName`),
  ADD KEY `userGenderId` (`genderId`),
  ADD KEY `userOrientationId` (`orientationId`),
  ADD KEY `user_location` (`locationId`),
  ADD KEY `rank_user` (`rankId`);

--
-- Indexes for table `user_tag`
--
ALTER TABLE `user_tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tagId` (`tagId`,`userId`),
  ADD KEY `tagUserId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `block`
--
ALTER TABLE `block`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `consults`
--
ALTER TABLE `consults`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `gender`
--
ALTER TABLE `gender`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=248;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `match`
--
ALTER TABLE `match`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `rank`
--
ALTER TABLE `rank`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sexualOrientation`
--
ALTER TABLE `sexualOrientation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=994;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=280;

--
-- AUTO_INCREMENT for table `user_tag`
--
ALTER TABLE `user_tag`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=868;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `block`
--
ALTER TABLE `block`
  ADD CONSTRAINT `blocked_user` FOREIGN KEY (`blocked`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `blocker_user` FOREIGN KEY (`blocker`) REFERENCES `user` (`id`);

--
-- Constraints for table `consults`
--
ALTER TABLE `consults`
  ADD CONSTRAINT `consulted_user` FOREIGN KEY (`consulted`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `consulter_user` FOREIGN KEY (`consulter`) REFERENCES `user` (`id`);

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `imageUserId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `liked_user` FOREIGN KEY (`liked`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `liker_user` FOREIGN KEY (`liker`) REFERENCES `user` (`id`);

--
-- Constraints for table `match`
--
ALTER TABLE `match`
  ADD CONSTRAINT `matched_user` FOREIGN KEY (`matched`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `matcher_user` FOREIGN KEY (`matcher`) REFERENCES `user` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `FK_receiver` FOREIGN KEY (`receiver`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_sender` FOREIGN KEY (`sender`) REFERENCES `user` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notified_user` FOREIGN KEY (`notified`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_notifier_user` FOREIGN KEY (`notifier`) REFERENCES `user` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `rank_user` FOREIGN KEY (`rankId`) REFERENCES `rank` (`id`),
  ADD CONSTRAINT `user_location` FOREIGN KEY (`locationId`) REFERENCES `location` (`id`),
  ADD CONSTRAINT `userGenderId` FOREIGN KEY (`genderId`) REFERENCES `gender` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userOrientationId` FOREIGN KEY (`orientationId`) REFERENCES `sexualOrientation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_tag`
--
ALTER TABLE `user_tag`
  ADD CONSTRAINT `tagId` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tagUserId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
