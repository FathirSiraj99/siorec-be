/*
  Warnings:

  - Added the required column `token` to the `candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `candidate` ADD COLUMN `token` VARCHAR(191) NOT NULL;
