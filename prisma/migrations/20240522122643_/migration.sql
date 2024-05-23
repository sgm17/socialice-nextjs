/*
  Warnings:

  - You are about to drop the column `categoryId` on the `CommunityModel` table. All the data in the column will be lost.
  - You are about to drop the `CategoryModel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `CommunityModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommunityModel" DROP COLUMN "categoryId",
ADD COLUMN     "category" TEXT NOT NULL;

-- DropTable
DROP TABLE "CategoryModel";
