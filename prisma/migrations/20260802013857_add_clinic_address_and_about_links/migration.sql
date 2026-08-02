-- AlterTable
ALTER TABLE "AboutContent" ADD COLUMN     "crm" TEXT,
ADD COLUMN     "instagramUrl" TEXT,
ADD COLUMN     "lattesUrl" TEXT,
ADD COLUMN     "rqe" TEXT;

-- CreateTable
CREATE TABLE "ClinicAddress" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "note" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClinicAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ClinicAddress_order_idx" ON "ClinicAddress"("order");
