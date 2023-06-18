-- CreateTable
CREATE TABLE `users` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(128) NOT NULL,
    `name` VARCHAR(128) NOT NULL,
    `pwd` VARCHAR(128) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `admin` BOOLEAN NOT NULL DEFAULT false,
    `org_member` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_name_key`(`name`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ships` (
    `shipID` INTEGER NOT NULL,
    `manufacturer` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `career` VARCHAR(191) NULL,
    `Focus` VARCHAR(191) NULL,
    `Class` VARCHAR(191) NULL,
    `Size` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`shipID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ranks` (
    `rankID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `rank` INTEGER NOT NULL DEFAULT 10,

    UNIQUE INDEX `ranks_name_key`(`name`),
    PRIMARY KEY (`rankID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `badges` (
    `badgeID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `badges_name_key`(`name`),
    PRIMARY KEY (`badgeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `linkships` (
    `linkID` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `shipID` INTEGER NOT NULL,

    PRIMARY KEY (`linkID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `linkbadges` (
    `linkID` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `badgeID` INTEGER NOT NULL,

    PRIMARY KEY (`linkID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `linkranks` (
    `linkID` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `rankID` INTEGER NOT NULL,

    PRIMARY KEY (`linkID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `linkships` ADD CONSTRAINT `linkships_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `linkships` ADD CONSTRAINT `linkships_shipID_fkey` FOREIGN KEY (`shipID`) REFERENCES `ships`(`shipID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `linkbadges` ADD CONSTRAINT `linkbadges_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `linkbadges` ADD CONSTRAINT `linkbadges_badgeID_fkey` FOREIGN KEY (`badgeID`) REFERENCES `badges`(`badgeID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `linkranks` ADD CONSTRAINT `linkranks_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `linkranks` ADD CONSTRAINT `linkranks_rankID_fkey` FOREIGN KEY (`rankID`) REFERENCES `ranks`(`rankID`) ON DELETE RESTRICT ON UPDATE CASCADE;
