const { Command } = require("commander");

const commands = require("./commands");

const default_file = "data/expenses.json";

const program = new Command();
program.exitOverride(() => {throw new Error("")});

program
    .name("Expense Tracker CLI")
    .description("Expense Tracker CLI")
    .version("1.0.0");

program
    .command("add")
    .description("add an expense to the tracker")
    .requiredOption("-d, --description <description>", "expenses should be descriptive")
    .requiredOption("-a, --amount <number>", "represents a value in dollars")
    .option("-c, --category <category>", "categories should be relevant and descriptive", "-")
    .action(options => {
        commands.add(options.description, options.amount, options.category);
    });

program
    .command("exit")
    .description("exits the CLI")
    .action(() => {
        commands.exit();
    });

program
    .command("list")
    .description("list the expenses that has a category - if no category is provided, lists all the expenses")
    .option("-c, --category <category>", "the category the expenses must be part of to be listed", "-")
    .action(options => {
        commands.list(options.category);
    });

program
    .command("load")
    .description("loads a file with expenses")
    .argument("[filename]", "the file to load", default_file)
    .action(filename => {
        commands.load(filename);
    });

program
    .command("remove")
    .description("remove an expense from the tracker")
    .argument("<id>", "the id of the expense to remove")
    .action(id => {
        commands.remove(id);
    });

program
    .command("save")
    .description("save the expense tracker data in a file")
    .argument("[filename]", "the file where to save the expenses", default_file)
    .action(filename => {
        commands.save(filename);
    });

program
    .command("set-max-budget")
    .description("set the maximum budget for a month")
    .requiredOption("-b, --budget <number>", "the maximum budget")
    .option("-m, --month <month>", "the month to set the maximum budget (a number from 1 to 12)", `${new Date().getMonth() + 1}`)
    .action(options => {
        commands.set_max_budget(options.budget, options.month);
    });

program
    .command("show-max-budget")
    .description("show the maximum budget for a month - if no month is provided, shows all maximum budgets")
    .option("-m, --month [month]", "the month which maximum budget to show")
    .action(options => {
        commands.show_max_budget(options.month);
    });

program
    .command("summary")
    .description("summarize the expenses in a month - if no month is provided, summarizes all the expenses")
    .option("-m, --month [month]", "the month which expenses to sumarize")
    .action(options => {
        commands.summary(options.month);
    })

program
    .command("update")
    .description("update an expense's description and/or amount")
    .argument("<id>", "the id of the expense to update")
    .option("-d, --description <description>", "")
    .option("-a, --amount <number>", "")
    .option("-c, --category <category>", "-")
    .action((id, options) => {
        commands.update(id, options.description, options.amount, options.category);
    });

module.exports = {
    program
}