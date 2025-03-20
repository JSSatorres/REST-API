export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: false }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
}
