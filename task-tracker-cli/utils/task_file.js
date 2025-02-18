const fs = require("node:fs");
const path = require("node:path");

const path_to_file = "data/tasks.json";

function create_file_if_not_exists(path_to_json) {
    try {
        fs.mkdirSync(path.dirname(path_to_json), { recursive: true });
        const file = fs.openSync(path_to_json, "r");
        fs.closeSync(file);
    } catch (error) {
        fs.writeFileSync(path_to_json, JSON.stringify({}, null, 2), "utf8");
    }
}

function add_task_to_file(task_id, { task_description, task_status, date_of_creation, date_of_updating }) {
    const file_content = load_tasks_from_file();
    const task = {
        description: task_description,
        status: task_status,
        date_of_creation,
        date_of_updating
    }
    file_content[task_id] = task;
    save_tasks_to_file(file_content);
};

function update_task_at_file(task_id, task_data) {
    const file_content = load_tasks_from_file();
    Object.assign(file_content[task_id], task_data);
    save_tasks_to_file(file_content);
};

function delete_task_from_file(task_id) {
    const file_content = load_tasks_from_file();
    delete file_content[task_id];
    save_tasks_to_file(file_content);
};

function load_tasks_from_file() {
    create_file_if_not_exists(path_to_file);
    return JSON.parse(fs.readFileSync(path_to_file, "utf8"));
};

function save_tasks_to_file(tasks) {
    fs.writeFileSync(path_to_file, JSON.stringify(tasks, null, 2), "utf8");
}

module.exports = {
    add_task_to_file,
    update_task_at_file,
    delete_task_from_file,
    load_tasks_from_file
}