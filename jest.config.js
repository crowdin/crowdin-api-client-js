module.exports = {
    testEnvironment: 'node',
    testRunner: 'jest-circus/runner',
    transform: {
        '^.+\\.(t|j)sx?$': 'ts-jest',
    },
    moduleNameMapper: {
        /**
         * Jest will resolve the ESM build of axios by default, even though
         * it fully supports CJS.
         * @see https://github.com/axios/axios/issues/5101
         */
        '^axios$': require.resolve('axios'),
    },
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    coverageReporters: ['text', 'cobertura'],
};
