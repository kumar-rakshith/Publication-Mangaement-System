-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2025 at 11:07 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('reviewer1','reviewer2','reviewer3','principal','director') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `username`, `password`, `role`) VALUES
(1, 'admin1', '$2a$10$2IhZ4rj59F3.EiNYDF0DBuXTjtJ2vFBvxWpl9UwmL4UPVErBdxsLa', 'reviewer1'),
(2, 'reviewer2_user', '$2a$10$lLSnE3ydcIrIa.mWJdN4ruzdIgJ8JAlGX1G2XeDQ0f2kfTFfshErS', 'reviewer2'),
(3, 'reviewer3_user', '$2a$10$JEYPf3CuAN9fP5i2pbumJ.xYH66yjwO795aofL5FJCmE15htUS5Re', 'reviewer3'),
(4, 'principal_user', '$2a$10$1aPhjwJEh.ESgU5Iq7Mk/OoLVMYnoKAE1iobAX/pNFgk6GRzUUs8K', 'principal'),
(5, 'director_user', '$2a$10$Uip0JEL9oEoenh2WlASQIuKqknDlpPKGCF8OlZZx93WeORLhfH1Zy', 'director');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `workflow_id` int(11) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `comment` text NOT NULL,
  `commented_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `name`) VALUES
(1, 'AI & ML'),
(2, 'Civil'),
(3, 'Computer Science'),
(4, 'Computer Science & Engineering (Data Science)'),
(5, 'Computer Science and Business Systems'),
(6, 'Electrical & Electronics'),
(7, 'Electronics & Communication'),
(8, 'Humanities Department');

-- --------------------------------------------------------

--
-- Table structure for table `publications`
--

CREATE TABLE `publications` (
  `publication_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `co_authors` varchar(255) DEFAULT NULL,
  `publication_type` enum('National','International','Journal','Conference Proceedings','Other') NOT NULL,
  `conference_name` varchar(255) DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `fee` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publications`
--

INSERT INTO `publications` (`publication_id`, `user_id`, `department_id`, `title`, `author_name`, `co_authors`, `publication_type`, `conference_name`, `publication_date`, `fee`, `description`, `file_path`, `status`, `created_at`) VALUES
(1, 1, 1, 'test', 'test', 'test', 'National', 'test', '2002-10-23', 2002.00, NULL, 'uploads/1731771111859.jpg', 'pending', '2024-11-16 15:31:51'),
(16, 1, 1, 'test', 'test', 'test', 'National', 'test', '2025-03-24', 233.00, NULL, 'uploads\\1742882758257.pdf', 'pending', '2025-03-25 06:05:58'),
(17, 6, 4, 'testee', 'testee', 'testee', 'National', 'testee', '2025-03-25', 234.00, NULL, 'uploads\\1742904562261.pdf', 'pending', '2025-03-25 12:09:22'),
(18, 1, 1, 'test', 'test123', 'test', 'National', 'test', '2025-03-25', 300.00, NULL, 'uploads\\1742918220408.pdf', 'pending', '2025-03-25 15:57:00'),
(19, 1, 1, 'ai in earth', 'rakshith', 'none', 'National', 'test', '2025-03-25', 233.00, NULL, 'uploads\\1742921143991.pdf', 'pending', '2025-03-25 16:45:44');

--
-- Triggers `publications`
--
DELIMITER $$
CREATE TRIGGER `after_publication_insert` AFTER INSERT ON `publications` FOR EACH ROW BEGIN
    INSERT INTO reviewerworkflow (
        publication_id,
        reviewer1_status,
        reviewer2_status,
        reviewer3_status,
        principal_status,
        director_status
    )
    VALUES (
        NEW.publication_id,
        'pending',  -- Default status for reviewer1
        'pending',  -- Default status for reviewer2
        'pending',  -- Default status for reviewer3
        'pending',  -- Default status for principal
        'pending'   -- Default status for director
    );
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `publicationworkflows`
--

CREATE TABLE `publicationworkflows` (
  `workflow_id` int(11) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `role` enum('reviewer1','reviewer2','reviewer3','principal','director') NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `reviewed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviewerworkflow`
--

CREATE TABLE `reviewerworkflow` (
  `id` int(11) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `reviewer1_status` varchar(20) DEFAULT 'pending',
  `reviewer2_status` varchar(20) DEFAULT 'pending',
  `reviewer3_status` varchar(20) DEFAULT 'pending',
  `principal_status` varchar(20) DEFAULT 'pending',
  `director_status` varchar(20) DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviewerworkflow`
--

INSERT INTO `reviewerworkflow` (`id`, `publication_id`, `reviewer1_status`, `reviewer2_status`, `reviewer3_status`, `principal_status`, `director_status`) VALUES
(1, 16, 'Approve', 'Reject', 'pending', 'pending', 'pending'),
(2, 17, 'Approve', 'Approve', 'pending', 'pending', 'pending'),
(3, 18, 'Approve', 'Approve', 'pending', 'pending', 'pending'),
(4, 19, 'pending', 'pending', 'pending', 'pending', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `approved_by` varchar(255) DEFAULT NULL,
  `approval_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `recommended_fee` decimal(10,2) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `publication_id`, `status`, `approved_by`, `approval_date`, `recommended_fee`, `comment`, `role`) VALUES
(17, 1, '', 'admin1', '2025-03-25 02:22:06', 23.00, 'sdd', 'reviewer1'),
(18, 16, '', 'admin1', '2025-03-25 11:18:05', 23.00, 'best', 'reviewer1'),
(19, 16, '', 'reviewer2_user', '2025-03-25 11:19:14', 23.00, 'test', 'reviewer2'),
(22, 17, '', 'reviewer2_user', '2025-03-25 15:54:30', 23.00, 'rdd', 'reviewer2'),
(23, 18, '', 'admin1', '2025-03-25 15:58:07', 500.00, 'this is best ', 'reviewer1'),
(24, 18, '', 'reviewer2_user', '2025-03-25 16:00:42', 300.00, 'test', 'reviewer2');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `department_id`, `username`, `password`) VALUES
(1, 1, 'test', '$2a$10$PtwGjzYUmkNiFYa6xz3Okuy1/mvgwaptGG2eJWYY0JiUbk.BKgy1e'),
(2, 1, 'test1', '$2a$10$DIai49mURLz74x94hoOMZuSZRd6yhS032apIykrxBAk1U7C6FsFhS'),
(3, 1, 'user_cs', '$2a$10$PG4iLCixrb41/OV2lhuu8.dD7P2YQq9Wa6F3gC9lTZ6K/cC3wf8cG'),
(4, 2, 'user_ds', '$2a$10$kRFslt.qJ7QoaeLs8NVnJODuJv5MjgkrS0DAUxpBFxW9QFUxyTX46'),
(5, 2, 'user_csb', '$2a$10$73aWL.txdNMPMPvVui9dReI5wSDzGf172gqDME.MKceBhHPCN06.e'),
(6, 4, 'user_ee', '$2a$10$NJo03YkHYw6hlyepNyXNsej9IeDuW28NH3pbX7yuqmeY74y4cIdQu'),
(7, 2, 'user_ec', '$2a$10$DMurp6DK1dFlzxAJrgnbEu1IuBgjtEyfd3GSKACOuw35VCn8ynGty'),
(8, 1, 'user_hum', '$2a$10$jZr458A/23dRFRKmlyftMewjriyCDUIn4BOfxjG8JOPcv/c./9aKm');

-- --------------------------------------------------------

--
-- Table structure for table `verifiedpublications`
--

CREATE TABLE `verifiedpublications` (
  `verified_id` int(11) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `verified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `workflow_id` (`workflow_id`),
  ADD KEY `publication_id` (`publication_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`publication_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `publicationworkflows`
--
ALTER TABLE `publicationworkflows`
  ADD PRIMARY KEY (`workflow_id`),
  ADD KEY `publication_id` (`publication_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `reviewerworkflow`
--
ALTER TABLE `reviewerworkflow`
  ADD PRIMARY KEY (`id`),
  ADD KEY `publication_id` (`publication_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `publication_id` (`publication_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `verifiedpublications`
--
ALTER TABLE `verifiedpublications`
  ADD PRIMARY KEY (`verified_id`),
  ADD KEY `publication_id` (`publication_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `publications`
--
ALTER TABLE `publications`
  MODIFY `publication_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `publicationworkflows`
--
ALTER TABLE `publicationworkflows`
  MODIFY `workflow_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviewerworkflow`
--
ALTER TABLE `reviewerworkflow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `verifiedpublications`
--
ALTER TABLE `verifiedpublications`
  MODIFY `verified_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`workflow_id`) REFERENCES `publicationworkflows` (`workflow_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`) ON DELETE SET NULL;

--
-- Constraints for table `publications`
--
ALTER TABLE `publications`
  ADD CONSTRAINT `publications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `publications_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE CASCADE;

--
-- Constraints for table `publicationworkflows`
--
ALTER TABLE `publicationworkflows`
  ADD CONSTRAINT `publicationworkflows_ibfk_1` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `publicationworkflows_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`) ON DELETE SET NULL;

--
-- Constraints for table `reviewerworkflow`
--
ALTER TABLE `reviewerworkflow`
  ADD CONSTRAINT `reviewerworkflow_ibfk_1` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL;

--
-- Constraints for table `verifiedpublications`
--
ALTER TABLE `verifiedpublications`
  ADD CONSTRAINT `verifiedpublications_ibfk_1` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
