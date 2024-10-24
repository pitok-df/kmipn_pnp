/*
  Warnings:

  - You are about to drop the column `lectureID` on the `Team` table. All the data in the column will be lost.
  - Added the required column `lecture` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_lectureID_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "lectureID",
ADD COLUMN     "lecture" TEXT NOT NULL;
