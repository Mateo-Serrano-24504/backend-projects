const readline = require("node:readline");

const cli = require("./cli");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> github-activity "
});

rl.prompt();

rl.on("line", async (input) => {
    try {
        const command = cli.get_args(input);
        await cli.execute(command);
    } catch (error) {
        console.error(error.message, "\n");
    }

    rl.prompt();
})