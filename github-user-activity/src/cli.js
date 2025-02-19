const constants = require("../utils/basic_constants");
const aux = require("../utils/auxiliar");
const commands = require("./commands");

function get_args(input) {
    if (!aux.valid_username(input) && input !== constants.HELP_COMMAND && input !== constants.EXIT_COMMAND) {
        throw new Error(constants.INVALID_USERNAME_ERROR_MESSAGE);
    }

    return input;
}

async function execute(command) {
    if (command === constants.HELP_COMMAND) {
        commands.help();
    } else if (command === constants.EXIT_COMMAND) {
        commands.exit();
    }  else {
        await commands.display_user_activity(command);
    }
}

module.exports = {
    get_args,
    execute
}