"use strict"

const mysql2 = require('mysql2');
const { getListJobs, getUserInfoInitState } = require('../scripts/jobs-handlers');

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

describe('getListJobs function', function () {
	mockRequest.body = {
		type: 'ME',
		identifier: 1
	};

	mockResponse.json = jest.fn();

	it('handle a successful query and return jobs', function () {
		const job = {
			JOB_ID: 1,
			USER_ID_CREATED: 2,
			USER_NAME_CREATE: "Daniel Nunes",
			EQUIPMENT_TYPE: "1",
			EQUIPMENT_BRAND: "1",
			EQUIPMENT_BRAND_DESCRIPTION: "iPhone",
			EQUIPMENT_TYPE_DESCRIPTION: "Telefone",
			EQUIPMENT_PROCEDURE: "1",
			EQUIPMENT_PROCEDURE_DESCRIPTION: "Substituir bateria",
			DATE_STARTED: "15-NOV-2023 13:25",
			STATUS_PROGRESS_CODE: "1",
			STATUS_PROGRESS_CODE_DESCRIPTION: "Em progresso",
			DATE_FINISHED: "-",
			USER_FINALISED: null,
			NOTES: "-",
			PRIORITY_CODE: "4",
			PRIORITY_DESCRIPTION: "Prioridade baixa",
			PRIORITY_WORK: 1,
			CLIENT_NAME: "Amália Rosário",
			CLIENT_EMAIL: "amalia_rosario@email.com",
			CLIENT_NIF: "123"
		}
		mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
			callback(null, [job]);
		});

		getListJobs(mockRequest, mockResponse);

		expect(mockResponse.json).toHaveBeenCalledWith({ jobs: [job] });
	});

	it('handle an unsuccessful query and return an empty array', function () {
		mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
			callback(new Error('Database error'), null);
		});

		getListJobs(mockRequest, mockResponse);

		expect(mockResponse.json).toHaveBeenCalledWith({ jobs: [] });
	});
});

describe('getUserInfoInitState function', function () {
	mockResponse.json = jest.fn();

	it('handle a successful query and return initPageState', function () {
		const initState = [
			[{ DOMAIN: 'JOB_STATUS', CODE: '1', DESCRIPTION: 'Em progresso', DISPLAY_ORDER: 1 }],
			[{ DOMAIN: 'JOB_EQUIPEMENT', CODE: '1', DESCRIPTION: 'Telefone', DISPLAY_ORDER: 1 }],
			[{ DOMAIN: 'JOB_EQUIPEMENT_PROCEDURE', CODE: '1', DESCRIPTION: 'Substituir bateria', DISPLAY_ORDER: 1 }],
			[{ DOMAIN: 'JOB_BRAND', CODE: '1', DESCRIPTION: 'iPhone', DISPLAY_ORDER: 1 }],
			[{ ID: 1, NAME: 'Amália Rosário' }],
			[{ DOMAIN: 'JOB_PRIORITY', CODE: '1', DESCRIPTION: 'Prioridade baixa', DISPLAY_ORDER: 1 }],
		];

		mysql2.createConnection().query.mockImplementationOnce(function (_query, callback) {
			callback(null, initState);
		});

		getUserInfoInitState(mockRequest, mockResponse);

		expect(mockResponse.json).toHaveBeenCalledWith({ initPageState: initState });
	});

	it('should handle an unsuccessful query and return an empty array', function () {
		mysql2.createConnection().query.mockImplementationOnce(function (_query, callback) {
			callback(new Error('Database error'), null);
		});

		getUserInfoInitState(mockRequest, mockResponse);

		expect(mockResponse.json).toHaveBeenCalledWith({ initPageState: [] });
	});
});
