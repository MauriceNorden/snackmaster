-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 03 jan 2025 om 21:35
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `snackmaster`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `catagory`
--

CREATE TABLE `catagory` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `catagory`
--

INSERT INTO `catagory` (`id`, `name`) VALUES
(1, 'Patat'),
(2, 'Diverse Kroketten'),
(3, 'Mini Snacks (6st.)'),
(4, 'Vegetarische Snacks'),
(5, 'Overige Snacks'),
(6, 'Broodjes'),
(7, 'Shoarma (inclusief saus)'),
(8, 'Schotels'),
(9, 'Overige'),
(10, 'Frisdrank'),
(11, 'Milkshake'),
(12, 'Sauzen'),
(13, 'Buckets');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `snack_id` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `snack`
--

CREATE TABLE `snack` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `catagory_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `snack`
--

INSERT INTO `snack` (`id`, `name`, `price`, `catagory_id`, `type_id`) VALUES
(1, 'Patat zonder', 2, 1, 2),
(2, 'Patat zonder', 4, 1, 3),
(3, 'Patat zonder', 3, 1, 4),
(4, 'Patat zonder', 4, 1, 5),
(5, 'Patat mayonaise', 3, 1, 2),
(6, 'Patat mayonaise', 4, 1, 3),
(7, 'Patat mayonaise', 3, 1, 4),
(8, 'Patat mayonaise', 5, 1, 5),
(9, 'Patat speciaal', 3, 1, 2),
(10, 'Patat speciaal', 5, 1, 3),
(11, 'Patat speciaal', 3, 1, 4),
(12, 'Patat speciaal', 5, 1, 5),
(13, 'Kroket', 2, 2, 2),
(14, 'Goulash kroket', 2, 2, 2),
(15, 'Saté kroket', 2, 2, 2),
(16, 'kalfskroket', 2, 2, 2);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `type`
--

CREATE TABLE `type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `type`
--

INSERT INTO `type` (`id`, `name`) VALUES
(1, 'Klein'),
(2, 'Normaal'),
(3, 'Groot'),
(4, 'Ras normaal'),
(5, 'Ras groot'),
(6, 'Kadet'),
(7, 'Pistolet');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `catagory`
--
ALTER TABLE `catagory`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `snack`
--
ALTER TABLE `snack`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `catagory`
--
ALTER TABLE `catagory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT voor een tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `snack`
--
ALTER TABLE `snack`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT voor een tabel `type`
--
ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
