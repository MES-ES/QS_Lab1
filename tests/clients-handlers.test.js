"use strict"

const mysql2 = require('mysql2');
const { getClients, editClient, deleteClient, createClient } = require('../scripts/clients-handlers');

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

describe('getClients function', function () {
	mockResponse.json = jest.fn();

	it('handle a successful query and return clients', function () {
		const clients = [
			{ id: 1, name: 'Amália Rosário', address: 'Rua grande', postCode: '6000', email: 'amalia_rosario@email.com"', nif: '123', TOTAL_JOBS: 0, TOTAL_JOBS_FINALISED: 0 },
			{ id: 2, name: 'Joaquim Antunes', address: 'Rua da eira', postCode: '6001', email: 'joaquim_antunes@email.com"', nif: '1234', TOTAL_JOBS: 0, TOTAL_JOBS_FINALISED: 0 },
		]

		mysql2.createConnection().query.mockImplementationOnce(function (_query, callback) {
			callback(null, clients);
		});

		getClients(mockRequest, mockResponse);

		expect(mockResponse.json).toHaveBeenCalledWith({
			clients: clients,
		});
	});

	it('handle an error during the query and return an empty array', function () {
		mysql2.createConnection().query.mockImplementationOnce(function (_query, callback) {
			callback(new Error('Database error'), null);
		});

		getClients(mockRequest, mockResponse);

		expect(mockResponse.json).toHaveBeenCalledWith({
			clients: [],
		});
	});
});

describe('editClient function', function () {
	mockRequest.body = {
		id: 1,
		name: "Novo Nome",
		address: "Nova Morada",
		postCode: "Novo Codigo Postal",
		email: "novo@email.com",
		nif: "321"
	};

	it('handle a successful update and return success: true', function () {

		mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
			callback(null, { affectedRows: 1 });
		});

		editClient(mockRequest, mockResponse);

		expect(mockResponse.json).toHaveBeenCalledWith({ success: true });
	});

	it('should handle an unsuccessful update and return success: false', function () {
		mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
			callback(new Error('Database error'), null);
		});

		editClient(mockRequest, mockResponse);

		expect(mockResponse.json).toHaveBeenCalledWith({ success: false });
	});
});

describe('deleteClient function', function () {
	mockRequest.params = { id: 1 };
	mockResponse.sendStatus = jest.fn();

	it('handle a successful delete and return 200 status', function () {
		mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
			callback(null, { affectedRows: 1 });
		});

		deleteClient(mockRequest, mockResponse);

		expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
	});

	it('handle an unsuccessful delete and return 500 status', function () {
		mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
			callback(new Error('Database error'), null);
		});

		deleteClient(mockRequest, mockResponse);

		expect(mockResponse.sendStatus).toHaveBeenCalledWith(500);
	});
});

describe('createClient function', function () {
	mockRequest.body = {
		name: "Novo User",
		address: "Nova Morada",
		postCode: "Novo Codigo Postal",
		email: "novo@email.com",
		nif: "987654321"
	};
	mockResponse.sendStatus = jest.fn();

	it('handle a successful insert and return 200 status', function () {
		mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
			callback(null, { affectedRows: 1 });
		});

		createClient(mockRequest, mockResponse);

		expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
	});

	it('handle an unsuccessful insert and return 500 status', function () {
		mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
			callback(new Error('Database error'), null);
		});

		createClient(mockRequest, mockResponse);

		expect(mockResponse.sendStatus).toHaveBeenCalledWith(500);
	});
});
