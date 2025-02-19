const constants = require("./basic_constants");

function valid_username(username) {
    return constants.VALID_USERNAME_REGEX.test(username);
}

function capitalize(string) {
    return string.at(0).toUpperCase() + string.slice(1);
}

module.exports = {
    valid_username,
    capitalize
}