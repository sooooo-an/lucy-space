/*
  Warnings:

  - Added the required column `color` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'BACKLOG';
