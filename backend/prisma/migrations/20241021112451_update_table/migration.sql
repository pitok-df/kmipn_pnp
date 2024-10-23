/*
  Warnings:

  - Added the required column `email` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nim` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_WA` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prodi` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "nim" VARCHAR(12) NOT NULL,
ADD COLUMN     "no_WA" TEXT NOT NULL,
ADD COLUMN     "prodi" TEXT NOT NULL;
