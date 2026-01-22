-- AFTWER 005


-- EXTENSION
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- USERS
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);


-- TODOS
CREATE TABLE todos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT false,
    priority INT DEFAULT 0,
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);


-- DOCUMENTS (Synapse)
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    title VARCHAR(200) NOT NULL,
    content TEXT,

    is_archived BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT false,

    parent_document UUID,

    cover_image VARCHAR(300),
    icon VARCHAR(300),

    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),

    CONSTRAINT fk_parent_document
        FOREIGN KEY (parent_document)
        REFERENCES documents(id)
        ON DELETE CASCADE
);


-- INDEXES
CREATE INDEX idx_documents_user_id
ON documents(user_id);

CREATE INDEX idx_documents_user_parent
ON documents(user_id, parent_document);


-- AUTO UPDATE updated_at
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_docs
BEFORE UPDATE ON documents
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
