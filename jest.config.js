module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: [
        "/node_modules/",
        "/Out/"
    ],
    testMatch: [

        // Algorithms
        '<rootDir>/Test/Algorithm/queue.spec.ts',
        '<rootDir>/Test/Algorithm/stack.spec.ts',

        // Game
        '<rootDir>/Test/Game/grid.spec.ts',
        '<rootDir>/Test/Game/field.spec.ts',
        '<rootDir>/Test/Game/board.spec.ts',

        // End Points
        '<rootDir>/Test/EndPoints/User/signup.spec.ts',
        '<rootDir>/Test/EndPoints/Game/registerNewGame.spec.ts',

    ] 
};
