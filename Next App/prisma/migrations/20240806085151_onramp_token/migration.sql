/*
  Warnings:

  - Added the required column `tokenForWebhook` to the `OnRamps` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OnRampsStatus" AS ENUM ('success', 'processing', 'fail');

-- AlterTable
ALTER TABLE "OnRamps" ADD COLUMN     "status" "OnRampsStatus" NOT NULL DEFAULT 'success',
ADD COLUMN     "tokenForWebhook" TEXT NOT NULL;
