/*
  Warnings:

  - You are about to drop the column `name` on the `candidate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `candidate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `candidate` DROP COLUMN `name`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `candidate_username_key` ON `candidate`(`username`);
