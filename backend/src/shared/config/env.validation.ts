export function validateEnvironment() {
  const required = [
    'DATABASE_URL',
    'OPENAI_API_KEY',
    'AZURE_STORAGE_CONNECTION_STRING',
    'JWT_SECRET',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`,
    );
  }
}
