-- CreateTable
CREATE TABLE "AppUserModel" (
    "id" TEXT NOT NULL,
    "profileImage" TEXT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppUserModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityModel" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "CommunityModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HighlightedImageModel" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HighlightedImageModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "CategoryModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterestModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "InterestModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "horizontalImage" TEXT NOT NULL,
    "verticalImage" TEXT NOT NULL,
    "favourite" BOOLEAN NOT NULL,
    "joined" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "placeName" TEXT NOT NULL,
    "completeAddress" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "priceWithoutDiscount" DOUBLE PRECISION NOT NULL,
    "communityImage" TEXT NOT NULL,
    "communityName" TEXT NOT NULL,
    "organizers" TEXT[],
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "photos" TEXT[],
    "eventType" TEXT NOT NULL,
    "popular" BOOLEAN NOT NULL,

    CONSTRAINT "EventModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentModel" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CommentModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReplyModel" (
    "id" TEXT NOT NULL,
    "parentCommentId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,

    CONSTRAINT "CommentReplyModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favourite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "Favourite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserCommunities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AppUserModelToInterestModel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AppUserModel_username_key" ON "AppUserModel"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AppUserModel_email_key" ON "AppUserModel"("email");

-- CreateIndex
CREATE INDEX "username_index" ON "AppUserModel"("username");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityModel_ownerId_key" ON "CommunityModel"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityModel_name_key" ON "CommunityModel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_EventUsers_AB_unique" ON "_EventUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_EventUsers_B_index" ON "_EventUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserCommunities_AB_unique" ON "_UserCommunities"("A", "B");

-- CreateIndex
CREATE INDEX "_UserCommunities_B_index" ON "_UserCommunities"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AppUserModelToInterestModel_AB_unique" ON "_AppUserModelToInterestModel"("A", "B");

-- CreateIndex
CREATE INDEX "_AppUserModelToInterestModel_B_index" ON "_AppUserModelToInterestModel"("B");

-- AddForeignKey
ALTER TABLE "CommunityModel" ADD CONSTRAINT "CommunityModel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "AppUserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HighlightedImageModel" ADD CONSTRAINT "HighlightedImageModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AppUserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HighlightedImageModel" ADD CONSTRAINT "HighlightedImageModel_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EventModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventModel" ADD CONSTRAINT "EventModel_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "CommunityModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentModel" ADD CONSTRAINT "CommentModel_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "AppUserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentModel" ADD CONSTRAINT "CommentModel_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EventModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReplyModel" ADD CONSTRAINT "CommentReplyModel_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "CommentModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReplyModel" ADD CONSTRAINT "CommentReplyModel_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "AppUserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventUsers" ADD CONSTRAINT "_EventUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "AppUserModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventUsers" ADD CONSTRAINT "_EventUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "EventModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCommunities" ADD CONSTRAINT "_UserCommunities_A_fkey" FOREIGN KEY ("A") REFERENCES "AppUserModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCommunities" ADD CONSTRAINT "_UserCommunities_B_fkey" FOREIGN KEY ("B") REFERENCES "CommunityModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppUserModelToInterestModel" ADD CONSTRAINT "_AppUserModelToInterestModel_A_fkey" FOREIGN KEY ("A") REFERENCES "AppUserModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppUserModelToInterestModel" ADD CONSTRAINT "_AppUserModelToInterestModel_B_fkey" FOREIGN KEY ("B") REFERENCES "InterestModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
