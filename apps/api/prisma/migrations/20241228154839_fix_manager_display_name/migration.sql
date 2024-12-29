/*
  Warnings:

  - You are about to drop the column `diplayName` on the `Manager` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Manager" DROP COLUMN "diplayName",
ADD COLUMN     "displayName" TEXT;
