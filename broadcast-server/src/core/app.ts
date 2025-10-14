import express from "express";
import type { Application, Router } from "express";

export default class App {
    private app: Application;

    constructor(
        private listeningPort: Number,
        private baseURL: string,
        private router: Router
    ) {
        this.app = express();
        this.configure();
    }

    private configure() {
        this.app.use(this.baseURL, this.router);
    }

    get port(): Number {
        return this.listeningPort;
    }

    unwrap(): Application {
        return this.app;
    }
}