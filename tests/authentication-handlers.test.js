const mysql2 = require('mysql2');
const { login } = require('../scripts/authentication-handlers');

jest.mock('mysql2', () => {
	const mockConnection = {
		connect: jest.fn(),
		query: jest.fn(),
	};

	return {
		createConnection: jest.fn(() => mockConnection),
	};
});

const mockRequest = {
	body: {
		login: 'renatoreis',
		password: '123456',
	},
	session: {},
};

const mockBadRequest = {
	body: {
		login: 'invalidUser',
		password: 'invalidPassword',
	},
	session: {},
};

const mockResponse = {
	sendStatus: jest.fn(),
	send: jest.fn(),
};

describe('login function', () => {
	it('handle the successful login', () => {
		const user = { id: 1, userName: 'renatoreis', name: 'Alcirio Reis', email: 'renato@gmail.com', roleCode: 'A', roleDescription: 'Administrator' };

		mysql2.createConnection().query.mockImplementationOnce((query, params, callback) => {
			callback(null, [user]);
		});

		login(mockRequest, mockResponse);

		expect(mockRequest.session.User).toEqual(user);
		expect(mockResponse.send).toHaveBeenCalledWith(JSON.stringify(user));
	});

	it('handle an unsuccessful login with incorrect credentials', () => {
		mysql2.createConnection().query.mockImplementationOnce((query, params, callback) => {
			callback(null, []);
		});

		login(mockBadRequest, mockResponse);

		expect(mockResponse.sendStatus).toHaveBeenCalledWith(401);
	});

	it('should handle an error during the login process', () => {
		mysql2.createConnection().query.mockImplementationOnce((query, params, callback) => {
			callback(new Error('Database error'), null);
		});

		login(mockRequest, mockResponse);

		expect(mockResponse.sendStatus).toHaveBeenCalledWith(500);
	});
});