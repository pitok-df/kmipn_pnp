/*
  Warnings:

  - Added the required column `title` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lectureID` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileKTM` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proposal" ADD COLUMN     "title" VARCHAR(125) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'uploaded';

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "lectureID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "fileKTM" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Lecture" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nip" VARCHAR(18) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assesment" (
    "id" SERIAL NOT NULL,
    "proposalID" INTEGER NOT NULL,
    "juriID" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assesment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_lectureID_fkey" FOREIGN KEY ("lectureID") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assesment" ADD CONSTRAINT "Assesment_proposalID_fkey" FOREIGN KEY ("proposalID") REFERENCES "Proposal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assesment" ADD CONSTRAINT "Assesment_juriID_fkey" FOREIGN KEY ("juriID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
