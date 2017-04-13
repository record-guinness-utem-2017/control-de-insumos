-- MySQL dump 10.13  Distrib 5.7.17, for osx10.12 (x86_64)
--
-- Host: localhost    Database: control_de_insumos
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `mesas`
--

DROP TABLE IF EXISTS `mesas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mesas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesas`
--

LOCK TABLES `mesas` WRITE;
/*!40000 ALTER TABLE `mesas` DISABLE KEYS */;
INSERT INTO `mesas` VALUES (1,'1A'),(2,'1B'),(3,'2A'),(4,'2B'),(5,'3A'),(6,'3B'),(7,'4A'),(8,'4B'),(9,'5A'),(10,'5B'),(11,'6A'),(12,'6B'),(13,'7A'),(14,'7B'),(15,'8A'),(16,'8B'),(17,'9A'),(18,'9B'),(19,'10A'),(20,'10B'),(21,'11A'),(22,'11B'),(23,'12A'),(24,'12B'),(25,'13A'),(26,'13B'),(27,'14A'),(28,'14B'),(29,'15A'),(30,'15B'),(31,'16A'),(32,'16B'),(33,'17A'),(34,'17B'),(35,'18A'),(36,'18B'),(37,'19A'),(38,'19B'),(39,'20A'),(40,'20B'),(41,'21A'),(42,'21B');
/*!40000 ALTER TABLE `mesas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesas_encargados`
--

DROP TABLE IF EXISTS `mesas_encargados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mesas_encargados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `encargado_id` int(11) DEFAULT NULL,
  `mesa_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesas_encargados`
--

LOCK TABLES `mesas_encargados` WRITE;
/*!40000 ALTER TABLE `mesas_encargados` DISABLE KEYS */;
INSERT INTO `mesas_encargados` VALUES (1,2289,1),(2,2470,1),(3,2289,2),(4,2470,2),(5,2289,3),(6,2470,3),(7,2289,4),(8,2470,4),(9,2289,5),(10,2470,5),(11,2289,6),(12,2470,6),(13,2139,7),(14,2138,7),(15,2139,8),(16,2138,8),(17,2139,9),(18,2138,9),(19,2139,10),(20,2138,10),(21,2139,11),(22,2138,11),(23,2139,12),(24,2138,12),(25,2538,13),(26,3341,13),(27,2538,14),(28,3341,14),(29,2538,15),(30,3341,15),(31,2538,16),(32,3341,16),(33,2198,17),(34,2386,17),(35,2198,18),(36,2386,18),(37,2198,19),(38,2386,19),(39,2198,20),(40,2386,20),(41,2190,21),(42,3560,21),(43,2190,22),(44,3560,22),(45,2190,23),(46,3560,23),(47,2190,24),(48,3560,24),(49,2191,25),(50,2166,25),(51,2191,26),(52,2166,26),(53,2191,27),(54,2166,27),(55,2191,28),(56,2166,28),(57,2129,29),(58,2437,29),(59,2129,30),(60,2437,30),(61,2129,31),(62,2437,31),(63,2129,32),(64,2437,32),(65,2408,33),(66,2155,33),(67,2408,34),(68,2155,34),(69,2408,35),(70,2155,35),(71,2408,36),(72,2155,36),(73,2186,37),(74,2133,37),(75,2186,38),(76,2133,38),(77,2186,39),(78,2133,39),(79,2186,40),(80,2133,40),(81,2408,41),(82,2155,41),(83,2408,42),(84,2155,42);
/*!40000 ALTER TABLE `mesas_encargados` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-13  0:57:34
