-- Create test user for Memory API testing
INSERT INTO "User" (id, email, "googleId", name, "createdAt", "updatedAt")
VALUES ('test-user-id', 'test@example.com', 'test-google-id', 'Test User', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
