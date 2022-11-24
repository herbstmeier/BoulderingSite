use bouldersitedb;

CREATE TABLE if not EXISTS `Users` (
    `userId` int AUTO_INCREMENT NOT NULL ,
    `name` varchar(50)  NOT NULL ,
    `email` varchar(50) NOT NULL ,
    `password` varchar (50) NOT NULL,
    `picture` varchar(50)  NULL ,
    `isSetter` bool NOT NULL,
    PRIMARY KEY (
        `userId`
    )
);

CREATE TABLE if not EXISTS `Boulders` (
    `boulderId` int AUTO_INCREMENT NOT NULL ,
    `grade` varchar(50)  NOT NULL ,
    `picture` varchar(50)  NULL ,
    PRIMARY KEY (
        `boulderId`
    )
);

CREATE TABLE if not EXISTS `Climbs` (
    `userId` int  NOT NULL ,
    `boulderId` int  NOT NULL ,
    `isFlash` bool  NOT NULL ,
    `date` DateTime  NOT NULL 
);

CREATE TABLE if not EXISTS `Sets` (
    `setterId` int  NOT NULL ,
    `boulderId` int  NOT NULL ,
    `date` DateTime  NOT NULL 
);

CREATE TABLE if not EXISTS `Ratings` (
    `userId` int  NOT NULL ,
    `boulderId` int  NOT NULL ,
    `ratingType` int  NOT NULL 
);

CREATE TABLE if not EXISTS `Comments` (
    `commentId` int AUTO_INCREMENT NOT NULL ,
    `userId` int  NOT NULL ,
    `boulderId` int  NOT NULL ,
    `content` varchar(50)  NOT NULL ,
    `date` DateTime  NOT NULL ,
    PRIMARY KEY (
        `commentId`
    )
);

ALTER TABLE `Climbs` ADD CONSTRAINT `fk_Climbs_userId` FOREIGN KEY(`userId`)
REFERENCES `Users` (`userId`);

ALTER TABLE `Climbs` ADD CONSTRAINT `fk_Climbs_boulderId` FOREIGN KEY(`boulderId`)
REFERENCES `Boulders` (`boulderId`);

ALTER TABLE `Sets` ADD CONSTRAINT `fk_Sets_setterId` FOREIGN KEY(`setterId`)
REFERENCES `Users` (`UserId`);

ALTER TABLE `Sets` ADD CONSTRAINT `fk_Sets_boulderId` FOREIGN KEY(`boulderId`)
REFERENCES `Boulders` (`boulderId`);

ALTER TABLE `Ratings` ADD CONSTRAINT `fk_Ratings_userId` FOREIGN KEY(`userId`)
REFERENCES `Users` (`userId`);

ALTER TABLE `Ratings` ADD CONSTRAINT `fk_Ratings_boulderId` FOREIGN KEY(`boulderId`)
REFERENCES `Boulders` (`boulderId`);

ALTER TABLE `Comments` ADD CONSTRAINT `fk_Comments_userId` FOREIGN KEY(`userId`)
REFERENCES `Users` (`userId`);

ALTER TABLE `Comments` ADD CONSTRAINT `fk_Comments_boulderId` FOREIGN KEY(`boulderId`)
REFERENCES `Boulders` (`boulderId`);

