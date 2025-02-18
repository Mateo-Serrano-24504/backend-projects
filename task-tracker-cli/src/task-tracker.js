const { execute } = require("../utils/commands");
const { get_command } = require("../utils/args");

const readline_module = require("node:readline");

const readline = readline_module.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "task-tracker ",
});

readline.prompt();

readline.on("line", input => {
    try {
        const command = get_command(input);
        execute(command);
    } catch (error) {
        console.error(error.message, '\n');
    }

    readline.prompt();
});