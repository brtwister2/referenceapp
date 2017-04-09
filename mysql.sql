-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema referenceapp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema referenceapp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `referenceapp` DEFAULT CHARACTER SET utf8 ;
USE `referenceapp` ;

-- -----------------------------------------------------
-- Table `referenceapp`.`companies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `referenceapp`.`companies` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `website` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `referenceapp`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `referenceapp`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  `linkedintoken` VARCHAR(200) NULL DEFAULT NULL,
  `linkedinid` VARCHAR(45) NULL DEFAULT NULL,
  `picture` VARCHAR(45) NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `companies_id` INT(11) NOT NULL DEFAULT '1',
  `token` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_companies1_idx` (`companies_id` ASC),
  CONSTRAINT `fk_users_companies1`
    FOREIGN KEY (`companies_id`)
    REFERENCES `referenceapp`.`companies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `referenceapp`.`form`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `referenceapp`.`form` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `data` TEXT NULL DEFAULT NULL,
  `userid` INT(11) NOT NULL,
  `refid` INT(11) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `rating` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_form_users1_idx` (`userid` ASC),
  INDEX `fk_form_users2_idx` (`refid` ASC),
  CONSTRAINT `fk_form_users1`
    FOREIGN KEY (`userid`)
    REFERENCES `referenceapp`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_form_users2`
    FOREIGN KEY (`refid`)
    REFERENCES `referenceapp`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `referenceapp`.`referencerequest`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `referenceapp`.`referencerequest` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `userid` INT(11) NOT NULL,
  `refid` INT(11) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_referencerequest_users_idx` (`userid` ASC),
  INDEX `fk_referencerequest_users1_idx` (`refid` ASC),
  CONSTRAINT `fk_referencerequest_users`
    FOREIGN KEY (`userid`)
    REFERENCES `referenceapp`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_referencerequest_users1`
    FOREIGN KEY (`refid`)
    REFERENCES `referenceapp`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
