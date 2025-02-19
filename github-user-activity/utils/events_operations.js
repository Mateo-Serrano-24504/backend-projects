const classes = require("./events_formatting");

function convert_to_event(event) {
    return classes.EVENTS_CLASSES[event.type](event);
}

function filter_events(events, conditions) {
    return events.map(event => Object.entries(conditions).every(([key, value]) => event[key] === value));
}

module.exports = {
    convert_to_event,
    filter_events
}