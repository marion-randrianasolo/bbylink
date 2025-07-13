/*
  Warnings:

  - You are about to drop the column `score` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "maxGoals" INTEGER,
ADD COLUMN     "winCondition" TEXT NOT NULL DEFAULT 'first_to_goals',
ADD COLUMN     "winValue" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "score",
ALTER COLUMN "xp" DROP NOT NULL,
ALTER COLUMN "xp" SET DEFAULT 0,
ALTER COLUMN "coins" DROP NOT NULL,
ALTER COLUMN "coins" SET DEFAULT 100,
ALTER COLUMN "elo" DROP NOT NULL,
ALTER COLUMN "elo" SET DEFAULT 100;
