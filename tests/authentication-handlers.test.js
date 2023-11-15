"use strict"

const mysql2 = require('mysql2');
const { login } = require('../scripts/authentication-handlers');

var mockRequest = {
	body: {
		login: 'renatoreis',
		password: '123456',
	},
	session: {},
};

var mockResponse = {
	sendStatus: jest.fn(),
	send: jest.fn(),
};

jest.mock('mysql2', function () {
	const mockConnection = {
		connect: jest.fn(),
		query: jest.fn(),
	};

	return {
		createConnection: jest.fn(function () { return mockConnection } ),
	};
});

describe('login function', function () {
	it('handle the successful login', function () {
		const user = { id: 1, userName: 'renatoreis', name: 'Alcirio Reis', email: 'renato@gmail.com', roleCode: 'A', roleDescription: 'Administrator' };

		mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
			callback(null, [user]);
		});

		login(mockRequest, mockResponse);

		expect(mockRequest.session.User).toEqual(user);
		expect(mockResponse.send).toHaveBeenCalledWith(JSON.stringify(user));
	});

	it('handle an unsuccessful login with incorrect credentials', function () {
		mockRequest.body.login = "invalidLogin"
		mockRequest.body.password = "invalidPassword"

		mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
			callback(null, []);
		});

		login(mockRequest, mockResponse);

		expect(mockResponse.sendStatus).toHaveBeenCalledWith(401);
	});

	it('should handle an error during the login process', function () {
		mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
			callback(new Error('Database error'), null);
		});

		login(mockRequest, mockResponse);

		expect(mockResponse.sendStatus).toHaveBeenCalledWith(500);
	});
});
