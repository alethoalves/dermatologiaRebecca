-- AlterTable
ALTER TABLE "GalleryImage" ADD COLUMN "caption" TEXT;

-- Backfill existing rows from imageAlt so no data is lost
UPDATE "GalleryImage" SET "caption" = "imageAlt" WHERE "caption" IS NULL;

-- AlterTable
ALTER TABLE "GalleryImage" ALTER COLUMN "caption" SET NOT NULL;
