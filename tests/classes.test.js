"use strict";

const { Client, User, JobInfo, JobTyperequest, MessageSocket } = require("./classes-code");

describe("Validate Client Class", function () {
    const emptyClient = {
        id: undefined,
        name: undefined,
        address: undefined,
        postCode: undefined,
        email: undefined,
        nif: undefined
    };
    it("constructor without values", function () {
        let client = new Client();
        expect(Object.entries(client)).toMatchObject(Object.entries(emptyClient));
    });

    it("constructor with values", function () {
        let client = new Client(1, "Teste", "Rua Teste", "1000-001", "teste@teste.com", 999999999);
        let expectedClient = {
            id: 1,
            name: "Teste",
            address: "Rua Teste",
            postCode: "1000-001",
            email: "teste@teste.com",
            nif: 999999999
        };

        expect(Object.entries(client)).not.toEqual(Object.entries(emptyClient));
        expect(Object.entries(client)).toEqual(Object.entries(expectedClient)); //Compare all key values pairs
    });
});

describe("Validate User Class", function () {
    const defaultUser = {
        id: undefined,
        userName: undefined,
        name: undefined,
        email: undefined,
        role: undefined,
        password: undefined
    };
    it("constructor without values", function () {
        let user = new User();
        expect(Object.entries(user)).toEqual(Object.entries(defaultUser));
    });

    it("constructor with values", function () {
        let user = new User(1, "teste", "Teste", "teste@teste.com", "A", "123456");
        let expectedUser = {
            id: 1,
            userName: "teste",
            name: "Teste",
            email: "teste@teste.com",
            role: "A",
            password: "123456"
        };

        expect(Object.entries(user)).not.toEqual(Object.entries(defaultUser));
        expect(Object.entries(user)).toEqual(Object.entries(expectedUser));
    });
});

describe("Validate JobInfo Class", function () {
    var defaultJobInfo = {
        id: undefined,
        userId: 0,
        userIdClient: 0,
        status: "",
        equipmentType: "",
        equipmentBrand: "",
        equipmentTypeOther: "",
        equipmentProcedure: "",
        equipmentProcedureOther: "",
        notes: "",
        dateFinished: null,
        dateStarted: null,
        priority: "1",
        priorityWork: "0"
    };

    it("constructor without values", function () {
        let jobInfo = new JobInfo();
        expect(Object.entries(jobInfo)).toEqual(Object.entries(defaultJobInfo));
    });

    it("constructor with values", function () {
        let jobInfo = new JobInfo(1);
        let expectedJobInfo = Object.assign({}, defaultJobInfo);
        expectedJobInfo.id = 1;
        expect(Object.entries(jobInfo)).not.toEqual(Object.entries(defaultJobInfo));
        expect(Object.entries(jobInfo)).toEqual(Object.entries(expectedJobInfo));
    });
});

describe("Validate JobTyperequest Class", function () {
    var defaultJobTyperequest = {
        type: undefined,
        identifier: undefined
    };

    it("constructor without values", function () {
        let jobTyperequest = new JobTyperequest();
        expect(Object.entries(jobTyperequest)).toEqual(Object.entries(defaultJobTyperequest));
    });

    it("constructor with values", function () {
        let jobTyperequest = new JobTyperequest("ME", 1);
        let expectedJobTypeRequest = {
            type: "ME",
            identifier: 1
        };

        expect(Object.entries(jobTyperequest)).not.toEqual(Object.entries(defaultJobTyperequest));
        expect(Object.entries(jobTyperequest)).toEqual(Object.entries(expectedJobTypeRequest));
    });
});

describe("Validate MessageSocket class", function () {
    let defaultMessageSocket = {
        type: undefined,
        id: undefined,
        from: undefined,
        to: undefined,
        message: undefined,
        dateCreated: undefined,
        seen: "N"
    };

    it("constructor without values", function () {
        let messageSocket = new MessageSocket();
        expect(Object.entries(messageSocket)).toEqual(Object.entries(defaultMessageSocket));
    });

    it("constructor with values", function () {
        let creationTime = new Date();
        let messageSocket = new MessageSocket("send", 1, 1, 2, "Hello", creationTime, "N");
        let expectedMessageSocket = {
            type: "send",
            id: 1,
            from: 1,
            to: 2,
            message: "Hello",
            dateCreated: creationTime,
            seen: "N"
        };

        expect(Object.entries(messageSocket)).not.toEqual(Object.entries(defaultMessageSocket));
        expect(Object.entries(messageSocket)).toEqual(Object.entries(expectedMessageSocket));
    });
});
