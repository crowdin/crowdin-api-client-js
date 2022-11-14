module.exports = {
    "testEnvironment": "node",
    "testRunner": "jest-circus/runner",
    "transform": {
        "^.+\\.(t|j)sx?$": "ts-jest"
    },
    "moduleNameMapper": {
        '^axios$': require.resolve('axios'),
    },
    "testRegex": "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "coverageReporters": [
        "text",
        "cobertura"
    ],
};