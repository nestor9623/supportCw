-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-05-2017 a las 01:14:20
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad`
--

CREATE TABLE `actividad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `idIntegrante` int(11) NOT NULL,
  `idProyecto` int(11) NOT NULL,
  `inicio` date NOT NULL,
  `fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `actividad`
--

INSERT INTO `actividad` (`id`, `nombre`, `descripcion`, `idIntegrante`, `idProyecto`, `inicio`, `fin`) VALUES
(3, 'a1', 'a2asasa', 2, 14, '2018-02-06', '2016-12-30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

CREATE TABLE `cargo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `horario` varchar(40) NOT NULL,
  `salario` double NOT NULL,
  `proyectoId` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cargo`
--

INSERT INTO `cargo` (`id`, `nombre`, `descripcion`, `horario`, `salario`, `proyectoId`, `usuarioId`) VALUES
(4, 'secretaria', 'sdjsa', 'jueves', 5342342, 15, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `integrante_proyecto`
--

CREATE TABLE `integrante_proyecto` (
  `id` int(11) NOT NULL,
  `idProyecto` int(11) NOT NULL,
  `idIntegrante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `integrante_proyecto`
--

INSERT INTO `integrante_proyecto` (`id`, `idProyecto`, `idIntegrante`) VALUES
(2, 14, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `inicio` date NOT NULL,
  `fin` date NOT NULL,
  `etapa` varchar(100) NOT NULL,
  `usuarioId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`id`, `nombre`, `inicio`, `fin`, `etapa`, `usuarioId`) VALUES
(9, 'pr', '2018-01-01', '2017-01-01', '0%-25%', 1),
(10, 'pryo', '2019-02-01', '2019-02-20', '75%-100%', 1),
(14, 'proyect2', '2017-01-01', '2017-01-01', '25%-50%', 2),
(15, 'web', '2017-05-31', '2017-05-01', '0%-25%', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `id` int(11) NOT NULL,
  `tipodocumento` varchar(50) NOT NULL,
  `numero` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `tipouser` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `repeatpassword` varchar(50) NOT NULL,
  `fechanacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`id`, `tipodocumento`, `numero`, `nombre`, `apellido`, `tipouser`, `email`, `password`, `repeatpassword`, `fechanacimiento`) VALUES
(1, 'Cedula de ciudadania', '112', 'as', 'as', 'Administrador', 'tetolaf@gmail.com', 'teto', 'teto', '2017-01-01'),
(2, 'Cedula de ciudadania', '2', 'klj', 'kj', 'Administrador', 'a@gmail.com', 'a', 'a', '2017-01-01'),
(3, 'Cedula de ciudadania', '1053', 'johnny', 'salazar', 'Administrador', 'johnny9052@hotmail.com', '123', '123', '2017-05-09'),
(4, 'Cedula de ciudadania', '12345', 'johnny 2', 'salazar 2', 'Administrador', 'alexander9052@gmail.com', '123', '123', '2017-05-11'),
(5, 'Cedula de ciudadania', '1097402606', 'Anderson Mauricio', 'Hoyos Diaz', 'Integrante', 'hoyuelo825@hotmail.com', '123', '123', '2016-12-31'),
(6, 'Cedula de ciudadania', '1', 'b', 'b', 'Integrante', 'b@gmail.com', 'b', 'b', '2016-12-31');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `fk_integrante` (`idIntegrante`),
  ADD KEY `fk_proyecto` (`idProyecto`);

--
-- Indices de la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_proyecto_id` (`proyectoId`),
  ADD KEY `fk_cargo_usuario` (`usuarioId`);

--
-- Indices de la tabla `integrante_proyecto`
--
ALTER TABLE `integrante_proyecto`
  ADD PRIMARY KEY (`id`,`idProyecto`,`idIntegrante`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `fk_proyecto_usuario` (`usuarioId`);

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividad`
--
ALTER TABLE `actividad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `integrante_proyecto`
--
ALTER TABLE `integrante_proyecto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD CONSTRAINT `fk_integrante` FOREIGN KEY (`idIntegrante`) REFERENCES `integrante_proyecto` (`id`),
  ADD CONSTRAINT `fk_proyecto` FOREIGN KEY (`idProyecto`) REFERENCES `proyecto` (`id`);

--
-- Filtros para la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD CONSTRAINT `fk_cargo_usuario` FOREIGN KEY (`usuarioId`) REFERENCES `registro` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_proyecto_id` FOREIGN KEY (`proyectoId`) REFERENCES `proyecto` (`id`);

--
-- Filtros para la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD CONSTRAINT `fk_proyecto_usuario` FOREIGN KEY (`usuarioId`) REFERENCES `registro` (`id`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
