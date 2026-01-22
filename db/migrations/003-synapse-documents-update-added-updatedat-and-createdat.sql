ALTER TABLE documents
ADD COLUMN created_at TIMESTAMP DEFAULT now(),
ADD COLUMN updated_at TIMESTAMP DEFAULT now();
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_docs
BEFORE UPDATE ON documents
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
