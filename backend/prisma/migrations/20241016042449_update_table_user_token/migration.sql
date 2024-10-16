/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `UserToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserToken" DROP COLUMN "refreshToken";
