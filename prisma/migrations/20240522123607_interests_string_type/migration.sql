/*
  Warnings:

  - You are about to drop the `InterestModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AppUserModelToInterestModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AppUserModelToInterestModel" DROP CONSTRAINT "_AppUserModelToInterestModel_A_fkey";

-- DropForeignKey
ALTER TABLE "_AppUserModelToInterestModel" DROP CONSTRAINT "_AppUserModelToInterestModel_B_fkey";

-- AlterTable
ALTER TABLE "AppUserModel" ADD COLUMN     "interests" TEXT[];

-- DropTable
DROP TABLE "InterestModel";

-- DropTable
DROP TABLE "_AppUserModelToInterestModel";
