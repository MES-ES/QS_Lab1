"use strict";

const mysql2 = require("mysql2");
const {
    localStorage,
    getClientsAjax,
    editClientAjax,
    deleteClientAjax,
    createClientAjax,
    logOutAjax,
    loginAjax,
    getUsersAjax,
    createUserAjax,
    deleteUserAjax,
    editUserAjax,
    loadPageSettingsAjax
} = require("./requests-code");

const keys = {
    userDetails: "userdetails",
    clientsKey: "clients",
    users: "users",
    userJobs: "user_jobs"
};

const clients = {
    "clients": [
        {
            "TOTAL_JOBS": "2",
            "TOTAL_JOBS_FINALISED": "0",
            "address": "Rua grande",
            "email": "amalia_rosario@email.com",
            "id": 1,
            "name": "Amália Rosário",
            "nif": "123",
            "postCode": "6000"
        },
        {
            "TOTAL_JOBS": "0",
            "TOTAL_JOBS_FINALISED": "0",
            "address": "Rua da eira",
            "email": "joaquim_antunes@email.com",
            "id": 2,
            "name": "Joaquim Antunes",
            "nif": "1234",
            "postCode": "6001"
        },
        {
            "TOTAL_JOBS": "0",
            "TOTAL_JOBS_FINALISED": "0",
            "address": "Rua da pedregueira",
            "email": "rui_neto@email.com",
            "id": 3,
            "name": "Rui Neto",
            "nif": "12345",
            "postCode": "6002"
        },
        {
            "TOTAL_JOBS": "0",
            "TOTAL_JOBS_FINALISED": "0",
            "address": "Rua do cabeço",
            "email": "joana_martins@email.com",
            "id": 4,
            "name": "Joana Martins",
            "nif": "21235",
            "postCode": "6003"
        },
        {
            "TOTAL_JOBS": "0",
            "TOTAL_JOBS_FINALISED": "0",
            "address": "Rua do cabeço",
            "email": "pedro_filipe@email.com",
            "id": 5,
            "name": "Pedro Filipe",
            "nif": "85462412",
            "postCode": "6005"
        },
        {
            "TOTAL_JOBS": "1",
            "TOTAL_JOBS_FINALISED": "0",
            "address": "Rua das margens",
            "email": "antonio_pedro@email.com",
            "id": 6,
            "name": "António Pedro",
            "nif": "8411251",
            "postCode": "6007"
        },
        {
            "TOTAL_JOBS": "0",
            "TOTAL_JOBS_FINALISED": "0",
            "address": "Rua das margens",
            "email": "joao_rosa@email.com",
            "id": 7,
            "name": "João Rosa",
            "nif": "012536",
            "postCode": "2034"
        },
        {
            "TOTAL_JOBS": "0",
            "TOTAL_JOBS_FINALISED": "0",
            "address": "Rua das margens",
            "email": "roberto_matias@email.com",
            "id": 8,
            "name": "roberto Matias",
            "nif": "985002",
            "postCode": "5212"
        }
    ]
};

const editClient = {
    address: "Rua grande",
    email: "amalia_rosario@email.com",
    id: 1,
    name: "Amália Rosário2",
    nif: "123",
    postCode: "6000"
};

const createClient = {
    address: "teste",
    email: "teste@teste.com",
    id: null,
    name: "Teste",
    nif: "999999999",
    postCode: "1000-001"
};

const auth = {
    login: "renatoreis",
    password: "123456"
};

const invalidAuth = {
    login: "123",
    password: "123"
};

const users = {
    "users": [
        {
            "id": 1,
            "userName": "renatoreis",
            "name": "Alcirio Reis",
            "email": "renato@gmail.com",
            "roleCode": "A",
            "roleDescription": "Administrador",
            "TOTAL_JOBS": 1
        },
        {
            "id": 2,
            "userName": "nunesd",
            "name": "Daniel Nunes",
            "email": "daniel@gmail.com",
            "roleCode": "A",
            "roleDescription": "Administrador",
            "TOTAL_JOBS": 2
        },
        {
            "id": 3,
            "userName": "Teste",
            "name": "Teste",
            "email": "teste@teste.com",
            "roleCode": "A",
            "roleDescription": "Administrador",
            "TOTAL_JOBS": 0
        }
    ]
};

const createUser = {
    id: 1,
    userName: "renatoreis",
    name: "Alcirio Reis",
    email: "renato@gmail.com",
    roleCode: "A",
    roleDescription: "Administrador"
};

const editUser = {
    email: "daniel@gmail.com",
    id: 2,
    name: "Daniel Nunes2",
    password: null,
    role: "A",
    userName: "nunesd"
};

const pageSettings = {
    "pageSettings": [
        [
            {
                "domain": "USER_ROLE",
                "code": "A",
                "description": "Administrador",
                "display_order": 1
            },
            {
                "domain": "USER_ROLE",
                "code": "O",
                "description": "Operador",
                "display_order": 2
            }
        ]
    ]
};

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

describe("getClientsAjax function tests", function () {
    it("With unsuccessful request", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 500,
            response: null
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, []);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        getClientsAjax(callback);
        expect(xhrMock.open).toBeCalledWith("GET", "/api/getClients", true);
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[[]]]);
    });

    it("With successful request", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: clients
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, [clients]);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        getClientsAjax(callback);
        expect(xhrMock.open).toBeCalledWith("GET", "/api/getClients", true);
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[clients.clients]]);
    });

    it("With unsuccessful request and new users saved in localStorage", function () {
        const response = localStorage.getItem(keys["clientsKey"]);
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 500,
            response: response
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, [response]);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        getClientsAjax(callback);
        expect(xhrMock.open).toBeCalledWith("GET", "/api/getClients", true);
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[response]]);
        //FIXME: Remove after developing phase with above line
        // expect(callback.mock.calls).toEqual([[JSON.parse(response)]]);
    });
});

describe("editClientAjax function tests", function () {
    it("With successful request", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: { success: true }
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, { success: true });
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        editClientAjax(editClient, callback);
        expect(xhrMock.open).toBeCalledWith("PUT", "/api/editClient", true);
        expect(xhrMock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[true]]);
    });

    it("With unsuccessful request", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 500,
            response: { success: false }
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, { success: false });
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        editClientAjax(editClient, callback);
        expect(xhrMock.open).toBeCalledWith("PUT", "/api/editClient", true);
        expect(xhrMock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[false]]);
    });
});

describe("deleteClientAjax function tests", function () {
    it("With successful request", function () {
        const id = 1;
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: 200
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, 200);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        deleteClientAjax(id, callback);
        expect(xhrMock.open).toBeCalledWith("DELETE", `/api/deleteClient/${id}`, true);
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[true]]);
    });

    it("With unsuccessful request", function () {
        const id = 1;
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 500,
            response: 500
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, 500);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        deleteClientAjax(id, callback);
        expect(xhrMock.open).toBeCalledWith("DELETE", `/api/deleteClient/${id}`, true);
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[false]]);
    });
});

describe("createClientAjax function tests", function () {
    it("With successful request", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: 200
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, 200);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        createClientAjax(createClient, callback);
        expect(xhrMock.open).toBeCalledWith("POST", "/api/createClient", true);
        expect(xhrMock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[true]]);
    });

    it("With unsuccessful request", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 500,
            response: 500
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, 500);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        createClientAjax(createClient, callback);
        expect(xhrMock.open).toBeCalledWith("POST", "/api/createClient", true);
        expect(xhrMock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[false]]);
    });
});

describe("logOutAjax function tests", function () {
    it("With successful request", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: 200
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, 200);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        logOutAjax(callback);
        expect(xhrMock.open).toBeCalledWith("GET", "/api/logout", true);
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[true]]);

        //Assure logout cleared local storage
        Object.values(keys, function (value) {
            expect(localStorage.getItem(value).toEqual(null));
        });
    });
});

describe("loginAjax function tests", function () {
    it("With successful request and valid credentials", function () {
        const user = {
            id: 1,
            userName: "renatoreis",
            name: "Alcirio Reis",
            email: "renato@gmail.com",
            roleCode: "A",
            roleDescription: "Administrador"
        };
        const stringifiedUser = JSON.stringify(user);

        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: stringifiedUser
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, [user]);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        loginAjax(auth.login, auth.password, callback);
        expect(xhrMock.open).toBeCalledWith("POST", "/api/login", true);
        expect(xhrMock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[true]]);

        //Check if local storage was updated with correct info
        //FIXME: Error?
        // expect(JSON.parse(localStorage.getItem(keys["userDetails"]))).toEqual(user);
    });

    it("With successful request but not valid credentials", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 401,
            response: 401
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, []);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        loginAjax(auth.login, auth.password, callback);
        expect(xhrMock.open).toBeCalledWith("POST", "/api/login", true);
        expect(xhrMock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[false]]);
    });

    it("With unsuccessful request", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 500,
            response: 500
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, []);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        loginAjax(auth.login, auth.password, callback);
        expect(xhrMock.open).toBeCalledWith("POST", "/api/login", true);
        expect(xhrMock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[false]]);
    });
});

describe("getUsersAjax function tests", function () {
    it("With unsuccessful request", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 500,
            response: null
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, []);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        getUsersAjax(callback);
        expect(xhrMock.open).toBeCalledWith("GET", "/api/getUsers", true);
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[[]]]);
    });

    it("With successful request", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: users
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, [users]);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        getUsersAjax(callback);
        expect(xhrMock.open).toBeCalledWith("GET", "/api/getUsers", true);
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[users.users]]);
    });

    it("With unsuccessful request and new users saved in localStorage", function () {
        const response = localStorage.getItem(keys["users"]);
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 500,
            response: response
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, [response]);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        getUsersAjax(callback);
        expect(xhrMock.open).toBeCalledWith("GET", "/api/getUsers", true);
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[response]]);
        //FIXME: Remove after developing phase with above line
        // expect(callback.mock.calls).toEqual([[JSON.parse(response)]]);
    });
});

describe("createUserAjax function tests", function () {
    it("With successful request", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: 200
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, 200);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        createUserAjax(createUser, callback);
        expect(xhrMock.open).toBeCalledWith("POST", "/api/createUser", true);
        expect(xhrMock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[true]]);
    });

    it("With unsuccessful request", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 500,
            response: 500
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, 500);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        createUserAjax(createUser, callback);
        expect(xhrMock.open).toBeCalledWith("POST", "/api/createUser", true);
        expect(xhrMock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[false]]);
    });
});

describe("deleteUserAjax function tests", function () {
    it("With successful request", function () {
        const id = 1;
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: 200
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, 200);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        deleteUserAjax(id, callback);
        expect(xhrMock.open).toBeCalledWith("DELETE", `/api/deleteUser/${id}`, true);
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[true]]);
    });

    it("With unsuccessful request", function () {
        const id = 1;
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 500,
            response: 500
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, 500);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        deleteUserAjax(id, callback);
        expect(xhrMock.open).toBeCalledWith("DELETE", `/api/deleteUser/${id}`, true);
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[false]]);
    });
});

describe("editUserAjax function tests", function () {
    it("With successful request", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: { success: true }
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, { success: true });
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        editUserAjax(editUser, callback);
        expect(xhrMock.open).toBeCalledWith("PUT", "/api/editUser", true);
        expect(xhrMock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[true]]);
    });

    it("With unsuccessful request", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 500,
            response: { success: false }
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, { success: false });
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        editUserAjax(editUser, callback);
        expect(xhrMock.open).toBeCalledWith("PUT", "/api/editUser", true);
        expect(xhrMock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[false]]);
    });
});

describe("loadPageSettingsAjax", function () {
    it("With successful request", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: pageSettings
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, [pageSettings]);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        loadPageSettingsAjax(callback);
        expect(xhrMock.open).toBeCalledWith("GET", "/api/getPageSettings", true);
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[pageSettings.pageSettings]]);
    });

    it("With unsuccessful request", function () {
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 500,
            response: []
        };

        mysql2.createConnection().query.mockImplementationOnce(function (query, params, callback) {
            callback(null, []);
        });

        jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);
        const callback = jest.fn();
        loadPageSettingsAjax(callback);
        expect(xhrMock.open).toBeCalledWith("GET", "/api/getPageSettings", true);
        xhrMock.onreadystatechange(new Event(""));
        expect(callback.mock.calls).toEqual([[[]]]);
    });
});
