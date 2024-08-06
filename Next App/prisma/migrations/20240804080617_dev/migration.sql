/*
  Warnings:

  - A unique constraint covering the columns `[merchantid]` on the table `MerchantAccount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userid]` on the table `UserAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `merchantid` to the `MerchantAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `UserAccount` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MerchantAccount" DROP CONSTRAINT "MerchantAccount_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAccount" DROP CONSTRAINT "UserAccount_id_fkey";

-- AlterTable
ALTER TABLE "MerchantAccount" ADD COLUMN     "merchantid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserAccount" ADD COLUMN     "userid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MerchantAccount_merchantid_key" ON "MerchantAccount"("merchantid");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_userid_key" ON "UserAccount"("userid");

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantAccount" ADD CONSTRAINT "MerchantAccount_merchantid_fkey" FOREIGN KEY ("merchantid") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
