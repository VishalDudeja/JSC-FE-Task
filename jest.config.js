/** @type {import('jest').Config} */
module.exports = {
  transform: {
    // Transform TypeScript files using ts-jest
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
  testEnvironment: 'jest-environment-jsdom', // for React testing
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // if using @/ alias
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transformIgnorePatterns: ['/node_modules/'],
};
