"use strict";

const mysql2 = require("mysql2");
const { loadWebSocketSettings, messagingInsertNew, loadWebSocketMessages } = require("../scripts/messaging-handlers");

jest.mock("mysql2", function () {
    const mockConnection = {
        connect: jest.fn(),
        query: jest.fn()
    };

    return {
        createConnection: jest.fn(function () {
            return mockConnection;
        })
    };
});

describe("loadWebSocketSettings tests", function () {
    const mockRequest = {
        body: {
            id: 1
        }
    };
    it("handle a successful query and return settings", function () {
        const mockResponse = {
            json: jest.fn()
        };

        const webSocketSettings = [
            [
                {
                    EMAIL: "daniel@gmail.com",
                    ID: 2,
                    NAME: "Daniel Nunes",
                    ROLE: "A",
                    USERNAME: "nunesd"
                },
                {
                    EMAIL: "teste@teste.com",
                    ID: 3,
                    NAME: "Teste",
                    ROLE: "A",
                    USERNAME: "Teste"
                }
            ],
            [],
            [{ DATE_NOW: "16-NOV-2023" }]
        ];

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, webSocketSettings);
        });

        loadWebSocketSettings(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(webSocketSettings);
    });

    it("should handle an unsuccessful query and return an empty array", function () {
        const mockResponse = {
            json: jest.fn()
        };

        mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
            callback(new Error("Database error"), null);
        });

        loadWebSocketSettings(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith([]);
    });
});

describe("messagingInsertNew tests", function () {
    const mockRequest = {
        from: 1,
        id: 0,
        message: "t",
        seen: "N",
        to: 2,
        type: "send"
    };

    it("handle a successful insert", function () {
        let result;
        const mockResponseCallback = function (value) {
            result = value;
        };

        mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
            callback(null, { insertId: 1 });
        });

        messagingInsertNew(mockRequest, mockResponseCallback);
        expect(result).toBeGreaterThan(0);
    });

    it("handle a message request with missing data", function () {
        let result;
        const mockRequest = {};
        const mockResponseCallback = function (value) {
            result = value;
        };

        mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
            callback(null, { insertId: -1 });
        });

        messagingInsertNew(mockRequest, mockResponseCallback);

        expect(result).toBeLessThan(0);
    });

    it("should handle an unsuccessful query anr return -1", function () {
        let result;
        const mockResponseCallback = function (value) {
            result = value;
        };

        mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
            callback(new Error("Database error"), null);
        });

        messagingInsertNew(mockRequest, mockResponseCallback);

        expect(result).toBeLessThan(0);
    });
});

describe("loadWebSocketMessages tests", function () {
    it("handle a successful query and return the messages", function () {
        const mockRequest = {
            body: {
                id: 1
            }
        };
        const mockResponse = {
            json: jest.fn()
        };
        const socketMessages = [
            {
                "MESSAGE_SENT_BY": 1,
                "MESSAGE_TO_ID": 3,
                "USERNAME_TO": "Teste",
                "MESSAGE_FROM_ID": 1,
                "USERNAME_FROM": "renatoreis",
                "MESSAGE": "1",
                "DATE_CREATED": "16-NOV-2023 17:24:13",
                "SEEN": "N",
                "MESSAGE_ID": 3
            },
            {
                "MESSAGE_SENT_BY": 1,
                "MESSAGE_TO_ID": 3,
                "USERNAME_TO": "Teste",
                "MESSAGE_FROM_ID": 1,
                "USERNAME_FROM": "renatoreis",
                "MESSAGE": "2",
                "DATE_CREATED": "16-NOV-2023 17:24:13",
                "SEEN": "N",
                "MESSAGE_ID": 4
            },
            {
                "MESSAGE_SENT_BY": 1,
                "MESSAGE_TO_ID": 3,
                "USERNAME_TO": "Teste",
                "MESSAGE_FROM_ID": 1,
                "USERNAME_FROM": "renatoreis",
                "MESSAGE": "3",
                "DATE_CREATED": "16-NOV-2023 17:24:13",
                "SEEN": "N",
                "MESSAGE_ID": 5
            },
            {
                "MESSAGE_SENT_BY": 1,
                "MESSAGE_TO_ID": 2,
                "USERNAME_TO": "nunesd",
                "MESSAGE_FROM_ID": 1,
                "USERNAME_FROM": "renatoreis",
                "MESSAGE": "1",
                "DATE_CREATED": "16-NOV-2023 17:24:00",
                "SEEN": "N",
                "MESSAGE_ID": 2
            },
            {
                "MESSAGE_SENT_BY": 1,
                "MESSAGE_TO_ID": 2,
                "USERNAME_TO": "nunesd",
                "MESSAGE_FROM_ID": 1,
                "USERNAME_FROM": "renatoreis",
                "MESSAGE": "1",
                "DATE_CREATED": "16-NOV-2023 06:24:46",
                "SEEN": "N",
                "MESSAGE_ID": 1
            }
        ];

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, socketMessages);
        });

        loadWebSocketSettings(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(socketMessages);
    });

    it("should handle an unsuccessful query and return an empty array", function () {
        const mockRequest = {
            body: {
                id: 1
            }
        };
        const mockResponse = {
            json: jest.fn()
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(new Error("Database error"), null);
        });

        loadWebSocketSettings(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith([]);
    });
});
