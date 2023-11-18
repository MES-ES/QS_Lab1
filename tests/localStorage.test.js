"use strict";

const {
    localStorage,
    SaveUserDetails,
    getUserDetails,
    saveClientsLocalStorage,
    getClientsLocalStorage,
    saveUsersLocalStorage,
    getUsersLocalStorage,
    saveUserJobsLocalStorage,
    getUserJobsLocalStorage
} = require("./localStorage-code");

const userDetailsKey = "userdetails";
const clientsKey = "clients";
const usersKey = "users";
const userJobsKey = "user_jobs";

const userDetails = {
    email: "renato@gmail.com",
    id: 1,
    name: "Alcirio Reis",
    roleCode: "A",
    roleDescription: "Administrador",
    userName: "renatoreis"
};

const users = [
    {
        userName: "testUser1",
        name: "Test user",
        email: "test@test.com",
        password: "123456",
        roleCode: "A"
    },
    {
        userName: "testUser2",
        name: "Test user2",
        email: "test2@test.com",
        password: "123456",
        roleCode: "A"
    }
];

const clients = [
    {
        id: 1,
        name: "Amália Rosário",
        address: "Rua grande",
        postCode: "6000",
        email: 'amalia_rosario@email.com"',
        nif: "123",
        TOTAL_JOBS: 0,
        TOTAL_JOBS_FINALISED: 0
    },
    {
        id: 2,
        name: "Joaquim Antunes",
        address: "Rua da eira",
        postCode: "6001",
        email: 'joaquim_antunes@email.com"',
        nif: "1234",
        TOTAL_JOBS: 0,
        TOTAL_JOBS_FINALISED: 0
    }
];

const userJobs = [
    {
        CLIENT_EMAIL: "amalia_rosario@email.com",
        CLIENT_NAME: "Amália Rosário",
        CLIENT_NIF: "123",
        DATE_FINISHED: "-",
        DATE_STARTED: "23-OCT-2023 18:26",
        EQUIPMENT_BRAND: "1",
        EQUIPMENT_BRAND_DESCRIPTION: "iPhone",
        EQUIPMENT_PROCEDURE: "1",
        EQUIPMENT_PROCEDURE_DESCRIPTION: "Substituir bateria",
        EQUIPMENT_TYPE: "1",
        EQUIPMENT_TYPE_DESCRIPTION: "Telefone",
        JOB_ID: 1,
        NOTES: "-",
        PRIORITY_CODE: "4",
        PRIORITY_DESCRIPTION: "Prioridade baixa",
        PRIORITY_WORK: 1,
        STATUS_PROGRESS_CODE: "1",
        STATUS_PROGRESS_DESCRIPTION: "Em progresso",
        USER_FINALISED: null,
        USER_ID_CREATED: 2,
        USER_NAME_CREATED: "Daniel Nunes"
    },
    {
        CLIENT_EMAIL: "antonio_pedro@email.com",
        CLIENT_NAME: "António Pedro",
        CLIENT_NIF: "8411251",
        DATE_FINISHED: "-",
        DATE_STARTED: "23-OCT-2023 18:27",
        EQUIPMENT_BRAND: "1",
        EQUIPMENT_BRAND_DESCRIPTION: "iPhone",
        EQUIPMENT_PROCEDURE: "1",
        EQUIPMENT_PROCEDURE_DESCRIPTION: "Substituir bateria",
        EQUIPMENT_TYPE: "1",
        EQUIPMENT_TYPE_DESCRIPTION: "Telefone",
        JOB_ID: 2,
        NOTES: "-",
        PRIORITY_CODE: "4",
        PRIORITY_DESCRIPTION: "Prioridade baixa",
        PRIORITY_WORK: 5,
        STATUS_PROGRESS_CODE: "2",
        STATUS_PROGRESS_DESCRIPTION: "Pendente",
        USER_FINALISED: null,
        USER_ID_CREATED: 2,
        USER_NAME_CREATED: "Daniel Nunes"
    },
    {
        CLIENT_EMAIL: "amalia_rosario@email.com",
        CLIENT_NAME: "Amália Rosário",
        CLIENT_NIF: "123",
        DATE_FINISHED: "-",
        DATE_STARTED: "17-NOV-2023 05:32",
        EQUIPMENT_BRAND: "1",
        EQUIPMENT_BRAND_DESCRIPTION: "iPhone",
        EQUIPMENT_PROCEDURE: "1",
        EQUIPMENT_PROCEDURE_DESCRIPTION: "Substituir bateria",
        EQUIPMENT_TYPE: "1",
        EQUIPMENT_TYPE_DESCRIPTION: "Telefone",
        JOB_ID: 3,
        NOTES: "Teste",
        PRIORITY_CODE: "4",
        PRIORITY_DESCRIPTION: "Prioridade baixa",
        PRIORITY_WORK: 6,
        STATUS_PROGRESS_CODE: "1",
        STATUS_PROGRESS_DESCRIPTION: "Em progresso",
        USER_FINALISED: null,
        USER_ID_CREATED: 1,
        USER_NAME_CREATED: "Alcirio Reis"
    }
];

//CAUTION: DO NOT IMPLEMENT WITH 'beforeEach' Due to the way Jest execute tests (because of mocks and parallelism among others), it's not safe to assign outside variables in beforeEach and friends.
describe("SaveUserDetails function test", function () {
    it("SaveUserDetails with user to localStorage", function () {
        localStorage.clear();
        SaveUserDetails(userDetails);
        expect(localStorage.getItem(userDetailsKey)).toEqual(JSON.stringify(userDetails));
    });

    it("SaveUserDetails with no user to localStorage", function () {
        localStorage.clear();
        SaveUserDetails({});
        expect(localStorage.getItem(userDetailsKey)).toEqual(JSON.stringify({}));
    });

    it("SaveUserDetails with null to localStorage", function () {
        localStorage.clear();
        SaveUserDetails(null);
        expect(localStorage.getItem(userDetailsKey)).toEqual(null);
    });
});

//CAUTION: DO NOT IMPLEMENT WITH 'beforeEach' Due to the way Jest execute tests (because of mocks and parallelism among others), it's not safe to assign outside variables in beforeEach and friends.
describe("getUserDetails function test", function () {
    it("getUserDetails with user in localStorage", function () {
        localStorage.clear();
        localStorage.setItem(userDetailsKey, JSON.stringify(userDetails));
        expect(getUserDetails()).toEqual(userDetails);
    });

    it("getUserDetails with no user in localStorage", function () {
        localStorage.clear();
        expect(getUserDetails()).toEqual(null);
    });
});

//CAUTION: DO NOT IMPLEMENT WITH 'beforeEach' Due to the way Jest execute tests (because of mocks and parallelism among others), it's not safe to assign outside variables in beforeEach and friends.
describe("saveClientsLocalStorage function test", function () {
    it("saveClientsLocalStorage with clients to localStorage", function () {
        localStorage.clear();
        saveClientsLocalStorage(clients);
        expect(localStorage.getItem(clientsKey)).toEqual(JSON.stringify(clients));
    });

    it("saveClientsLocalStorage with no clients to localStorage", function () {
        localStorage.clear();
        saveClientsLocalStorage([]);
        expect(localStorage.getItem(clientsKey)).toEqual(JSON.stringify([]));
    });

    it("saveClientsLocalStorage with null value to localStorage", function () {
        localStorage.clear();
        saveClientsLocalStorage(null);
        expect(localStorage.getItem(clientsKey)).toEqual(null);
    });
});

//CAUTION: DO NOT IMPLEMENT WITH 'beforeEach' Due to the way Jest execute tests (because of mocks and parallelism among others), it's not safe to assign outside variables in beforeEach and friends.
describe("getClientsLocalStorage function test", function () {
    it("getClientsLocalStorage with user in localStorage", function () {
        localStorage.clear();
        localStorage.setItem(clientsKey, JSON.stringify(clients));
        expect(getClientsLocalStorage()).toEqual(clients);
    });

    it("getClientsLocalStorage with no user in localStorage", function () {
        localStorage.clear();
        expect(getClientsLocalStorage()).toEqual([]);
    });
});

//CAUTION: DO NOT IMPLEMENT WITH 'beforeEach' Due to the way Jest execute tests (because of mocks and parallelism among others), it's not safe to assign outside variables in beforeEach and friends.
describe("saveUsersLocalStorage function test", function () {
    it("saveUsersLocalStorage with users to localStorage", function () {
        localStorage.clear();
        saveUsersLocalStorage(users);
        expect(localStorage.getItem(usersKey)).toEqual(JSON.stringify(users));
    });

    it("saveUsersLocalStorage with no users to localStorage", function () {
        localStorage.clear();
        saveUsersLocalStorage([]);
        expect(localStorage.getItem(usersKey)).toEqual(JSON.stringify([]));
    });

    it("saveUsersLocalStorage with null value to localStorage", function () {
        localStorage.clear();
        saveUsersLocalStorage(null);
        expect(localStorage.getItem(usersKey)).toEqual(null);
    });
});

//CAUTION: DO NOT IMPLEMENT WITH 'beforeEach' Due to the way Jest execute tests (because of mocks and parallelism among others), it's not safe to assign outside variables in beforeEach and friends.
describe("getUsersLocalStorage function test", function () {
    it("getUsersLocalStorage with user in localStorage", function () {
        localStorage.clear();
        localStorage.setItem(usersKey, JSON.stringify(users));
        expect(getUsersLocalStorage()).toEqual(users);
    });

    it("getUsersLocalStorage with no user in localStorage", function () {
        localStorage.clear();
        expect(getUsersLocalStorage()).toEqual([]);
    });
});

//CAUTION: DO NOT IMPLEMENT WITH 'beforeEach' Due to the way Jest execute tests (because of mocks and parallelism among others), it's not safe to assign outside variables in beforeEach and friends.
describe("saveUserJobsLocalStorage function test", function () {
    it("saveUserJobsLocalStorage with user jobs to localStorage", function () {
        localStorage.clear();
        saveUserJobsLocalStorage(userJobs);
        expect(localStorage.getItem(userJobsKey)).toEqual(JSON.stringify(userJobs));
    });

    it("saveUserJobsLocalStorage with no user job to localStorage", function () {
        localStorage.clear();
        saveUserJobsLocalStorage({});
        expect(localStorage.getItem(userJobsKey)).toEqual(JSON.stringify({}));
    });

    it("saveUserJobsLocalStorage with null to localStorage", function () {
        localStorage.clear();
        saveUserJobsLocalStorage(null);
        expect(localStorage.getItem(userJobsKey)).toEqual(null);
    });
});

//CAUTION: DO NOT IMPLEMENT WITH 'beforeEach' Due to the way Jest execute tests (because of mocks and parallelism among others), it's not safe to assign outside variables in beforeEach and friends.
describe("getUserJobsLocalStorage function test", function () {
    it("getUserJobsLocalStorage with user jobs in localStorage", function () {
        localStorage.clear();
        localStorage.setItem(userJobsKey, JSON.stringify(userJobs));
        expect(getUserJobsLocalStorage()).toEqual(userJobs);
    });

    it("getUserJobsLocalStorage with no user jobs in localStorage", function () {
        localStorage.clear();
        expect(getUserJobsLocalStorage()).toEqual([]);
    });
});
