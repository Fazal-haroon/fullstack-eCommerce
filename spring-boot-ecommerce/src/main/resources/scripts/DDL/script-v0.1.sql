-- -----------------------------------------------------
-- Schema full-stack-ecommerce
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `full-stack-ecommerce`;

CREATE SCHEMA `full-stack-ecommerce`;

USE `full-stack-ecommerce` ;

-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`product_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`product_category` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`))
    ENGINE=InnoDB
    AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`product` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `sku` VARCHAR(255) DEFAULT NULL,
    `name` VARCHAR(255) DEFAULT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `unit_price` DECIMAL(13,2) DEFAULT NULL,
    `image_url` VARCHAR(255) DEFAULT NULL,
    `active` BIT DEFAULT 1,
    `units_in_stock` INT(11) DEFAULT NULL,
    `date_created` DATETIME(6) DEFAULT NULL,
    `last_updated` DATETIME(6) DEFAULT NULL,
    `category_id` BIGINT(20) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_category` (`category_id`),
    CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`)
    )
    ENGINE=InnoDB
    AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`countries-and-states`
-- -----------------------------------------------------
USE `full-stack-ecommerce`;
-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`country`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `country`;

CREATE TABLE `country` (
                           `id` smallint unsigned NOT NULL,
                           `code` varchar(2) DEFAULT NULL,
                           `name` varchar(255) DEFAULT NULL,
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB;
-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`state`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `state`;

CREATE TABLE `state` (
                         `id` smallint unsigned NOT NULL AUTO_INCREMENT,
                         `name` varchar(255) DEFAULT NULL,
                         `country_id` smallint unsigned NOT NULL,
                         PRIMARY KEY (`id`),
                         KEY `fk_country` (`country_id`),
                         CONSTRAINT `fk_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;
-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
                           `id` bigint NOT NULL AUTO_INCREMENT,
                           `city` varchar(255) DEFAULT NULL,
                           `country` varchar(255) DEFAULT NULL,
                           `state` varchar(255) DEFAULT NULL,
                           `street` varchar(255) DEFAULT NULL,
                           `zip_code` varchar(255) DEFAULT NULL,
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`customer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
                            `id` bigint NOT NULL AUTO_INCREMENT,
                            `first_name` varchar(255) DEFAULT NULL,
                            `last_name` varchar(255) DEFAULT NULL,
                            `email` varchar(255) DEFAULT NULL,
                            PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
                          `id` bigint NOT NULL AUTO_INCREMENT,
                          `order_tracking_number` varchar(255) DEFAULT NULL,
                          `total_price` decimal(19,2) DEFAULT NULL,
                          `total_quantity` int DEFAULT NULL,
                          `billing_address_id` bigint DEFAULT NULL,
                          `customer_id` bigint DEFAULT NULL,
                          `shipping_address_id` bigint DEFAULT NULL,
                          `status` varchar(128) DEFAULT NULL,
                          `date_created` datetime(6) DEFAULT NULL,
                          `last_updated` datetime(6) DEFAULT NULL,
                          PRIMARY KEY (`id`),
                          UNIQUE KEY `UK_billing_address_id` (`billing_address_id`),
                          UNIQUE KEY `UK_shipping_address_id` (`shipping_address_id`),
                          KEY `K_customer_id` (`customer_id`),
                          CONSTRAINT `FK_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
                          CONSTRAINT `FK_billing_address_id` FOREIGN KEY (`billing_address_id`) REFERENCES `address` (`id`),
                          CONSTRAINT `FK_shipping_address_id` FOREIGN KEY (`shipping_address_id`) REFERENCES `address` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`order_item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `order_item`;

CREATE TABLE `order_item` (
                              `id` bigint NOT NULL AUTO_INCREMENT,
                              `image_url` varchar(255) DEFAULT NULL,
                              `quantity` int DEFAULT NULL,
                              `unit_price` decimal(19,2) DEFAULT NULL,
                              `order_id` bigint DEFAULT NULL,
                              `product_id` bigint DEFAULT NULL,
                              PRIMARY KEY (`id`),
                              KEY `K_order_id` (`order_id`),
                              CONSTRAINT `FK_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
                              CONSTRAINT `FK_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
