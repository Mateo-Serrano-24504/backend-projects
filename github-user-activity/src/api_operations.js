const events_ops = require("../utils/events_operations")
const constants = require("../utils/basic_constants");

async function fetch_user_activity(user) {
    const raw_user_data = await fetch(`https://api.github.com/users/${user}/events`);

    if (!raw_user_data.ok) {
        throw new Error(constants.NON_EXISTENT_USERNAME_ERROR_MESSAGE(user));
    }

    const user_data = await raw_user_data.json();

    return user_data.map(event => events_ops.convert_to_event(event));
}

module.exports = {
    fetch_user_activity
}