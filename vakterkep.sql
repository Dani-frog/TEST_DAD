-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 29. 07:57
-- Kiszolgáló verziója: 10.4.20-MariaDB
-- PHP verzió: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `vakterkep`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `eredmenyek`
--

CREATE TABLE `eredmenyek` (
  `id` int(11) NOT NULL,
  `felhasznaloid` int(11) NOT NULL,
  `elertpont` int(11) DEFAULT NULL,
  `ido` int(11) DEFAULT NULL,
  `nehezseg` varchar(10) COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `jelszo` varchar(1000) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`id`, `nev`, `jelszo`, `email`, `admin`) VALUES
(36, 'ember1', 'd8a928b2043db77e340b523547bf16cb4aa483f0645fe0a290ed1f20aab76257', 'ember1@gmail.com', 1),
(37, 'ember2', 'd8a928b2043db77e340b523547bf16cb4aa483f0645fe0a290ed1f20aab76257', 'ember2@gmail.com', 0),
(38, 'segges', 'd8a928b2043db77e340b523547bf16cb4aa483f0645fe0a290ed1f20aab76257', 'aaa1@gmail.com', 0),
(39, 'faszos', 'd8a928b2043db77e340b523547bf16cb4aa483f0645fe0a290ed1f20aab76257', 'aaa2@gmail.com', 0),
(40, 'picsas', 'd8a928b2043db77e340b523547bf16cb4aa483f0645fe0a290ed1f20aab76257', 'aaa3@gmail.com', 0),
(41, 'puncis', 'd8a928b2043db77e340b523547bf16cb4aa483f0645fe0a290ed1f20aab76257', 'aaa4@gmail.com', 0),
(42, 'golyszlis', 'd8a928b2043db77e340b523547bf16cb4aa483f0645fe0a290ed1f20aab76257', 'aaa5@gmail.com', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `terkep`
--

CREATE TABLE `terkep` (
  `id` int(11) NOT NULL,
  `kerdes` varchar(1000) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `nehezseg` varchar(10) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `xy` varchar(10) COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `terkep`
--

INSERT INTO `terkep` (`id`, `kerdes`, `nehezseg`, `xy`) VALUES
(8, 'Hol halt meg II. Lajos 1526-ban?', 'Könnyű', '295;335.35'),
(9, 'Hol kötöttek békét 1711-ben a Rákoczi felkelők?', 'Könnyű', '577;176.35'),
(10, 'Hol történt csata 907-ben a pogány magyarok és az európai keresztények között?', 'Könnyű', '205;136.35'),
(11, 'Melyik híres várunkat foglalta el az Oszmán birodalom 1541-ben csellel? ', 'Könnyű', '326;187.35'),
(12, 'Hol találkozott 3 király 1335-ben?', 'Könnyű', '317;172.35'),
(13, 'Hol csatázott 1241-ben IV. Béla király a mongolokkal?', 'Könnyű', '426;150.35'),
(14, 'Hol van az a vár, melynek ostroma közben halt meg I. Szulejmán szultán?', 'Közepes', '229;320.35'),
(15, 'Hol tűnt el Petőfi Sándor?', 'Nehéz', '725;339'),
(16, 'Melyik város volt az Erdélyi fejedelmség fővárosa 1570 és 1692 között?', 'Nehéz', '645;351'),
(17, 'Az Osztrák-Magyar-Monarchia részeként melyik volt magyarország legjelentősebb kikötővárosa?', 'Nehéz', '12;370'),
(18, 'Hova építettet egyetemet I. Nagy Lajos király 1367-ben?', 'Nehéz', '256;327.65'),
(19, 'Hol tartotta fogva Mátyás király Drakula grófot?', 'Nehéz', '314;172.65');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `eredmenyek`
--
ALTER TABLE `eredmenyek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznaloid` (`felhasznaloid`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `terkep`
--
ALTER TABLE `terkep`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT a táblához `terkep`
--
ALTER TABLE `terkep`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `eredmenyek`
--
ALTER TABLE `eredmenyek`
  ADD CONSTRAINT `eredmenyek_ibfk_1` FOREIGN KEY (`felhasznaloid`) REFERENCES `felhasznalo` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
