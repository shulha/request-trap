module.exports = {
  "extends": "airbnb",
  "env": {
    "jquery": true,
    "browser": true,
    "node": true,
    "mocha": true
  },
  "globals": {
    "io": false,
    "trapId": false
  },
  "rules": {
    "semi": [2, "always"],
    "no-param-reassign": [0],
    "no-shadow": [0],
    "class-methods-use-this": [0],
    "prefer-destructuring": [0],
    "no-underscore-dangle": [0],
    "func-names": [0],
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": true,
      "optionalDependencies": false,
      "peerDependencies": false
    }],
  }
};
