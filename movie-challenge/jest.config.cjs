module.exports = {
  moduleDirectories: ["node_modules"],
  testEnvironment: "jsdom",

  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
    //"\\.(css|less)$": "identity-obj-proxy",
  },
};
