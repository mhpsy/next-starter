/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `admin_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "admin_user_username_key" ON "admin_user"("username");
