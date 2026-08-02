-- CreateTable
CREATE TABLE "AboutContent" (
    "id" TEXT NOT NULL DEFAULT 'about',
    "kicker" TEXT NOT NULL DEFAULT 'Sobre a',
    "name" TEXT NOT NULL DEFAULT 'Dra. Rebecca Amorim',
    "intro" TEXT NOT NULL,
    "paragraphs" TEXT NOT NULL,
    "credentials" TEXT NOT NULL,
    "photoUrl" TEXT,
    "photoAlt" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutContent_pkey" PRIMARY KEY ("id")
);
