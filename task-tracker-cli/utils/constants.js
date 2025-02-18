const DONE = "done";
const IN_PROGRESS = "in-progress";
const TODO = "todo";
const STATUSES = ["todo", "in-progress", "done"];
const PARAMETERS_REGEX = /'[^']*'|"[^"]*"|\S+/g;
const ID_REGEX = /^\d+$/;
const OPERATIONS = [
    "add",
    "exit",
    "help",
    "list",
    "mark-done",
    "mark-in-progress",
    "mark-todo",
    "delete",
    "update",
];
const PARAMETERS = [
    "<description:string>",
    "",
    "",
    "<status:string>",
    "",
    "",
    "",
    "<id:integer>",
    "<id:integer> <description:string>",
];
const DESCRIPTIONS = [
    "adds a new task to the tracker",
    "exits the CLI",
    "lists all allowed operations",
    "lists the indicated tasks",
    "marks a task as 'done'",
    "marks a task as 'in progress'",
    "marks a task as 'todo'",
    "removes a task from the tracker",
    "updates a task with the given description",
];

module.exports = {
    PARAMETERS_REGEX,
    STATUSES,
    OPERATIONS,
    PARAMETERS,
    DESCRIPTIONS,
    ID_REGEX,
    DONE,
    IN_PROGRESS,
    TODO
}