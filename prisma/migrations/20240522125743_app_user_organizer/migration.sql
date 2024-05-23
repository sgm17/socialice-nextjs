/*
  Warnings:

  - You are about to drop the column `communityImage` on the `EventModel` table. All the data in the column will be lost.
  - You are about to drop the column `communityName` on the `EventModel` table. All the data in the column will be lost.
  - You are about to drop the column `favourite` on the `EventModel` table. All the data in the column will be lost.
  - You are about to drop the column `joined` on the `EventModel` table. All the data in the column will be lost.
  - You are about to drop the column `organizers` on the `EventModel` table. All the data in the column will be lost.
  - Added the required column `endTimestamp` to the `EventModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTimestamp` to the `EventModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommentModel" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "EventModel" DROP COLUMN "communityImage",
DROP COLUMN "communityName",
DROP COLUMN "favourite",
DROP COLUMN "joined",
DROP COLUMN "organizers",
ADD COLUMN     "endTimestamp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTimestamp" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "_EventOrganizers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventOrganizers_AB_unique" ON "_EventOrganizers"("A", "B");

-- CreateIndex
CREATE INDEX "_EventOrganizers_B_index" ON "_EventOrganizers"("B");

-- AddForeignKey
ALTER TABLE "_EventOrganizers" ADD CONSTRAINT "_EventOrganizers_A_fkey" FOREIGN KEY ("A") REFERENCES "AppUserModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventOrganizers" ADD CONSTRAINT "_EventOrganizers_B_fkey" FOREIGN KEY ("B") REFERENCES "EventModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
