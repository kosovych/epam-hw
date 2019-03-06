module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "./node_modules/eslint-config-google/index.js",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-console": "off",
        "linebreak-style": "off",
        "require-jsdoc": "off",
        "prefer-rest-params": "off",
    }
};