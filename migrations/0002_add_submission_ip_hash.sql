-- Add ip_hash to contact_submissions for rate limiting and spam tracing
ALTER TABLE contact_submissions ADD COLUMN ip_hash TEXT;
