/*
  Warnings:

  - Made the column `token` on table `candidate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `candidate` MODIFY `token` VARCHAR(191) NOT NULL;
