/*
  Warnings:

  - You are about to drop the column `lecture` on the `Team` table. All the data in the column will be lost.
  - Added the required column `lectureID` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "lecture",
ADD COLUMN     "lectureID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_lectureID_fkey" FOREIGN KEY ("lectureID") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
