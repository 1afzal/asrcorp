import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    // We don't connect to MongoDB in tests — anything that needs the DB is
    // either mocked or excluded. This keeps `npm test` fast and hermetic.
    setupFiles: ['./src/test-setup.ts'],
  },
});
