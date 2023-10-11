/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@app': '<rootDir>/src/app.ts',
    '^@auth': '<rootDir>/src/auth',
    '^@controllers': '<rootDir>/src/controllers',
    '^@models': '<rootDir>/src/models',
    '^@errors': '<rootDir>/src/errors',
    '^@routes': '<rootDir>/src/routes',
    '^@utils': '<rootDir>/src/utils',
    '^@validations': '<rootDir>/src/validations',
  },
}
