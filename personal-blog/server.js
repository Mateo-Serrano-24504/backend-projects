import express from "express";
import https from "https";

import { PORT, SAFE_PORT, certificate } from "./config/serverConfig.js";
import { setUpArticles } from "./config/databaseConfig.js";
import { redirectMiddleware } from "./middlewares/redirectOnHTTPMiddleware.js";
import { userRouter } from "./routes/userRouter.js";
import { articleRouter } from "./routes/articleRouter.js";

const app = express();
app.disable("x-powered-by");
setUpArticles();

https.createServer(certificate, app).listen(SAFE_PORT, () => {
    console.log("Runrring HTTPS server");
    console.log(`Server running on https://localhost:${SAFE_PORT}/home`);
});

// To redirect requests from HTTP to HTTPS
app.use(redirectMiddleware).listen(PORT, () => {
    console.log("Redirecting");
});

// Set the view
app.set("view engine", "ejs");

// Make the static files accessible
app.use(express.static('public', { index: false }))

// Add the routers
// userRouter
app.use("/", userRouter);

// articleRouter
app.use("/article", articleRouter);