/*
 Navicat Premium Data Transfer

 Source Server         : staging
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : staging-12301.mysql.rds.aliyuncs.com
 Source Database       : med

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : utf-8

 Date: 04/03/2020 08:43:47 AM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `department`
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

CREATE TABLE OFFICE_LOCATE(
DEP_ID INTEGER,
ROOM_NUM INTEGER,
TYP VARCHAR(20),
SIZ VARCHAR(20),
PRIMARY KEY (DEP_ID, ROOM_NUM),
FOREIGN KEY (DEP_ID) REFERENCES DEPARTMENT (ID) ON DELETE CASCADE
)

-- ----------------------------
--  Records of `department`
-- ----------------------------
BEGIN;
INSERT INTO `department` VALUES ('1', 'out-patient', 'for out'), ('2', 'in-patient', 'for in'), ('3', 'surgery', 'for surgery'), ('4', 'E.N.T', 'for ENT'), ('5', 'orthopedic', 'for orthopedic'), ('6', 'urology', 'for urology');
COMMIT;

-- ----------------------------
--  Table structure for `effect_type`
-- ----------------------------
DROP TABLE IF EXISTS `effect_type`;
CREATE TABLE `effect_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `effect_type`
-- ----------------------------
BEGIN;
INSERT INTO `effect_type` VALUES ('1', 'dead', '1'), ('2', 'serious pain', '2'), ('3', 'little pain', '3'), ('4', 'high fever', '2'), ('5', 'lettle fever', '3'), ('6', 'serious lax', '2'), ('7', 'little lax', '3');
COMMIT;

-- ----------------------------
--  Table structure for `employee`
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `department_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`) USING BTREE,
  KEY `department_id` (`department_id`),
  CONSTRAINT `epartment_id` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `employee`
-- ----------------------------
BEGIN;
INSERT INTO `employee` VALUES ('2', 'jack15', '12345678', '12345', '123456', '5'), ('4', 'e4', '1234', 'xxxx', '1111', '1'), ('5', 'e8', '10005', 'xxxx', '123', '1'), ('7', 'e8', '10006', '1234', '12345678', '1');
COMMIT;

-- ----------------------------
--  Table structure for `manager`
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `manager`
-- ----------------------------
BEGIN;
INSERT INTO `manager` VALUES ('1', 'admin', 'admin');
COMMIT;

-- ----------------------------
--  Table structure for `manager_log`
-- ----------------------------
DROP TABLE IF EXISTS `manager_log`;
CREATE TABLE `manager_log` (
  `id` int(11) DEFAULT NULL,
  `manager_id` int(11) NOT NULL,
  `info` varchar(100) NOT NULL,
  KEY `manager_id` (`manager_id`),
  CONSTRAINT `m_id` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `manager_log`
-- ----------------------------
BEGIN;
INSERT INTO `manager_log` VALUES (null, '1', '{\"type\":\"add employee\",\"time\":\"2020-04-02T08:07:13.870Z\"}'), (null, '1', '{\"type\":\"update employee\",\"time\":\"2020-04-02T08:08:08.383Z\",\"employee\":\"5\"}'), (null, '1', '{\"type\":\"update employee\",\"time\":\"2020-04-02T08:08:43.522Z\",\"employee\":\"5\"}'), (null, '1', '{\"type\":\"update employee\",\"time\":\"2020-04-02T08:08:53.990Z\",\"employee\":\"5\"}'), (null, '1', '{\"type\":\"login\",\"time\":\"2020-04-02T08:11:47.752Z\"}'), (null, '1', '{\"type\":\"update employee\",\"time\":\"2020-04-02T08:12:05.191Z\",\"employee\":\"5\"}'), (null, '1', '{\"type\":\"login\",\"time\":\"2020-04-02T08:15:34.485Z\"}'), (null, '1', '{\"type\":\"login\",\"time\":\"2020-04-02T08:16:10.954Z\"}'), (null, '1', '{\"type\":\"update employee\",\"time\":\"2020-04-02T08:16:23.143Z\",\"employee\":\"2\"}'), (null, '1', '{\"type\":\"update employee\",\"time\":\"2020-04-02T08:17:25.736Z\",\"employee\":\"2\"}'), (null, '1', '{\"type\":\"update employee\",\"time\":\"2020-04-02T08:17:45.947Z\",\"employee\":\"2\"}'), (null, '1', '{\"type\":\"update employee\",\"time\":\"2020-04-02T08:22:38.971Z\",\"employee\":\"2\"}'), (null, '1', '{\"type\":\"update employee\",\"time\":\"2020-04-02T08:23:02.408Z\",\"employee\":\"2\"}'), (null, '1', '{\"type\":\"login\",\"time\":\"2020-04-02T08:30:53.209Z\"}'), (null, '1', '{\"type\":\"update employee\",\"time\":\"2020-04-02T08:31:05.815Z\",\"employee\":\"2\"}'), (null, '1', '{\"type\":\"update employee\",\"time\":\"2020-04-02T08:31:09.501Z\",\"employee\":\"2\"}'), (null, '1', '{\"type\":\"update employee\",\"time\":\"2020-04-02T08:31:14.098Z\",\"employee\":\"2\"}'), (null, '1', '{\"type\":\"update employee\",\"time\":\"2020-04-02T08:31:21.860Z\",\"employee\":\"2\"}'), (null, '1', '{\"type\":\"add employee\",\"time\":\"2020-04-02T08:31:38.834Z\"}'), (null, '1', '{\"type\":\"login\",\"time\":\"2020-04-02T08:39:21.637Z\"}'), (null, '1', '{\"type\":\"login\",\"time\":\"2020-04-02T08:39:55.071Z\"}'), (null, '1', '{\"type\":\"update employee\",\"time\":\"2020-04-02T08:40:07.903Z\",\"employee\":\"2\"}'), (null, '1', '{\"type\":\"delete employee\",\"time\":\"2020-04-02T08:40:21.296Z\",\"employee\":\"6\"}'), (null, '1', '{\"type\":\"add employee\",\"time\":\"2020-04-02T08:40:43.396Z\"}');
COMMIT;

-- ----------------------------
--  Table structure for `manufacturer`
-- ----------------------------
DROP TABLE IF EXISTS `manufacturer`;
CREATE TABLE `manufacturer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `manu_name` varchar(20) NOT NULL,
  `head_office` varchar(20) NOT NULL,
  `ceo` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MANU_NAME` (`manu_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `manufacturer`
-- ----------------------------
BEGIN;
INSERT INTO `manufacturer` VALUES ('1', 'SSA', 'Head Office SSA', 'CEO SSA'), ('2', 'GENOM', 'Head Office GENOM', 'CEO GENOM');
COMMIT;

-- ----------------------------
--  Table structure for `participant_enroll`
-- ----------------------------
DROP TABLE IF EXISTS `participant_enroll`;
CREATE TABLE `participant_enroll` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `age` int(11) NOT NULL,
  `med_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `med_id` (`med_id`),
  CONSTRAINT `empId` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `medId` FOREIGN KEY (`med_id`) REFERENCES `protocol_medication_assessment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `participant_enroll`
-- ----------------------------
BEGIN;
INSERT INTO `participant_enroll` VALUES ('1', '12', '1', 'p1', '2'), ('2', '12', '1', 'p2', '2'), ('3', '12', '2', 'p3', '2'), ('4', '12', '1', 'p4', '2'), ('5', '16', '1', 'p5', '2'), ('6', '12', '2', 'p7', '2');
COMMIT;

-- ----------------------------
--  Table structure for `protocol_medication_assessment`
-- ----------------------------
DROP TABLE IF EXISTS `protocol_medication_assessment`;
CREATE TABLE `protocol_medication_assessment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `proto` varchar(20) NOT NULL,
  `manufacturer_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `protocol_medication_assessment`
-- ----------------------------
BEGIN;
INSERT INTO `protocol_medication_assessment` VALUES ('1', 'med_1', 'for flue', '1'), ('2', 'med_2', 'for COVID-19', '2');
COMMIT;

-- ----------------------------
--  Table structure for `side_effect_report`
-- ----------------------------
DROP TABLE IF EXISTS `side_effect_report`;
CREATE TABLE `side_effect_report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `symptom` varchar(100) NOT NULL,
  `part_id` int(11) NOT NULL,
  `effect_type` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `part_id` (`part_id`),
  KEY `effect_type` (`effect_type`),
  CONSTRAINT `effect` FOREIGN KEY (`effect_type`) REFERENCES `effect_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `part_id` FOREIGN KEY (`part_id`) REFERENCES `participant_enroll` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `side_effect_report`
-- ----------------------------
BEGIN;
INSERT INTO `side_effect_report` VALUES ('1', 'xxxxx', '1', '1'), ('2', 'xxx', '3', '1'), ('3', 'xxxx', '6', '1'), ('4', 'xxx', '1', '3'), ('5', 'xxxx', '1', '2');
COMMIT;


SET FOREIGN_KEY_CHECKS = 1;


