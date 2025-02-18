const crypto = require("node:crypto");

const { OPERATIONS, PARAMETERS, DESCRIPTIONS } = require("./constants");

function get_current_date() {
    return new Date().toISOString().replace("T"," ").substring(0, 19);
}

function filter_object_by_values(object, callback) {
    return Object.fromEntries(Object.entries(object).filter(([_key, value]) => callback(value)));
}


// Random id generator

function get_new_id() {
    const buffer = crypto.randomBytes(4);
    return buffer.readUIntBE(0, 4);
}

// Functions for formatting the logs

function get_pad(array) {
    return Math.max(...array.map(item => item.length)) + 2;
}

function group_operation_data(index) {
    return "- " + OPERATIONS[index].padEnd(get_pad(OPERATIONS), " ") + PARAMETERS[index].padEnd(get_pad(PARAMETERS), " ") + DESCRIPTIONS[index];
}


module.exports = {
    get_current_date,
    filter_object_by_values,
    get_new_id,
    group_operation_data
};