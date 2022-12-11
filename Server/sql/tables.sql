use redpointdb;

CREATE TABLE if not EXISTS `Users` (
    `userId` int AUTO_INCREMENT NOT NULL ,
    `username` varchar(20)  NOT NULL UNIQUE,
    `encryptedPassword` binary (64) NOT NULL,
    `salt` binary (16) not NULL,
    `picture` char(20)  NULL UNIQUE,
    `isSetter` bit NOT NULL,
    `isAdmin` bit NOT NULL,
    PRIMARY KEY (
        `userId`
    )
);

CREATE TABLE if not EXISTS `Boulders` (
    `boulderId` int AUTO_INCREMENT NOT NULL ,
    `setterId` int NOT NULL,
    `grade` varchar(3)  NOT NULL ,
    `colorId` int NOT NULL , 
    `picture` char(20)  NULL ,
    PRIMARY KEY (
        `boulderId`
    )
);

CREATE TABLE if not EXISTS `Tags` (
    `tagId` int AUTO_INCREMENT NOT NULL ,
    `tagName` varchar(15) NOT NULL UNIQUE ,
    PRIMARY KEY (
        `tagId`
    )
);

CREATE TABLE if not EXISTS `BouldersTags` (
    `boulderId` int NOT NULL ,
    `tagId` int not NULL
);

CREATE TABLE if not EXISTS `Colors` (
    `colorId` int AUTO_INCREMENT not NULL ,
    `colorName` VARCHAR(15) not NULL UNIQUE,
    `hexCode` CHAR(7) UNIQUE,
    PRIMARY KEY (
        `colorId`
    )
);

CREATE TABLE if not EXISTS `Climbs` (
    `userId` int  NOT NULL ,
    `boulderId` int  NOT NULL ,
    `isFlash` bit  NOT NULL ,
    `dateClimbed` DateTime  NOT NULL 
);

CREATE TABLE if not EXISTS `Ratings` (
    `userId` int  NOT NULL ,
    `boulderId` int  NOT NULL
);

CREATE TABLE if not EXISTS `Comments` (
    `commentId` int AUTO_INCREMENT NOT NULL ,
    `userId` int  NOT NULL ,
    `boulderId` int  NOT NULL ,
    `content` varchar(100)  NOT NULL ,
    `dateCommented` DateTime  NOT NULL ,
    PRIMARY KEY (
        `commentId`
    )
);

ALTER TABLE `Boulders` ADD CONSTRAINT `fk_Boulders_setterId` FOREIGN KEY(`setterId`)
REFERENCES `Users` (`userId`);
ALTER TABLE `Boulders` ADD CONSTRAINT `fk_Boulders_colorId` FOREIGN KEY(`colorId`)
REFERENCES `Colors` (`colorId`);

ALTER TABLE `BouldersTags` ADD CONSTRAINT `fk_BouldersTags_boulderId` FOREIGN KEY(`boulderId`)
REFERENCES `Boulders` (`boulderId`);
ALTER TABLE `BouldersTags` ADD CONSTRAINT `fk_BouldersTags_tagId` FOREIGN KEY(`tagId`)
REFERENCES `Tags` (`tagId`);

ALTER TABLE `Climbs` ADD CONSTRAINT `fk_Climbs_userId` FOREIGN KEY(`userId`)
REFERENCES `Users` (`userId`);
ALTER TABLE `Climbs` ADD CONSTRAINT `fk_Climbs_boulderId` FOREIGN KEY(`boulderId`)
REFERENCES `Boulders` (`boulderId`);

ALTER TABLE `Ratings` ADD CONSTRAINT `fk_Ratings_userId` FOREIGN KEY(`userId`)
REFERENCES `Users` (`userId`);
ALTER TABLE `Ratings` ADD CONSTRAINT `fk_Ratings_boulderId` FOREIGN KEY(`boulderId`)
REFERENCES `Boulders` (`boulderId`);

ALTER TABLE `Comments` ADD CONSTRAINT `fk_Comments_userId` FOREIGN KEY(`userId`)
REFERENCES `Users` (`userId`);
ALTER TABLE `Comments` ADD CONSTRAINT `fk_Comments_boulderId` FOREIGN KEY(`boulderId`)
REFERENCES `Boulders` (`boulderId`);