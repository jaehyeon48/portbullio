export default {
	setupFilesAfterEnv: ['./src/setupTests.ts'],
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__mocks__/fileMock.js',
		'\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
		'@src(.*)$': '<rootDir>/src$1',
		'@components(.*)$': '<rootDir>/src/components$1',
		'@assets(.*)$': '<rootDir>/src/assets$1',
		'@constants': '<rootDir>/src/constants/index.ts',
		'@types': '<rootDir>/src/types/index.ts',
		'@styles(.*)$': '<rootDir>/src/styles$1',
		'@hooks(.*)$': '<rootDir>/src/hooks$1'
	}
};
