"use strict";

const mysql2 = require("mysql2");
const { getUsers, createUser, deleteUser, editUser } = require("../scripts/users-handlers");
const okStatus = 200;
const errorStatus = 500;

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

describe("Create User tests", function () {
    it("handle the create user with a successful request", function () {
        const mockRequest = {
            body: {
                userName: "testUser1",
                name: "Test user",
                email: "test@test.com",
                password: "123456",
                roleCode: "A"
            }
        };

        const mockResponse = {
            sendStatus: jest.fn(),
            send: jest.fn()
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, []);
        });

        createUser(mockRequest, mockResponse);
        expect(mockResponse.sendStatus).toHaveBeenCalledWith(okStatus);
    });

    it("handle an unsuccessful query because of missing data", function () {
        const mockRequest = {
            body: {
                email: "test2@test.com",
                password: "123456"
            }
        };

        const mockResponse = {
            sendStatus: jest.fn(),
            send: jest.fn()
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(new Error("Database error"), null);
        });

        createUser(mockRequest, mockResponse);

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(errorStatus);
    });

    it("should handle an database error during the user creation process", function () {
        const mockRequest = {
            body: {
                userName: "testUser1",
                name: "Test user",
                email: "test@test.com",
                password: "123456",
                roleCode: "A"
            }
        };
        const mockResponse = {
            sendStatus: jest.fn(),
            send: jest.fn()
        };
        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(new Error("Database error"), null);
        });

        createUser(mockRequest, mockResponse);

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(500);
    });
});

describe("Edit user tests", function () {
    it("handle an successful edit user request", function () {
        const mockRequest = {
            body: {
                name: "Test user",
                email: "test@test.com",
                password: "123456",
                role: "A"
            }
        };

        const mockResponse = {
            json: jest.fn()
        };

        mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
            callback(null, { affectedRows: 1 });
        });

        editUser(mockRequest, mockResponse);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true });
    });

    it("handle a request with missing data", function () {
        const mockRequest = {
            body: {}
        };

        const mockResponse = {
            json: jest.fn()
        };

        mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
            callback(new Error("Database error"), null);
        });

        editUser(mockRequest, mockResponse);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: false });
    });

    it("should handle an error during the user edit process", function () {
        const mockRequest = {
            body: {
                id: 1,
                name: "Test user",
                email: "test@test.com",
                role: "A"
            }
        };
        const mockResponse = {
            sendStatus: jest.fn(),
            send: jest.fn(),
            json: jest.fn()
        };
        mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
            callback(new Error("Database error"), null);
        });

        editUser(mockRequest, mockResponse);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: false });
    });
});

describe("Delete User Tests", function () {
    const mockRequest = {
        params: {
            id: 1
        }
    };

    it("handle a delete user successful request", function () {
        const mockResponse = {
            sendStatus: jest.fn()
        };

        mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
            callback(null, { affectedRows: 1 });
        });

        deleteUser(mockRequest, mockResponse);

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(okStatus);
    });

    it("handle an unsuccessful user delete because of missing data", function () {
        const mockRequestEmpty = {};
        //CAUTION: Because query
        const mockResponse = {
            sendStatus: jest.fn()
        };
        const mockResponseSafeguard = {
            sendStatus: jest.fn()
        };

        mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
            callback(new Error("Database error"), null);
        });

        deleteUser(mockRequest, mockResponseSafeguard); //CAUTION: Because previous call didn't reach the query carries to another unit test
        deleteUser(mockRequestEmpty, mockResponse);

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(errorStatus);
    });

    it("should handle an error during the user delete process", function () {
        const mockRequest = {
            params: {
                id: 1
            }
        };
        const mockResponse = {
            sendStatus: jest.fn()
        };

        mysql2.createConnection().query.mockImplementationOnce(function (_query, _params, callback) {
            callback(new Error("Database error"), null);
        });

        deleteUser(mockRequest, mockResponse);

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(errorStatus);
    });
});

describe("Get User Tests", function () {
    it("handle a request with only a single user", function () {
        const mockRequest = {};
        const mockResponse = {
            json: jest.fn()
        };

        const user = {
            "id": 1,
            "userName": "Teste",
            "name": "Teste",
            "email": "teste@teste.com",
            "roleCode": "A",
            "roleDescription": "Administrador",
            "TOTAL_JOBS": 0
        };

        //CAUTION: No param argument because query has no parameters
        mysql2.createConnection().query.mockImplementationOnce(function (query, callback) {
            callback(null, [user]);
        });

        getUsers(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith({ users: [user] });
    });

    it("handle a get all user requests with multiple users", function () {
        const mockRequest = {};
        const mockResponse = {
            json: jest.fn()
        };

        const users = [
            {
                "id": 1,
                "userName": "Teste",
                "name": "Teste",
                "email": "teste@teste.com",
                "roleCode": "A",
                "roleDescription": "Administrador",
                "TOTAL_JOBS": 0
            },
            {
                "id": 2,
                "userName": "Teste2",
                "name": "Teste2",
                "email": "teste2@teste.com",
                "roleCode": "A",
                "roleDescription": "Administrador",
                "TOTAL_JOBS": 0
            }
        ];

        //CAUTION: No param argument because query has no parameters
        mysql2.createConnection().query.mockImplementationOnce(function (query, callback) {
            callback(null, [users]);
        });

        getUsers(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith({ users: [users] });
    });

    it("handle a get all users with no users", function () {
        const mockRequest = {};
        const mockResponse = {
            json: jest.fn()
        };

        //CAUTION: No param argument because query has no parameters
        mysql2.createConnection().query.mockImplementationOnce(function (query, callback) {
            callback(null, []);
        });

        getUsers(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith({ users: [] });
    });

    it("handle a get all users when a database error ocurred", function () {
        const mockRequest = {};
        const mockResponse = {
            json: jest.fn()
        };

        //CAUTION: No param argument because query has no parameters
        mysql2.createConnection().query.mockImplementationOnce(function (query, callback) {
            callback(new Error("Database error"), null);
        });

        getUsers(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith({ users: [] });
    });
});
