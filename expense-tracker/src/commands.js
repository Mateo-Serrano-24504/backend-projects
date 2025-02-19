const regexes = require("../utils/regexes")
const errors = require("../utils/errors");
const aux = require("../utils/auxliar");

const files = require("./files");

const get_max_budgets = () => Object.keys(aux.MONTHS).reduce((object, month) => Object.assign(object, {[month]: 0}), {});

let expenses = [];
let max_budgets = get_max_budgets();

function add(description, amount, category) {
    if (!description) {
        throw errors.missing_description_error
    } else if (!amount) {
        throw errors.missing_amount_error
    } else if (!regexes.number_regex.test(amount)) {
        throw errors.invalid_amount_type_error;
    }

    const current_date = aux.get_current_date();
    const current_month = aux.extract_month(current_date);
    const current_max_budget = max_budgets[current_month];
    const expense_id = aux.get_new_id();
    expenses.push({
        id: expense_id,
        description,
        amount,
        category,
        creation_date: current_date
    })

    console.log(`Expense added with an id of ${expense_id}`);

    if (current_max_budget && aux.get_month_expenses(expenses, current_month) > current_max_budget) {
        aux.alert_max_budget_exceeded(current_month, current_max_budget);
    }

    console.log("");
}

function exit() {
    console.log("Exiting the CLI...");
    process.exit(0);
}

function list(category) {
    const expenses_to_list = expenses.filter(expense => category === "-" || expense.category === category)
    const grouped_expenses_data = aux.group_expenses_data(expenses_to_list);

    // Pads to make the output cleaner
    const pads = {
        pad_after_id: aux.get_pad_for_array("ID", grouped_expenses_data.ids),
        pad_after_date: aux.get_pad_for_array("DATE", grouped_expenses_data.creation_dates),
        pad_after_category: aux.get_pad_for_array("CATEGORY", grouped_expenses_data.categories),
        pad_after_description: aux.get_pad_for_array("DESCRIPTION", grouped_expenses_data.descriptions)
    }

    if (expenses_to_list.length > 0) {
        aux.print_header(pads);

        for (const expense of expenses_to_list) {
            aux.print_expense(pads, expense);
        }
    } else if (category !== "-") {
        console.log(`There are not expenses with the category ${category}`);
    } else {
        console.log("There are not expenses");
    }

    console.log("");
}

function load(filename) {
    const loaded = files.load(filename);
    expenses = loaded["expenses"] ?? []
    max_budgets = loaded["max-budgets"] ?? get_max_budgets();
    console.log("");
}

function remove(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    console.log("");
}

function save(filename) {
    files.save(filename, expenses, max_budgets);
    console.log("");
}

function set_max_budget(budget, month) {
    if (!regexes.number_regex.test(budget)) {
        throw errors.invalid_budget_type_error;
    } if (!Object.keys(aux.MONTHS).includes(month)) {
        throw errors.invalid_month_error;
    }
    max_budgets[month] = parseInt(budget);
    console.log("");
}

function show_max_budget(month) {
    if (!Object.values(max_budgets).filter(budget => budget > 0).length) {
        console.log("There are not maximum budgets set");
    } else if (month) {
        if (!Object.keys(max_budgets).includes(month)) {
            throw errors.invalid_month_error;
        }
        console.log(`Maximum budget for ${aux.get_month_name(month)}: ${max_budgets[month]}`);
    } else {
        for (const month_number in max_budgets) {
            if (max_budgets[month_number]) {
                console.log(`Maximum budget for ${aux.get_month_name(month_number)}: ${max_budgets[month_number]}`);
            }
        }
    }

    console.log("");
}

function summary(month) {
    if (month) {
        if (parseInt(month) < 1 || parseInt(month) > 12) {
            throw errors.invalid_month_error;
        }
        console.log(`Total expenses for the month of ${aux.get_month_name(month)} are ${aux.get_month_expenses(expenses, month)}`);
    } else {
        console.log(`Total expenses are ${aux.get_full_expenses(expenses)}`);
    }
    console.log("");
}

function update(id, description, amount, category) {
    expenses.forEach(expense => {
        if (expense.id === id) {
            expense.description = description ? description : expense.description;
            expense.amount = amount ? amount : expense.amount;
            expense.category = category ? category : expense.category;
        }
    })
    console.log("");
}

module.exports = {
    add,
    exit,
    list,
    load,
    save,
    set_max_budget,
    show_max_budget,
    summary,
    remove,
    update
}