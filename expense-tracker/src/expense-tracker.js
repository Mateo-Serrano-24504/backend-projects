const readline = require("node:readline");

const { input_regex } = require("../utils/regexes");
const { program } = require("./args");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "$ "
});

rl.prompt();

rl.on("line", input => {
    try {
        program.parse(input.match(input_regex), { from: "user" })
    } catch (error) {
        console.error(error.message);
    }

    rl.prompt();
});