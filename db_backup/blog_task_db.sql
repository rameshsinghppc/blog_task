-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 09, 2024 at 02:34 AM
-- Server version: 8.0.35-0ubuntu0.20.04.1
-- PHP Version: 7.4.3-4ubuntu2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog_task_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `article_heading` varchar(300) NOT NULL,
  `article_description` varchar(2000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`id`, `user_id`, `article_heading`, `article_description`, `created_at`) VALUES
(1, 1, 'test heading', 'test desc', '2024-01-08 20:37:18'),
(2, 1, 'test heading2', 'test desc', '2024-01-08 20:37:39'),
(3, 1, 'test heading3', 'test desc', '2024-01-08 20:37:40'),
(4, 1, 'test heading4', 'test desc', '2024-01-08 20:37:41'),
(5, 1, 'test heading4', 'test desc', '2024-01-08 20:37:42'),
(6, 2, 'test5 heading', 'test5 desc', '2024-01-08 20:41:34'),
(7, 2, 'test6 heading', 'test5 desc', '2024-01-08 20:43:11'),
(9, 2, 'test8rrrrrrrrrr headingrrrrrrr', 'test5 descrrrrrrrrrr', '2024-01-08 20:43:19');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fname`, `lname`, `email`, `password`, `created_at`) VALUES
(1, 'Test fname', 'Test lname', 'ramtest@mail.com', '$2b$10$9nEsRVQpcGtdNMVbbd3Ueu33IDq.ogqPqHRdCiS2w5ogco9PdcT8i', '2024-01-08 19:47:40'),
(2, 'Test2 fname', 'Test2 lname', 'ramtest2@mail.com', '$2b$10$1421hw40xMgZrKdjOb6tF.yiEYUQ3SW/uqCJlrVG1eSyp.xXvwY0G', '2024-01-08 19:59:27'),
(3, 'Test3 fname', 'Test3 lname', 'ramtest3@mail.com', '$2b$10$QUh9kdb.0z4/LmP3Qx9qXOsJW.TuSFmjsIoEnI4dOSMBn6LeNtuXm', '2024-01-08 20:27:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_FK_1` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `article_FK_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
