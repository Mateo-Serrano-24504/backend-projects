const { PARAMETERS_REGEX, ID_REGEX } = require("./constants");

function is_id(string) {
    return ID_REGEX.test(string);
}

function is_null(string) {
    return string === null;
}

function is_quoted(string) {
    return (string.startsWith("'") && string.endsWith("'")) || (string.startsWith('"') && string.endsWith('"'));
}

function unquote_string(string) {
    if (is_quoted(string)) {
        return string.slice(1, -1);
    }

    return string;
}

function check_args_length(line) {

    if (line.length > 3) {
        throw new Error(`Invalid number of arguments: expected 2 or less arguments, but ${Math.max(line.length - 1, 0)} were given.`);
    } else if (!line.length) {
        throw new Error(`Invalid number of arguments: no operation was given.`);
    }
}

function check_args_format(command) {
    if (!is_null(command.task_id) && !is_id(command.task_id)) {
        throw new Error("Invalid arguments: a task id must be a number.");
    }
    if (!is_null(command.task_string) && !is_quoted(command.task_string) && command.op !== "list") {
        throw new Error("Invalid arguments: a task description must be quoted.");
    }
    if (!is_null(command.task_string) && is_quoted(command.task_string) && command.op === "list") {
        throw new Error("Invalid arguments: statuses must not be quoted.");
    }
}

function assign_parameters_values(line) {
    const operation = line[0];
    let task_id = null;
    let task_string = null;
    if (line.length === 2) {
        if (is_id(line[1])) {
            task_id = line[1];
        } else {
            task_string = line[1];
        }
    } else if (line.length === 3) {
        task_id = line[1];
        task_string = line[2];
    }
    return {
        op: operation,
        task_id,
        task_string
    };
}

function get_command(input) {
    const line = input.match(PARAMETERS_REGEX);

    try {
        check_args_length(line);
    } catch (error) {
        throw error;
    }

    const command = assign_parameters_values(line);
    check_args_format(command);

    return command;
}

module.exports = {
    is_id,
    is_null,
    get_command,
}