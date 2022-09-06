-- CreateTable
CREATE TABLE "RealEstate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "site" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "roomType" TEXT NOT NULL,
    "floorPlan" TEXT NOT NULL,
    "areaSize" TEXT,
    "petFriendly" BOOLEAN,
    "longuitude" DECIMAL,
    "latitude" DECIMAL,
    "notes" TEXT,
    "rent" DECIMAL NOT NULL,
    "deposit" DECIMAL,
    "gratuity" DECIMAL,
    "managementFee" DECIMAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RealEstate_url_key" ON "RealEstate"("url");

-- CreateIndex
CREATE UNIQUE INDEX "RealEstate_name_key" ON "RealEstate"("name");
