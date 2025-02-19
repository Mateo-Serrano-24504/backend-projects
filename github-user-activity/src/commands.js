const constants = require("../utils/basic_constants");
const api = require("./api_operations");

function exit() {
    console.log("Exiting the CLI...");
    process.exit(0);
}

function help() {
    console.log(constants.VALID_USERNAME_EXPLANATION);
    console.log("To exit the CLI, type --exit")
}

async function display_user_activity(username) {
    try {
        const raw_activity = await api.fetch_user_activity(username);
        const user_activity = raw_activity.map(event => event.get_content()).filter(event_content => event_content);

        if (user_activity.length) {
            console.log(`${username} relevant public activity:`)
            user_activity.forEach(event_content => console.log(event_content));
        } else {
            console.log(`The user ${username} has no relevant public activity`);
        }
    } catch (error) {
        console.error(error.message);
    }

    console.log("");
}

module.exports = {
    exit,
    help,
    display_user_activity
}