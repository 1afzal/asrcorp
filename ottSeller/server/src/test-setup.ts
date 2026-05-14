// Provide deterministic env values to all tests. Real .env values are NOT
// loaded — we want tests to pass on a fresh checkout without any real DB or
// SMTP credentials configured.
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-please-do-not-use-in-prod';
process.env.ADMIN_EMAIL = 'admin@test.local';
process.env.ADMIN_PASSWORD = 'test-password-12345';
process.env.PORT = '0';
process.env.ALLOWED_ORIGIN = 'http://localhost:5173';
// Intentionally omit MONGODB_URI / SMTP_* so tests fail loudly if they rely
// on external services.
