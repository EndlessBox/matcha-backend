-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 192.168.99.101
-- Generation Time: Dec 09, 2020 at 01:29 PM
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

create database `matcha`;
use `matcha`;


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
(1, 262, 260, '2020-12-05 13:19:17'),
(3, 261, 260, '2020-12-05 13:21:16'),
(5, 263, 260, '2020-12-05 13:30:02');

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
(230, '1607513868980_leftBackground.jpg', 264, 0);

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
(17, 261, 260, '2020-12-05 11:57:21'),
(19, 262, 260, '2020-12-05 11:57:38');

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
(5, -6.89788, 32.8821, 0),
(6, -6.93476, 32.886, 0);

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
(870, '#12521'),
(493, '#20'),
(492, '#cf'),
(783, '#Damn'),
(491, '#ff'),
(107, '#FFFFF'),
(400, '#Hamza'),
(499, '#LIIILLL'),
(109, '#lol'),
(291, '#New_Tag'),
(327, '#New_Tag2'),
(106, '#XD'),
(108, '#XD2');

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
  `locationId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `userName`, `firstName`, `lastName`, `password`, `activationCode`, `expirationDate`, `active`, `refreshToken`, `resetPasswordToken`, `resetPasswordExpirationDate`, `genderId`, `orientationId`, `bio`, `locationId`) VALUES
(260, 'younes.bouladhane.dev@gmail.com', 'connectedUser', 'Skafandrii_Test', 'test1', '$2b$10$wbutPxWGgeV0lJhAK6iOUeXO6Yymj88yw9U/REgi7dsEloHD0k.Q6', '1f24a72783d05ba94f85f4cf889aa349d491ea3277730ade22d6553c121724c7e4e082ce9e7fceffe7f3430d3fc1148247139f1830ab4970856a607c96d3d0ed44a3fe15c94639f7d3a03b52449d06e1e1b4b98ac913ac960e7bf2179d6bfc2ba0ae1b0e8721417d42766e84bacb08202d6ca4b390425f8d60bee2438d3fe837', '2020-11-27 12:14:19', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImNvbm5lY3RlZFVzZXIiLCJpYXQiOjE2MDczMjg5OTYsImV4cCI6MTYwNzQxNTM5Nn0.YRLxkJZLWgukPt0XDJGYZuFraX1yapbrATUiB3CbWQw', NULL, NULL, 1, 1, 'Worsdfadfking', NULL),
(261, 'younes.bouladhane.d@gmail.com', 'test2', 'test2', 'test2', '$2b$10$8M4CiRvH8jClA36/6q.lOeU4yoR1ys8IMMrzeeuLWKYCq/PMVpBBi', '72cbe6c54ef4a98c0f80fd8204132112ce5567a0ffd62da6c1c0b25489a889502d7a0a861febf4f385c60ce17dc070d4262706910de9308b487ca49676aa4791235d9b8a449871f002521a3103c8638f75f09977a7f51d62b4275ec557e73c64b23743a1f5d12ecbc41eb134af308ac970e0cd0d19a9cacf1ff5a334066366bb', '2020-12-05 14:06:18', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QyIiwiaWF0IjoxNjA3NTAyNjg2LCJleHAiOjE2MDc1ODkwODZ9.Xfo5yZkjr-hR7Uds000sZ3GSnXjf_83Y4Q55M-aI2uk', NULL, NULL, 1, 1, NULL, NULL),
(262, 'younes.bouladhafne.dg@mail.com', 'test3', 'test3', 'test3', '$2b$10$UBLEVgvl2RszrjFs.T7rDOYCzPlEkEF57tQAazkjXNPUYFohhnW76', 'fc5ff24371f2a4538b223d680da3cdbd5d2774a617ad5df25389d51b8f713c0ff40af1d4cfcc5fe2d2c9480c06d015279bf5e96f44d0ba837f0ab8098b78ed48381b633d6d64a7f35774d38c7fee164561eb9dceab1aab4a430b6ff9f051a05ce1b6e329047193841900d069e8fa2e621b3abca88728443d3ff40c34e52fe23e', '2020-12-06 11:54:28', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QzIiwiaWF0IjoxNjA3MTcwNzQwLCJleHAiOjE2MDcyNTcxNDB9.jvXCR2xTgxot3VdOFkv74g_YGo56GN9xxBk4N3fxlzQ', NULL, NULL, 1, 3, NULL, NULL),
(263, 'younouladhafne.dg@mail.com', 'test4', 'test4', 'test4', '$2b$10$vCold6qJSlwf0IJHJp8/SeAZdjNU.lyrPEJRqRMUjM7FXGOLFKLme', 'cf2b1cd80eb03bcaa27530ac572fc9c0e42edac083d880a0b53f2e7c5c02143541e995174d7be2f34c3aa50274e0d320ef7be4a98e6e02cb0b615b62ceb8263edb066c9690507dba051695b5b229312f9f2e0794d9242c6e653898625db095dd51121e65d2868a0a33b1ac5caf2e870e40298f5fa4ba371631431ede99e558d8', '2020-12-06 11:54:40', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3Q0IiwiaWF0IjoxNjA3MTcxNDE0LCJleHAiOjE2MDcyNTc4MTR9.L-lvkS0CYRcJDgupO_1f_G3mKsxLDJVY78nesovBc2k', NULL, NULL, 2, 2, NULL, NULL),
(264, 'younouladhsafne.dg@mail.com', 'test5', 'test5', 'test4', '$2b$10$zmKebqEZZmCc0yA7po0z1.zVUWUGaYGeE2YAlHx4YeQVHun0kjizS', '69e8edbc5b450b079f0905cc71b6441e28033e9a79ed90a4bb01ed768d8b92074da18cd4a740b4126c621625537a60ac8012b6d7d468f40653f3212515778dcbeda342d887176ab259b7daf11a0df6920900508fb9066c4ef1459b0e7148d86b1de40011ae2fff8afafeffc4247cf5362aca14d5c6fd2061deaae4a09d6bce63', '2020-12-10 12:36:23', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3Q1IiwiaWF0IjoxNjA3NTEzODQ4LCJleHAiOjE2MDc2MDAyNDh9.dqI4u_czxrlDQYR6x16Vh-i2umUXzDfIqoZ83zSjlT8', NULL, NULL, 1, 1, NULL, NULL);

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
(732, 783, 260),
(746, 783, 264),
(738, 870, 261),
(745, 870, 264);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `consults`
--
ALTER TABLE `consults`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniqueConsulter_Consulted` (`consulter`,`consulted`),
  ADD KEY `consulted_user` (`consulted`);

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
  ADD KEY `user_location` (`locationId`);

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
-- AUTO_INCREMENT for table `consults`
--
ALTER TABLE `consults`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `gender`
--
ALTER TABLE `gender`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=903;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=265;

--
-- AUTO_INCREMENT for table `user_tag`
--
ALTER TABLE `user_tag`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=771;

--
-- Constraints for dumped tables
--

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
-- Constraints for table `user`
--
ALTER TABLE `user`
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
