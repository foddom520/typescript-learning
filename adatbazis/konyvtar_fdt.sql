-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2026. Már 05. 12:56
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `konyvtar_fdt`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kolto`
--

CREATE TABLE `kolto` (
  `koltoId` int(11) NOT NULL,
  `kolto_neve` varchar(255) NOT NULL,
  `kolto_szulev` int(11) NOT NULL,
  `mukak_sama` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `kolto`
--

INSERT INTO `kolto` (`koltoId`, `kolto_neve`, `kolto_szulev`, `mukak_sama`) VALUES
(1, 'Petőfi Sándor', 1823, 850),
(2, 'Arany János', 1817, 400),
(3, 'Ady Endre', 1877, 1000),
(4, 'József Attila', 1905, 600),
(5, 'Radnóti Miklós', 1909, 250),
(6, 'Babits Mihály', 1883, 350),
(7, 'Kosztolányi Dezső', 1885, 450),
(8, 'Pilinszky János', 1921, 150);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `konyvek`
--

CREATE TABLE `konyvek` (
  `konyv_Id` int(11) NOT NULL,
  `kolto_Id` int(11) NOT NULL,
  `konyv_cime` varchar(255) NOT NULL,
  `kidasi_datum` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `konyvek`
--

INSERT INTO `konyvek` (`konyv_Id`, `kolto_Id`, `konyv_cime`, `kidasi_datum`) VALUES
(1, 1, 'János Vitéz', 1845),
(2, 2, 'Toldi', 1847),
(3, 3, 'Új versek', 1906),
(4, 4, 'Nagyon fáj', 1936),
(5, 5, 'Tajtékos ég', 1946),
(6, 6, 'A danaidák', 1909),
(7, 7, 'A szegény kisgyermek panaszai', 1910),
(8, 8, 'Trapéz és korlát', 1946),
(9, 1, 'A helység kalapácsa', 1844);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `kolto`
--
ALTER TABLE `kolto`
  ADD PRIMARY KEY (`koltoId`);

--
-- A tábla indexei `konyvek`
--
ALTER TABLE `konyvek`
  ADD PRIMARY KEY (`konyv_Id`),
  ADD KEY `kolto-Id` (`kolto_Id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `kolto`
--
ALTER TABLE `kolto`
  MODIFY `koltoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `konyvek`
--
ALTER TABLE `konyvek`
  MODIFY `konyv_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `konyvek`
--
ALTER TABLE `konyvek`
  ADD CONSTRAINT `konyvek_ibfk_1` FOREIGN KEY (`kolto_Id`) REFERENCES `kolto` (`koltoId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
