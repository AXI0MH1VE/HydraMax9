module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/OneDrive/Desktop/HyHive/src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      tsconfig: {
        jsx: "react-jsx"
      }
    }]
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@google/genai)/)"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/OneDrive/Desktop/HyHive/src/$1",
    "^@components/(.*)$": "<rootDir>/OneDrive/Desktop/HyHive/src/components/$1",
    "^@services/(.*)$": "<rootDir>/OneDrive/Desktop/HyHive/src/services/$1",
    "^@types/(.*)$": "<rootDir>/OneDrive/Desktop/HyHive/src/types/$1"
  },
  collectCoverageFrom: [
    "OneDrive/Desktop/HyHive/src/**/*.{ts,tsx}",
    "!OneDrive/Desktop/HyHive/src/**/*.d.ts",
    "!OneDrive/Desktop/HyHive/src/**/__tests__/**"
  ],
  testMatch: [
    "**/OneDrive/Desktop/HyHive/src/__tests__/**/*.test.{ts,tsx}"
  ]
};
