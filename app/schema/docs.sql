/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50612
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50612
File Encoding         : 65001

Date: 2015-07-23 17:43:47
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `doc_comments`
-- ----------------------------
DROP TABLE IF EXISTS `doc_comments`;
CREATE TABLE `doc_comments` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DocumentationId` int(11) DEFAULT NULL,
  `comment` varchar(200) NOT NULL,
  `commentDate` datetime DEFAULT NULL,
  `commentedBy` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`,`comment`),
  KEY `fk_DocumentationId_idx` (`DocumentationId`),
  CONSTRAINT `fk_DocumentationId` FOREIGN KEY (`DocumentationId`) REFERENCES `documentation` (`DocumentationId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for `documentation`
-- ----------------------------
DROP TABLE IF EXISTS `documentation`;
CREATE TABLE `documentation` (
  `DocumentationId` int(11) NOT NULL AUTO_INCREMENT,
  `DocumentType` varchar(45) DEFAULT NULL,
  `DocumentName` varchar(45) DEFAULT NULL,
  `documentAvailability` tinyint(4) DEFAULT NULL,
  `documentRelativePath` varchar(100) DEFAULT NULL,
  `documentUploadDate` date DEFAULT NULL,
  `documentUploadedBy` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`DocumentationId`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

