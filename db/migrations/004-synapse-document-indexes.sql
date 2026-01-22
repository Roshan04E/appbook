-- 1. Index by User (Matches .index("by_user", ["userId"]))
CREATE INDEX idx_documents_user_id ON documents("userId");

-- 2. Index by User and Parent (Matches .index("by_user_parent", ["userId", "parentDocument"]))
-- This significantly speeds up the query shown in your first photo
CREATE INDEX idx_documents_user_parent ON documents("userId", "parentDocument");

-- 3. Add Self-Referencing Foreign Key (Recommended for Notion Clones)
-- This ensures a document's parent actually exists and handles deletes
ALTER TABLE documents
ADD CONSTRAINT fk_parent_document
FOREIGN KEY ("parentDocument")
REFERENCES documents(id)
ON DELETE CASCADE;



ALTER TABLE documents RENAME COLUMN "userId" TO user_id;
ALTER TABLE documents RENAME COLUMN isarchived TO is_archived;
ALTER TABLE documents RENAME COLUMN parentDocument TO parent_document;
ALTER TABLE documents RENAME COLUMN coverImage TO cover_image;
ALTER TABLE documents RENAME COLUMN isPublished TO is_published;
ALTER TABLE documents RENAME COLUMN createdAt TO created_at;
ALTER TABLE documents RENAME COLUMN updatedAt TO updated_at;
