-- CreateTable
CREATE TABLE "short_url" (
    "short_code" TEXT NOT NULL,
    "original_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "short_url_pkey" PRIMARY KEY ("short_code")
);
