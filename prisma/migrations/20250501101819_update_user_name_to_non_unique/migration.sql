-- DropIndex
DROP INDEX "users_name_key";

-- CreateIndex
CREATE INDEX "events_creatorId_idx" ON "events"("creatorId");

-- CreateIndex
CREATE INDEX "participants_eventId_idx" ON "participants"("eventId");
