/*
  Warnings:

  - You are about to drop the column `alamat` on the `company` table. All the data in the column will be lost.
  - Added the required column `address` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `company` DROP COLUMN `alamat`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL;
