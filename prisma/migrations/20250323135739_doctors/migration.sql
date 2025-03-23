/*
  Warnings:

  - Added the required column `patientCount` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeMinutes` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "patientCount" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "timeMinutes" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
