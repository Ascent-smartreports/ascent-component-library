export default {
  testEnvironment: "jsdom",
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest",
  // },
  transform: {
     "^.+\\.tsx?$": "ts-jest",
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "jest-transform-stub",
  },

  moduleNameMapper: {
    "^.+\\.svg$": "jest-transformer-svg",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
  
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
