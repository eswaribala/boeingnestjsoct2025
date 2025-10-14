import type { Config } from 'jest';
import { getJestProjectsAsync } from '@nx/jest';
/*
export default async (): Promise<Config> => ({
  projects: await getJestProjectsAsync(),
});
*/

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
   moduleNameMapper: {
    '^@nestjs/swagger$': '<rootDir>/test/mocks/nestjs-swagger.mock.ts',
  },
  // (optional but often helpful)
  globals: {
    'ts-jest': {
      tsconfig: {
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        esModuleInterop: true,
        useDefineForClassFields: false,
      },
    },
  },
  //rootDir: 'src', // ✅ ensures it looks inside src/
  testRegex: '.*\\.spec\\.ts$', // ✅ matches *.spec.ts
  moduleFileExtensions: ['ts', 'js', 'json'],
   coverageProvider: 'v8',                         // modern + fast
  collectCoverage: true,                          // or pass --coverage on CLI

  coverageDirectory: 'coverage/customer-api',     // change if you like
  coverageReporters: ['text', 'html', 'lcov'],    // 'html' is the key one

  clearMocks: true,
};

export default config;
