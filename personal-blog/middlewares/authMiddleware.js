import basicAuth from "basic-auth";

import { authenticate } from "../utils/auth.js";

export const basicAuthMiddleware = (req, res, next) => {
    const credentials = basicAuth(req);

    if (authenticate(credentials)) {
        return next();
    }

    res.set("WWW-Authenticate", "Basic real=\"user_login\"");
    res.status(401).send("Authentication required");
}