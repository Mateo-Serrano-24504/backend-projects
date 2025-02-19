const missing_description_error = new Error("Missing description: an expense must have a description\n");
const missing_amount_error = new Error("Missing amount: an expense must have a amount\n");
const invalid_amount_type_error = new Error("Invalid amount type: an amount must be a whole positive number\n");
const invalid_budget_type_error = new Error("Invalid budget type: a budget must be a whole non-negative number\n");
const invalid_month_error = new Error("Invalid month: a month must be a whole number between 1 and 12\n");

module.exports = {
    missing_description_error,
    missing_amount_error,
    invalid_amount_type_error,
    invalid_budget_type_error,
    invalid_month_error
}