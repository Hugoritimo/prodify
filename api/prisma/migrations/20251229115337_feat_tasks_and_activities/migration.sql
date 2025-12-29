-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "icon" TEXT;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 10;
