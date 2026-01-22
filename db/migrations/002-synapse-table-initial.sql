
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  isArchived BOOLEAN NOT NULL DEFAULT false,
  parentDocument UUID,
  content TEXT,
  coverImage VARCHAR(300),
  icon VARCHAR(300),
  isPublished BOOLEAN NOT NULL DEFAULT false
);
