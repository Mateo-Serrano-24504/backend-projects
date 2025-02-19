const fs = require("node:fs");
const path = require("node:path");

function create_if_not_exists(filename) {
    try {
        fs.mkdirSync(path.dirname(filename), { recursive: true });
        const file = fs.openSync(filename, "r");
        fs.closeSync(file);
    } catch (error) {
        fs.writeFileSync(filename, JSON.stringify([], null, 2), "utf8");
    }
}

function load(filename) {
    create_if_not_exists(filename);
    return JSON.parse(fs.readFileSync(filename, "utf8"));
}

function save(filename, expenses, budgets) {
    create_if_not_exists(filename);
    fs.writeFileSync(
        filename,
        JSON.stringify(
            {
                "expenses": expenses,
                "max-budgets": budgets
            },
            null,
            2
        ),
        "utf8"
    );
}

module.exports = {
    load,
    save
}