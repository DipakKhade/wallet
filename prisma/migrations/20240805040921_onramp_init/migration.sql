-- CreateTable
CREATE TABLE "OnRamps" (
    "id" TEXT NOT NULL,
    "onrampAmount" INTEGER NOT NULL,
    "banckName" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountid" TEXT NOT NULL,

    CONSTRAINT "OnRamps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnRamps_accountid_key" ON "OnRamps"("accountid");

-- AddForeignKey
ALTER TABLE "OnRamps" ADD CONSTRAINT "OnRamps_accountid_fkey" FOREIGN KEY ("accountid") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
