/*
  Warnings:

  - You are about to drop the column `providerAccountId` on the `admin_account` table. All the data in the column will be lost.
  - Added the required column `provider_account_id` to the `admin_account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin_account" DROP COLUMN "providerAccountId",
ADD COLUMN     "provider_account_id" TEXT NOT NULL;
