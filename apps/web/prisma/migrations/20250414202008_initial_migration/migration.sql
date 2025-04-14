-- CreateTable
CREATE TABLE "jobs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "reportsTo" TEXT,
    "location" TEXT NOT NULL,
    "summary" TEXT,
    "employmentType" TEXT,
    "company" TEXT DEFAULT 'Life Got Better Homecare',
    "responsibilities" JSONB,
    "qualifications" JSONB,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trainings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "notification_channel" TEXT NOT NULL,
    "price" TEXT,
    "original_price" TEXT,
    "class_hours" TEXT,
    "additional_details" TEXT,
    "schedule_url" TEXT,
    "requirements" JSONB,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);
