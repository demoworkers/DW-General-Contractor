/*
  Warnings:

  - You are about to drop the column `projectsId` on the `ProjectDetails` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Projects` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StageStatus" AS ENUM ('COMPLETED', 'UNDER_PROGRESS');

-- AlterEnum
ALTER TYPE "ProjectStage" ADD VALUE 'COMPLETED';

-- DropForeignKey
ALTER TABLE "ProjectDetails" DROP CONSTRAINT "ProjectDetails_projectsId_fkey";

-- AlterTable
ALTER TABLE "ProjectDetails" DROP COLUMN "projectsId",
ADD COLUMN     "projectId" INTEGER,
ADD COLUMN     "status" "StageStatus" NOT NULL DEFAULT 'UNDER_PROGRESS';

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "state",
ADD COLUMN     "stage" "ProjectStage" NOT NULL DEFAULT 'BIDDING';

-- AddForeignKey
ALTER TABLE "ProjectDetails" ADD CONSTRAINT "ProjectDetails_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
