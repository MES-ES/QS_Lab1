"use strict"

const { logout } = require('../scripts/globalHandlers');

var mockRequest = {};
var mockResponse = {};

jest.mock('mysql2', function () {
	const mockConnection = {
		connect: jest.fn(),
		query: jest.fn(),
	};

	return {
		createConnection: jest.fn(function () { return mockConnection } ),
	};
});

describe('logout function', function () {
	mockRequest.session = {
		User: { id: 1, userName: 'renatoreis' }
	};
	mockResponse.sendStatus = jest.fn();

	it('clear the user session and return 200 status', function () {
		logout(mockRequest, mockResponse);

		expect(mockRequest.session.User).toBeUndefined();
		expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
	});
});
