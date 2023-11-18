const {
    localStorage,
    saveUsersLocalStorage,
    getUsersLocalStorage,
    SaveUserDetails,
    saveClientsLocalStorage,
    getClientsLocalStorage,
    resetLocalStorage
} = require("./localStorage-code");

module.exports.localStorage = localStorage;

//#region Clients
module.exports.getClientsAjax = function getClientsAjax(callback) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", "/api/getClients", true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const { clients } = xhr.response;
            saveClientsLocalStorage(clients);
            callback(clients);
        } else if (this.readyState === 4) {
            // console.log(this.status);
            // console.log(this.statusText);

            const clients = getClientsLocalStorage();
            callback(clients);
        }
    };
    xhr.send();
};

module.exports.editClientAjax = function editClientAjax(client, callback) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("PUT", "/api/editClient", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(xhr.response.success);
        } else if (this.readyState === 4) {
            // console.log(this.status);
            // console.log(this.statusText);
            callback(false);
        }
    };
    xhr.send(JSON.stringify(client));
};

module.exports.deleteClientAjax = function deleteClientAjax(id, callback) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("DELETE", `/api/deleteClient/${id}`, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(true);
        } else if (this.readyState === 4) {
            // console.log(this.status);
            // console.log(this.statusText);
            callback(false);
        }
    };
    xhr.send();
};

module.exports.createClientAjax = function createClientAjax(client, callback) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "/api/createClient", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(true);
        } else if (this.readyState === 4) {
            // console.log(this.status);
            // console.log(this.statusText);
            callback(false);
        }
    };
    xhr.send(JSON.stringify(client));
};
//#endregion

//#region Helper
module.exports.logOutAjax = function logOutAjax(callback) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", "/api/logout", true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            resetLocalStorage();
            callback(true);
        } else if (this.readyState === 4) {
            callback(false);
        }
    };
    xhr.send();
};
//#endregion

//#region Login
module.exports.loginAjax = function loginAjax(login, password, callback) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "/api/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            SaveUserDetails(xhr.response);
            callback(true);
        } else if (this.readyState === 4) {
            // console.log(this.status);
            // console.log(this.statusText);
            callback(false);
        }
    };
    xhr.send(JSON.stringify({ login: login, password: password }));
};
//#endregion

//#region Users
module.exports.getUsersAjax = function getUsersAjax(callback) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", "/api/getUsers", true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const { users } = xhr.response;
            saveUsersLocalStorage(users);
            callback(users);
        } else if (this.readyState === 4) {
            // console.log(this.status);
            // console.log(this.statusText);

            const users = getUsersLocalStorage();
            callback(users);
        }
    };
    xhr.send();
};

module.exports.createUserAjax = function createUserAjax(user, callback) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "/api/createUser", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(true);
        } else if (this.readyState === 4) {
            // console.log(this.status);
            // console.log(this.statusText);
            callback(false);
        }
    };
    xhr.send(JSON.stringify(user));
};

module.exports.deleteUserAjax = function deleteUserAjax(id, callback) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("DELETE", `/api/deleteUser/${id}`, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(true);
        } else if (this.readyState === 4) {
            // console.log(this.status);
            // console.log(this.statusText);
            callback(false);
        }
    };
    xhr.send();
};

module.exports.editUserAjax = function editUserAjax(user, callback) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("PUT", "/api/editUser", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(xhr.response.success);
        } else if (this.readyState === 4) {
            // console.log(this.status);
            // console.log(this.statusText);
            callback(false);
        }
    };
    xhr.send(JSON.stringify(user));
};

module.exports.loadPageSettingsAjax = function loadPageSettingsAjax(callback) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", "/api/getPageSettings", true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(xhr.response.pageSettings);
        } else if (this.readyState === 4) {
            console.log(this.status);
            console.log(this.statusText);
            callback([]);
        }
    };
    xhr.send();
};
//#endregion
