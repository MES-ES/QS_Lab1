//Mock LocalStorage
class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = String(value);
    }

    removeItem(key) {
        delete this.store[key];
    }
}

const localStorage = new LocalStorageMock();
module.exports.localStorage = localStorage;

const SaveUserDetails = function SaveUserDetails(user) {
    if (!localStorage) {
        return;
    }

    if (user === null) {
        localStorage.removeItem("userdetails");
        return;
    }

    localStorage.setItem("userdetails", JSON.stringify(user));
};
module.exports.SaveUserDetails = SaveUserDetails;

function getUserDetails() {
    if (!localStorage) {
        return null;
    }

    const user = localStorage.getItem("userdetails");

    if (!user) {
        return null;
    }

    return JSON.parse(user);
}
module.exports.getUserDetails = getUserDetails;

const saveClientsLocalStorage = function saveClientsLocalStorage(clients) {
    if (!localStorage) {
        return;
    }

    if (clients === null) {
        localStorage.removeItem("clients");
        return;
    }

    localStorage.setItem("clients", JSON.stringify(clients));
};
module.exports.saveClientsLocalStorage = saveClientsLocalStorage;

const getClientsLocalStorage = function getClientsLocalStorage() {
    if (!localStorage) {
        return [];
    }

    const clients = localStorage.getItem("clients");

    if (!clients) {
        return [];
    }

    return JSON.parse(clients);
};
module.exports.getClientsLocalStorage = getClientsLocalStorage;

const saveUsersLocalStorage = function saveUsersLocalStorage(users) {
    if (!localStorage) {
        return;
    }

    if (users === null) {
        localStorage.removeItem("users");
        return;
    }

    localStorage.setItem("users", JSON.stringify(users));
};
module.exports.saveUsersLocalStorage = saveUsersLocalStorage;

const getUsersLocalStorage = function getUsersLocalStorage() {
    if (!localStorage) {
        return [];
    }

    const users = localStorage.getItem("users");

    if (!users) {
        return [];
    }

    return JSON.parse(users);
};
module.exports.getUsersLocalStorage = getUsersLocalStorage;

const saveUserJobsLocalStorage = function saveUserJobsLocalStorage(jobs) {
    if (!localStorage) {
        return;
    }

    if (jobs === null) {
        localStorage.removeItem("user_jobs");
        return;
    }

    localStorage.setItem("user_jobs", JSON.stringify(jobs));
};
module.exports.saveUserJobsLocalStorage = saveUserJobsLocalStorage;

const getUserJobsLocalStorage = function getUserJobsLocalStorage() {
    if (!localStorage) {
        return [];
    }

    const jobs = localStorage.getItem("user_jobs");

    if (!jobs) {
        return [];
    }

    return JSON.parse(jobs);
};
module.exports.getUserJobsLocalStorage = getUserJobsLocalStorage;

const resetLocalStorage = function resetLocalStorage() {
    saveClientsLocalStorage(null);
    SaveUserDetails(null);
    saveUsersLocalStorage(null);
    saveUserJobsLocalStorage(null);
};
module.exports.resetLocalStorage = resetLocalStorage;
