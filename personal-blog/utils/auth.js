export const authenticate = credentials => {
    // This could simulate consulting a database for
    // valid admin users, but I will just hardcode
    // a valid admin user

    return credentials && credentials.name === "admin" && credentials.pass === "admin-pass";
}