const { STATUSES, OPERATIONS, IN_PROGRESS, TODO, DONE } = require("./constants");
const { is_id, is_null  } = require("./args");
const { add_task_to_file, update_task_at_file, delete_task_from_file, load_tasks_from_file } = require("./task_file");
const { get_current_date, filter_object_by_values, get_new_id, group_operation_data } = require("./auxiliar");

function help({ task_id, task_string }) {
    if (!is_null(task_id) || !is_null(task_string)) {
        throw new Error(`Invalid arguments: 'help' operation does not accept arguments.`);
    }

    console.log("");

    for (let i = 0; i < OPERATIONS.length; i++) {
        console.log(group_operation_data(i));
    }

    console.log("");
};

function exit({ task_id, task_string }) {
    if (!is_null(task_id) || !is_null(task_string)) {
        throw new Error(`Invalid arguments: 'exit' operation does not accept arguments.`);
    }

    console.log("Exiting the CLI...");
    process.exit(0);
};

function add_task({ task_id, task_string: task_description }) {
    if (!is_null(task_id)) {
        throw new Error(`Invalid arguments: 'add' operation does not accept an id.`);
    } else if (is_null(task_description)) {
        throw new Error(`Invalid arguments: 'add' operation requires a task description.`);
    }

    const current_date = get_current_date();
    const id = get_new_id();
    add_task_to_file(
        id, 
        {
            task_description,
            task_status: "todo",
            date_of_creation: current_date,
            date_of_updating: current_date
        });

    console.log("Task added with an id of", id, "\n");
};

function update_task_description({ task_id, task_string: task_description }) {
    if (!is_id(task_id) || is_null(task_description)) {
        throw new Error(`Invalid arguments: 'update' operation requires both an id and a task description.`);
    }

    const current_date = get_current_date();
    update_task_at_file(
        task_id,
        {
            description: task_description,
            date_of_updating: current_date
        }
    );
};

function delete_task({ task_id, task_string }) {
    if (is_null(task_id)) {
        throw new Error(`Invalid arguments: 'delete' operation requires an id.`);
    } else if (!is_null(task_string)) {
        throw new Error(`Invalid arguments: 'delete' operation does not accept a string argument.`);
    }

    delete_task_from_file(task_id);
};

function mark_task(status, { task_id, task_string }) {
    if (!STATUSES.includes(status)) {
        throw new Error(`Invalid status: '${status}' is not a valid status for the 'mark' operation.`);
    } else if (is_null(task_id)) {
        throw new Error(`Invalid arguments: 'mark' operation requires an id.`);
    } else if (!is_null(task_string)) {
        throw new Error(`Invalid arguments: 'mark' operation does not accept a string argument.`);
    }

    const current_date = get_current_date();
    update_task_at_file(
        task_id,
        {
            status,
            date_of_updating: current_date
        }
    );
};

function list_tasks({ task_id, task_string: status }) {
    if (!STATUSES.includes(status) && status !== null) {
        throw new Error(`Invalid status: '${status}' is not a valid status for the 'list' operation.`);
    } else if (!is_null(task_id)) {
        throw new Error(`Invalid arguments: 'list' operation does not accept an id.`);
    }

    let tasks = load_tasks_from_file();
    if (status) {
        tasks = filter_object_by_values(tasks, task => task.status === status);
    }

    console.log("\n");
    console.log("".padEnd(40, "-"), "\n");

    for (const task_id in tasks) {
        console.log(
            `Task id: ${task_id}\n`,
            `Task description: ${tasks[task_id].description}\n`,
            `Task status: ${tasks[task_id].status}\n`,
            `Task creation date: ${tasks[task_id].date_of_creation}\n`,
            `Task last updating date: ${tasks[task_id].date_of_updating}\n`,
        )
    }

    console.log("".padEnd(40, "-"), "\n");
};

const FUNCTIONS = {
    "help": help,
    "exit": exit,
    "add": add_task,
    "update": update_task_description,
    "delete": delete_task,
    "mark-todo": args => mark_task(TODO, args),
    "mark-in-progress": args => mark_task(IN_PROGRESS, args),
    "mark-done": args => mark_task(DONE, args),
    "list": list_tasks,
}

function execute({ op, task_id, task_string }) {
    if (!OPERATIONS.includes(op)) {
        throw new Error(`Invalid operation (${op}): to know what operations are allowed, try 'help'.`);
    }

    try {
        FUNCTIONS[op]({ task_id, task_string });
    } catch (error) {
        console.error(error.message, '\n');
    }
};

module.exports = {
    execute
}