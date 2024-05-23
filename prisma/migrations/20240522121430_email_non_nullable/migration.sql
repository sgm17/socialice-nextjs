/*
  Warnings:

  - Made the column `email` on table `AppUserModel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AppUserModel" ALTER COLUMN "email" SET NOT NULL;
