const VALID_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const VALID_USERNAME_EXPLANATION = "A valid GitHub username must:\n\t- Have between 1 and 39 alphanumeric characters or hyphens (-)\n\t- Not have two or more consecutive hyphens\n\t- Not start or end with a hyphen\n";
const INVALID_USERNAME_ERROR_MESSAGE = "Invalid username: to know what a valid GitHub username looks like, try typing '--help'";
const NON_EXISTENT_USERNAME_ERROR_MESSAGE = username => `Invalid username: the user ${username} does not exist`;
const HELP_COMMAND = "--help";
const EXIT_COMMAND = "--exit";

module.exports = {
    VALID_USERNAME_REGEX,
    VALID_USERNAME_EXPLANATION,
    INVALID_USERNAME_ERROR_MESSAGE,
    NON_EXISTENT_USERNAME_ERROR_MESSAGE,
    HELP_COMMAND,
    EXIT_COMMAND
}