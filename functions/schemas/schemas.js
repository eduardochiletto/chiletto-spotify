const Validator = require('jsonschema').Validator;

exports.userInsert = {
    "id": "/user",
    "type": "object",
    "properties": {
        "name": { type: "string", required: false },
        "email": { type: "string", required: false },
        "password": { type: "string", required: false },
        "access_token": { type: "string", required: false },
        "refresh_token": { type: "string", required: false },
    },
    "required": ["email", "password"]
}


exports.userUpdate = {
    "id": "/user",
    "type": "object",
    "properties": {
        "_id": { type: "string", required: true },
        "name": { type: "string", required: false },
        "password": { type: "string", required: false },
        "access_token": { type: "string", required: false },
        "refresh_token": { type: "string", required: false },
    },
    "required": ["_id"]
}

exports.validateJson = function (instance, schema) {
    const v = new Validator();
    const ret = v.validate(instance, schema);
    return ret;
}