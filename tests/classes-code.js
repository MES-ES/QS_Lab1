module.exports.Client = class Client {
    constructor(id, name, address, postCode, email, nif) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.postCode = postCode;
        this.email = email;
        this.nif = nif;
    }
};

module.exports.User = class User {
    constructor(id, userName, name, email, role, password) {
        this.id = id;
        this.userName = userName;
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
    }
};

module.exports.JobInfo = class JobInfo {
    constructor(id) {
        this.id = id;
        this.userId = 0;
        this.userIdClient = 0;
        this.status = "";
        this.equipmentType = "";
        this.equipmentBrand = "";
        this.equipmentTypeOther = "";
        this.equipmentProcedure = "";
        this.equipmentProcedureOther = "";
        this.notes = "";
        this.dateFinished = null;
        this.dateStarted = null;
        this.priority = "1";
        this.priorityWork = "0";
    }
};

module.exports.JobTyperequest = class JobTyperequest {
    constructor(type, identifier) {
        this.type = type;
        this.identifier = identifier;
    }
};

module.exports.MessageSocket = class MessageSocket {
    constructor(type, id, from, to, message, dateCreated) {
        this.type = type;
        this.id = id;
        this.from = from;
        this.to = to;
        this.message = message;
        this.dateCreated = dateCreated;
        this.seen = "N";
    }
};
