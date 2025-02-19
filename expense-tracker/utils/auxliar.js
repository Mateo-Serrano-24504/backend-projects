const crypto = require("node:crypto");

const MONTHS = {
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December"
}

function get_new_id() {
    return `${crypto.randomBytes(4).readUIntBE(0, 4)}`;
}

function get_current_date() {
    return new Date().toISOString().slice(0, 10);
}

function extract_month(date) {
    const month = date.slice(5, 7)
    return month.startsWith("0") ? month.slice(1) : month;
}

function get_month_name(month) {
    return MONTHS[month];
}

function get_month_expenses(expenses, month) {
    return expenses.reduce((acc, expense) => {
        if (extract_month(expense.creation_date) === month) {
            return acc + parseInt(expense.amount);
        } else {
            return acc;
        }
    }, 0);
}

function get_full_expenses(expenses) {
    return expenses.reduce((acc, expense) => acc + parseInt(expense.amount), 0);
}

function alert_max_budget_exceeded(month, budget) {
    console.log(`\nAlert: the maximum budget set for the month number ${get_month_name(month)} (\$${budget}) was exceeded`);
}

function group_expenses_data(expenses) {
    return {
        ids: expenses.map(expense => expense.id),
        descriptions: expenses.map(expense => expense.description),
        amounts: expenses.map(expense => expense.amount),
        categories: expenses.map(expense => expense.category),
        creation_dates: expenses.map(expense => expense.creation_date),
    }
}

function get_pad_for_array(field_name, array) {
    return Math.max(field_name.length, ...array.map(item => item.length)) + 2;
}

function print_header(pads) {
    const header = 
        "ID".padEnd(pads.pad_after_id) +
        "DATE".padEnd(pads.pad_after_date) +
        "CATEGORY".padEnd(pads.pad_after_category) +
        "DESCRIPTION".padEnd(pads.pad_after_description) +
        "AMOUNT";

        console.log(`\n${header}`);
}

function print_expense(pads, expense) {
    const expense_data = 
        `${expense.id}`.padEnd(pads.pad_after_id) +
        `${expense.creation_date}`.padEnd(pads.pad_after_date) +
        `${expense.category}`.padEnd(pads.pad_after_category) +
        `${expense.description}`.padEnd(pads.pad_after_description) +
        `${expense.amount}`;

    console.log(`\n${expense_data}`);
}

module.exports = {
    MONTHS,
    get_new_id,
    get_current_date,
    get_month_name,
    extract_month,
    get_month_expenses,
    get_full_expenses,
    alert_max_budget_exceeded,
    group_expenses_data,
    get_pad_for_array,
    print_header,
    print_expense
}