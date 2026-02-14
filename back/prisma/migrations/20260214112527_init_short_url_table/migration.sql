-- CreateTable
CREATE TABLE "short_url" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "short_code" TEXT NOT NULL,
    "original_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "short_url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "short_url_short_code_key" ON "short_url"("short_code");
