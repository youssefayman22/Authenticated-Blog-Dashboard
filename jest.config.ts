export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg|png)$": "<rootDir>/src/mocks/imgMock.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
};
