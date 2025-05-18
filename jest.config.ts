
/**
 * Jest configuration for the project using `ts-jest` and `jsdom` environment.
 *
 * - Uses `ts-jest` to support TypeScript in tests.
 * - Sets up a browser-like environment with `jsdom`.
 * - Mocks CSS module imports using `identity-obj-proxy`.
 * - Mocks image imports using a custom mock file.
 * - Loads additional setup logic from `jest.setup.ts`.
 *
 * @property {string} preset - Specifies the Jest preset (`ts-jest`) for TypeScript support.
 * @property {string} testEnvironment - Sets the test environment to `jsdom` for DOM APIs.
 * @property {Object} moduleNameMapper - Maps module patterns to mocks for CSS and image files.
 * @property {string[]} setupFilesAfterEnv - Specifies setup files to run after the test environment is set up.
 *
 * @example
 * // Run tests with this config
 * jest
 */

export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg|png)$": "<rootDir>/src/mocks/imgMock.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
};
